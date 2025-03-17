'use client'

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie'
import RegistrationModal from '@/components/RegistrationModal'

const LoginUser: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false)

  const handleRedirect = () => {
    router.push('/login-email')
  };

  const handleRedirectForgetPass = () => {
    router.push('/change-password')
    };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoader(true)

    const isCPF = /^\d{11}$/.test(identifier.replace(/\D/g, ''));
    const isCNPJ = /^\d{14}$/.test(identifier.replace(/\D/g, ''));

    if (!isCPF && !isCNPJ) {
      toast.error('CPF ou CNPJ inválido.');
      return;
    }

    const key = isCPF ? 'cpf' : 'cnpj';
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

    try {
      const response = await fetch(`${apiUrl}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: identifier, password }),
      });

      const data = await response.json();

      console.log('Login Response:', data);  // Log para ver a resposta

      if (response.status === 406) {
        toast.warning('Email não validado. Redirecionando para a página de confirmação de email.');
        const cookies = new Cookies();
        cookies.set('token', data.token);  // Salvar token no cookie
        console.log('Token set in cookies:', data.token);  // Verificar se o token foi realmente gravado
        router.push(`/confirmacao-email-cpf-cnpj?identifier=${identifier}`);
        return;
      }

      if (!response.ok) {
        setLoader(false)
        toast.error('Dados incorretos, tente novamente.');
        return;
      }

      if (response.status === 200) {
        toast.success('Login realizado com sucesso!');
        const cookies = new Cookies();
        cookies.set('refresh', data.refresh);
        cookies.set('access', data.access);
        router.push('/');
      }
    } catch (error) {
      setLoader(false)
      console.error('Erro ao realizar login:', error);
      toast.error('Erro ao realizar login. Tente novamente mais tarde.');
    }
  };
  return (
    <div className="flex h-screen">
      <ToastContainer />
      <RegistrationModal isOpen={isModalOpen} onClose={handleCloseModal} />
      {/* Metade Esquerda (Azul) */}
      <div className="w-1/2 bg-principal-blue text-white flex flex-col justify-center p-8">
        <h2 className="text-3xl font-bold mb-4">Você ainda não faz parte da Contur?</h2>
        <p className="text-xl mb-6">
          Vamos realizar o seu cadastro rapidamente para que você possa desfrutar de tudo que podemos oferecer!
        </p>
        <button
          onClick={handleOpenModal}
          className="bg-white text-black ml-2 py-3 px-4 rounded-3xl font-bold hover:bg-gray-200 transition hover:scale-105">
          Criar conta
        </button>
      </div>

      {/* Metade Direita (Branca) */}
      <div className="w-1/2 bg-gray-100 flex flex-col justify-center p-8">
        <form className="space-y-4" onSubmit={handleLogin}>
          {/* CPF/CNPJ */}
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="CPF/CNPJ"
            className="w-full border border-gray-400 rounded-2xl focus:scale-105 placeholder-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Senha */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full border border-gray-400 text-lg rounded-2xl focus:scale-105 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
          />
          
          <button
            type="submit"
            className="w-full mt-4 text-2xl bg-principal-blue hover:scale-95 scale-90 text-white font-bold py-3 px-4 rounded-3xl hover:bg-blue-600 transition"
          >
            {loader ? 'Logando...' : 'Logar'}
          </button>
          <button
            type="button"
            onClick={handleRedirect}
            className="w-full mt-4 text-2xl bg-principal-blue hover:scale-95 scale-90 text-white font-bold py-3 px-4 rounded-3xl hover:bg-blue-600 transition"
          >
            Ou realizar login com o email
          </button>
          <button
            type="button"
            onClick={handleRedirectForgetPass}
            className="w-full flex text-orange-700 justify-center hover:underline mt-4 text-xl underline"
          >
            Esqueci minha senha
          </button>
        </form>
      </div>
      <div className="bg-gray-300 absolute bottom-0 w-full pt-1">
      </div>
    </div>
  );
};

export default LoginUser;