'use client'

import Cookies from 'universal-cookie'
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserAccount = () => {
  const [image, setImage] = useState<string | null>('/foto-padrao.png'); // Foto padrão inicialmente
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [planData, setPlanData] = useState({
    planName: ''
  });
  const [isImageChanged, setIsImageChanged] = useState<boolean>(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    cpf: '',
    phone: '',
    photo: ''
  });
  const [addressData, setAddressData] = useState([
    {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      cep: '',
      addressName: '',
      addressType: '',
      address_id_token: ''
    }
  ]);
  const [originalUserData, setOriginalUserData] = useState(userData)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [showAddresses, setShowAddresses] = useState(false)
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false)
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
          setPlanData({ planName: data.subscriptionData.PlanName });
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

  // Função para buscar endereços
  const fetchAddresses = async () => {
    setIsLoadingAddresses(true); // Inicia o loading
    try {
      const cookies = new Cookies();
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/get-all-address/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.get('access')}`
        },
      });
      const data = await response.json();
      if (data.success) {
        setAddressData(data.addresses || []);
      } else {
        setAddressData([]);  // Caso não retorne endereços, define como array vazio
      }
    } catch (error) {
      console.error('Erro ao buscar endereços:', error);
      toast.error('Erro ao buscar endereços.');
    } finally {
      setIsLoadingAddresses(false); // Finaliza o loading
    }
  };
  
  const handleShowAddresses = () => {
    if (!showAddresses) {
      fetchAddresses();  // Chama a função para buscar os endereços
    }
    setShowAddresses(!showAddresses);  // Alterna a visibilidade dos endereços
  };  // Alterna a visibilidade dos endereços

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Usando a optional chaining para evitar null
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result; // Verificando se e.target não é null
        if (typeof result === 'string') {
          setImage(result); // Atualiza a imagem para a nova escolhida
          setIsImageChanged(true);
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
  
  const handleDeleteAddress = async (id: string) => {
    try {
      const cookies = new Cookies();
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/delete-address/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.get('access')}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Endereço excluído com sucesso!');
        router.push('/meu-perfil')
      } else {
        toast.error(data.message || 'Erro ao excluir o endereço.');
      }
    } catch (error) {
      console.error('Erro ao excluir o endereço:', error);
      toast.error('Erro ao excluir o endereço.');
    }
  };
  
  const handleEditAddress = (id: string) => {
    router.push(`/edit-address/${id}/`)
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
  const handleSaveImage = async () => {
    try {
      const cookies = new Cookies();
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      const formData = new FormData();
      formData.append('photo', fileInputRef.current?.files?.[0] as Blob);

      const response = await fetch(`${apiUrl}/update-user-photo/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${cookies.get('access')}`
        },
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Foto de perfil atualizada com sucesso.');
        setImage(URL.createObjectURL(fileInputRef.current?.files?.[0]!)); // Atualiza a imagem com a nova foto
      } else {
        toast.error(data.message || 'Erro ao atualizar foto.');
      }
    } catch (error) {
      console.error('Erro ao enviar foto:', error);
      toast.error('Erro ao enviar foto.');
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
      <div className="flex ml-350px mb-8">
        <button
          onClick={HandleRedirect}
          className="flex text-lg max-h-10 border-blue-thirth rounded-2xl py-2 px-4 bg-blue-thirth text-white font-medium justify-center h-auto"
        >Voltar</button>
      </div>
      <div className="flex justify-end">
        <div className="text-lg mt-4 md:mt-0 xl:mr-20">
          <p className="mb-2">Plano atual da conta:</p>
          <p className="text-xl">{planData.planName}</p>
          <button
            className="text-lg border-4 hover:bg-blue-thirth hover:text-white border-blue-thirth rounded-xl px-4 mt-4 md:mt-0"
            onClick={() => router.push('/planos')}
          >
            Mudar de plano
          </button>
        </div>
      </div>
      <div className='flex justify-center'>
        <p className="text-3xl text-slate-800 mb-10 font-sans font-semibold">Meu perfil</p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-start gap-12 md:gap-20 mb-20">
        <div className="w-full md:w-1/2 space-y-6 max-w-[600px]">
          <form className="space-y-6" onSubmit={handleSaveClick}>
            <div>
              <p className="text-lg font-medium">Nome completo:</p>
              <input
                type="text"
                value={userData.username}
                placeholder='Nome completo'
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                className="w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <p className="text-lg font-medium">Email:</p>
              <input
                type="email"
                value={userData.email}
                placeholder='Email'
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className="w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <p className="text-lg font-medium">CPF:</p>
              <input
                type="text"
                value={userData.cpf}
                placeholder='CPF'
                onChange={(e) => setUserData({ ...userData, cpf: e.target.value })}
                className="w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <p className="text-lg font-medium">Telefone:</p>
              <input
                type="text"
                value={userData.phone}
                placeholder='Telefone'
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                className="w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <p className="text-lg font-medium">Senha:</p>
              <input
                type="password"
                placeholder='*************'
                readOnly={!isEditingPassword}
                className={`w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditingPassword ? 'bg-gray-100' : ''}`}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={!isDataChanged}
                className={`w-full md:w-auto h-full border-4 border-blue-thirth rounded-2xl px-6 py-3 mt-5 bg-blue-thirth text-white font-medium hover:bg-blue-600 ${!isDataChanged ? 'opacity-50 cursor-not-allowed' : ''}`} >
                Salvar alterações
              </button>
              <button
                type="button"
                onClick={handlePasswordReset}
                className="w-full md:w-auto h-full border-4 border-blue-thirth rounded-2xl py-3 px-6 mt-5 bg-blue-thirth text-white font-medium"
              >
                Alterar senha
              </button>
            </div>
          </form>
        </div>

        {/* Profile Photo */}
         {/* Profile Photo Section */}
         <div className="flex justify-center w-full sm:w-1/4 md:w-1/3">
          <div className="relative w-60 h-60 mb-8">
            <div className="w-full h-full rounded-full overflow-hidden">
              {image && (
                <Image
                  src={image}
                  alt="Foto de perfil"
                  width={240}
                  height={240}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div className="absolute bottom-0 right-0 mb-2 mr-2 z-10">
              <button
                onClick={handleButtonClick}
                className="bg-blue-thirth p-2 rounded-full text-white"
                style={{
                  transform: 'translateY(50%)',
                  zIndex: 10,
                }}
              >
                Editar
              </button>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleSaveImage}
                className="mt-4 bg-blue-thirth text-white p-2 rounded-lg"
                disabled={!isImageChanged}
              >
                Salvar foto
              </button>
            </div>
          </div>
          </div>
        </div>

      {/* Address Form Section */}
      <div className="mt-10">
        <div className="flex justify-center items-center flex-col">
          <h2 className="text-2xl mb-4">Meus endereços</h2>

          {/* Buttons below the title */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={handleShowAddresses}
              className='mt-4 flex text-xl border-blue-thirth rounded-2xl py-3 px-6 bg-blue-thirth text-white font-medium'>
              {showAddresses ? 'Ocultar meus endereços' : 'Ver meus endereços'}
            </button>
            <button
              onClick={HandleRedirectCreateAddress}
              className='flex text-xl border-blue-thirth rounded-2xl py-3 px-6 mt-5 bg-blue-thirth text-white font-medium'>
              Adicionar novo endereço
            </button>
          </div>
        </div>

        {showAddresses && (
          <div id="addresses" className="mt-4 mb-4">
            {isLoadingAddresses ? (
              <p className="text-center text-xl">Carregando seus endereços...</p>
            ) : addressData.length > 0 ? (
              addressData.map((address, index) => (
                <div
                  key={index}
                  className={`mt-8 ${index === 0 ? 'flex justify-center' : 'flex justify-center mt-8'}`}
                >
                  <div className="w-full max-w-4xl p-4 border-4 border-blue-thirth rounded-lg shadow-md shadow-slate-500">
                    <h3 className="text-xl font-semibold mb-4">{address.addressName}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <p className="font-semibold">Rua:</p>
                        <p>{address.street}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Bairro:</p>
                        <p>{address.neighborhood}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Número:</p>
                        <p>{address.number}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Tipo:</p>
                        <p>{address.addressType}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Cidade:</p>
                        <p>{address.city}</p>
                      </div>
                      <div>
                        <p className="font-semibold">CEP:</p>
                        <p>{address.cep}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Estado:</p>
                        <p>{address.state}</p>
                      </div>
                    </div>
                    <div key={address.address_id_token} className="border-2 p-4 mb-4 rounded-md">
                      <div className="mt-4">
                        <button
                          onClick={() => handleEditAddress(address.address_id_token)}
                          className="mr-4 text-white bg-blue-thirth py-2 px-4 rounded-lg hover:bg-blue-600"
                        >
                          Atualizar Endereço
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.address_id_token)}
                          className="mr-4 text-white bg-blue-thirth py-2 px-4 rounded-lg hover:bg-blue-600"
                        >
                          Apagar Endereço
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-xl">Nenhum endereço cadastrado.</p>
            )}
            </div>
          )}
      </div>
    </div>
  );
};

export default UserAccount;