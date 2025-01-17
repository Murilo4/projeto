'use client'

import Cookies from 'universal-cookie'
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserAccount = () => {
  const [image, setImage] = useState<string>('/foto-padrao.png');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    cpf: '',
    phone: '',
    photo: ''
  });
  const [AddressData, setAddressData] = useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    cep: '',
    addressName: '',
  });
  const [originalUserData, setOriginalUserData] = useState(userData);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(true); // Allow editing by default
  const [IsPasswordVisible, SetPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddresses, setShowAddresses] = useState(false); // Estado para controlar a visibilidade dos endereços
  const router = useRouter();

  useEffect(() => {
    // Função para buscar dados do usuário
    const fetchUserData = async () => {
      try {
        const cookies = new Cookies();
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/user-profile/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.get('access')}`
          },
        });
        const data = await response.json();
        if (data.success) {
          const fetchedData = {
            username: data.userData.username,
            email: data.userData.email,
            cpf: data.userData.cpf,
            phone: data.userData.phone,
            photo: data.userData.photo
          };
          const AddressData = {
            street: data.userData.address.street,
            number: data.userData.address.number,
            complement: data.userData.address.complement,
            neighborhood: data.userData.address.neighborhood,
            city: data.userData.address.city,
            state: data.userData.address.state,
            country: data.userData.address.country,
            cep: data.userData.address.zipCode,
            addressName: data.userData.address.addressName
          };
          setAddressData(AddressData);
          setUserData(fetchedData);
          setOriginalUserData(fetchedData);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        toast.error('Erro ao buscar dados do usuário.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Usando a optional chaining para evitar null
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result; // Verificando se e.target não é null
        if (typeof result === 'string') {
          setImage(result); // Atualiza a imagem para a nova escolhida
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const HandleRedirect = () => {
    router.push('/');
  };

  const HandleRedirectCreateAddress = () => {
    router.push('/create-address');
  }

  const handleSaveClick = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    try {
      const cookies = new Cookies();
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/update-user/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.get('access')}`
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (data.success) {
        console.log('Dados atualizados com sucesso:', data);
        setOriginalUserData(userData);
        setIsEditing(false);
        toast.success(data.message || 'Dados atualizados com sucesso.');
      } else {
        console.error('Erro ao atualizar dados:', data);
        toast.error(data.message || 'Erro ao atualizar dados.');
      }
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      toast.error('Erro ao atualizar dados.');
    }
  };

  const handlePasswordReset = async () => {
    try {
      const cookies = new Cookies();
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/request-reset/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.get('access')}`
        },
        body: JSON.stringify({ email: userData.email })
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Link para redefinição de senha enviado para o seu email.');
      } else {
        toast.error(data.message || 'Erro ao enviar link de redefinição de senha.');
      }
    } catch (error) {
      console.error('Erro ao enviar link de redefinição de senha:', error);
      toast.error('Erro ao enviar link de redefinição de senha.');
    }
  };

  const isDataChanged = JSON.stringify(userData) !== JSON.stringify(originalUserData);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-32 max-w-1440px px-2 bg-white min-h-screen">
      <ToastContainer />
      <div className='flex ml-350px mb-8'> 
        <button
          onClick={HandleRedirect}
          className="flex text-xl border-4 hover:scale-105 border-blue-thirth rounded-xl px-3 justify-center"
        >Voltar</button>
      </div>
      <div className="flex justify-end">
        <div>
          <p className='text-xl ml-4'>Plano atual da conta:</p>
          <p className="flex ml-12 text-xl">Plano Gratuito</p>
          <button
            className="flex text-xl border-4 ml-6 hover:bg-blue-thirth hover:text-white border-blue-thirth rounded-xl px-4 justify-center mr-40"
          >Mudar de plano</button>
        </div>
      </div>
      <div className='flex justify-center'>
        <p className="text-3xl text-slate-800 mb-10 font-sans font-semibold">Meu perfil</p>
      </div>
      <div className="flex justify-center">
        <div className="flex max-w-530px mb-20 mr-20">    
          <form className="space-y-4" onSubmit={handleSaveClick}>
            {/* Campo Nome Completo */}
            <p className="text-xl font-sans">Nome completo:</p>
            <input
              type="text"
              value={userData.username}
              placeholder='Nome completo'
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
              className="w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md shadow-slate-500 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xl font-sans">Email:</p>
            <input
              type="email"
              value={userData.email}
              placeholder='Email'
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              className="w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md shadow-slate-500 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-xl font-sans">CPF:</p>
            <input
              type="text"
              value={userData.cpf}
              placeholder='CPF'
              onChange={(e) => setUserData({ ...userData, cpf: e.target.value })}
              className="w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md shadow-slate-500 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-xl font-sans">Telefone:</p>
            <input
              type="text"
              value={userData.phone}
              placeholder='Telefone'
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              className="w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md shadow-slate-500 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-xl font-sans">Senha:</p>
            <input
              type="password"
              placeholder='*************'
              readOnly={!isEditingPassword}
              className={`w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md shadow-slate-500 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditingPassword ? 'bg-gray-100' : ''}`}
            />

            <div className="flex min-w-screen h-16 ">
              <button 
                type="submit"
                disabled={!isDataChanged}
                className={`shadow-md h-full shadow-slate-500 w-full font-sans justify-center mt-4 mr-5 text-lg bg-green-border hover:bg-green-button hover:text-white border-collapse border-4 border-green-button text-black font-bold py-1 rounded-2xl hover:bg-blue-600 transition ${!isDataChanged ? 'opacity-50 cursor-not-allowed' : ''}`}>
                Salvar alterações
              </button>
              <button 
                type="button"
                onClick={handlePasswordReset}
                className="shadow-md h-full shadow-slate-500 w-full font-sans justify-center mt-4 mr-5 text-lg bg-green-border hover:bg-green-button hover:text-white border-collapse border-4 border-green-button text-black font-bold py-1 rounded-2xl hover:bg-blue-600 transition">
                Alterar senha
              </button>
            </div>
            <div className='flex flex-col'>

            <h2 className='mt-10 text-2xl text-center'>Meus endereços</h2>

            <button 
              onClick={() => setShowAddresses(!showAddresses)}
              className='mt-4 flex text-xl border border-gray-500 hover:text-white bg-green-border hover:bg-green-button rounded-xl py-2 px-2'>
              {showAddresses ? 'Ocultar meus endereços' : 'Ver meus endereços'}
            </button>
            <button 
              onClick={HandleRedirectCreateAddress}
              className='mt-4 flex text-xl border border-gray-500 hover:text-white bg-green-border hover:bg-green-button rounded-xl py-2 px-2'>
            Adicionar novo endereço</button>

            {showAddresses && ( 
            <div id='addresses' className="mt-4">
            <form className="space-y-4" onSubmit={handleSaveClick}>
            {/* Campo Nome Completo */}
            <p className="text-xl font-sans"></p>
            <input
              type="text"
              value={AddressData.addressName}
              placeholder='Nome endereço'
              onChange={(e) => setAddressData({ ...AddressData, addressName: e.target.value })}
              className="w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md shadow-slate-500 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xl font-sans">Rua</p>
            <input
              type="text"
              value={AddressData.street}
              placeholder='Rua'
              onChange={(e) => setAddressData({ ...AddressData, street: e.target.value })}
              className="w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md shadow-slate-500 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-xl font-sans">Bairro:</p>
            <input
              type="text"
              value={AddressData.neighborhood}
              placeholder='CPF'
              onChange={(e) => setAddressData({ ...AddressData, neighborhood: e.target.value })}
              className="w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md shadow-slate-500 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-xl font-sans">Número:</p>
            <input
              type="text"
              value={AddressData.number}
              placeholder='Número'
              onChange={(e) => setAddressData({ ...AddressData, number: e.target.value })}
              className="w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md shadow-slate-500 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-xl font-sans">Complemento:</p>
            <input
              type="text"
              value={AddressData.complement}
              placeholder='complemento'
              onChange={(e) => setAddressData({ ...AddressData, complement: e.target.value })}
              className="w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md shadow-slate-500 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xl font-sans">Cidade:</p>
            <input
              type="text"
              value={AddressData.city}
              placeholder='Cidade'
              onChange={(e) => setAddressData({ ...AddressData, complement: e.target.value })}
              className="w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md shadow-slate-500 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xl font-sans">CEP:</p>
            <input
              type="text"
              value={AddressData.cep}
              placeholder='CEP'
              onChange={(e) => setAddressData({ ...AddressData, cep: e.target.value })}
              className="w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md shadow-slate-500 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xl font-sans">Estado:</p>
            <input
              type="text"
              value={AddressData.state}
              placeholder='Estado'
              onChange={(e) => setAddressData({ ...AddressData, state: e.target.value })}
              className="w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md shadow-slate-500 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            </form>
            </div>
            )}
          </div>
          </form>
        </div>
        
        {/* Foto de perfil usuário */}
        <div className="flex flex-col items-center mt-6">
          <div className="relative rounded-full overflow-hidden bg-black w-80 h-80 shadow-md shadow-slate-500">
            <Image 
              src={image} 
              alt="foto perfil" 
              className="w-full h-full object-cover"
              width={320}
              height={320}
              priority={false}
            />
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              ref={fileInputRef}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <button 
              onClick={handleButtonClick}
              className="absolute bottom-2 left-1/2 transform border-4 border-blue-thirth bg-white mb-2 -translate-x-1/2 bg-blue-500 text-black rounded-full px-4 py-2">
              Alterar imagem
            </button>
          </div>
          <p className="mt-4 text-center font-sans font-semibold text-black text-2xl">Foto de perfil</p>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;