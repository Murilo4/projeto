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

  const handleRedirect = () => {
    router.push('/email')
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
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
        toast.error(data.message || 'Erro ao realizar login. Tente novamente.');
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
      console.error('Erro ao realizar login:', error);
      toast.error('Erro ao realizar login. Tente novamente mais tarde.');
    }
  };
  return (
    <div className="flex h-screen">
      <ToastContainer />
      <RegistrationModal isOpen={isModalOpen} onClose={handleCloseModal} />
      {/* Metade Esquerda (Azul) */}
      <div className="w-1/2 bg-blue-thirth text-white flex flex-col justify-center p-8">
        <h2 className="text-2xl font-bold mb-4">Você ainda não faz parte da Contur?</h2>
        <p className="text-sm mb-6">
          Vamos realizar o seu cadastro rapidamente para que você possa desfrutar de tudo que podemos oferecer!
        </p>
        <button
          onClick={handleOpenModal}
          className="bg-white text-black py-3 px-4 rounded-3xl font-bold hover:bg-gray-200 transition">
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
            className="w-full border border-gray-300 rounded-2xl placeholder-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Senha */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
          />
          <button
            type="submit"
            className="w-full mt-4 text-xl bg-blue-thirth text-white font-bold py-3 px-4 rounded-3xl hover:bg-blue-600 transition"
          >
            Logar
          </button>
          <button
            type="button"
            onClick={handleRedirect}
            className="w-full flex justify-center hover:underline mt-4"
          >
            Realizar login de outra forma
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginUser;