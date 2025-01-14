'use client'
import { ButtonDefault } from '@/components/ButtonDefault';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const UserAccount = () => {
    const [image, setImage] = useState<string>('/foto-padrao.png')
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        cpf: '',
        password: ''
    });
    const [isEditingPassword, setIsEditingPassword] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const [IsPasswordVisible, SetPasswordVisible] = useState(false)

    useEffect(() => {
        // Função para buscar dados do usuário
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/user'); // Substitua pela sua API
                const data = await response.json();
                setUserData({
                    fullName: data.fullName,
                    email: data.email,
                    cpf: data.cpf,
                    password: '' // Não é recomendado preencher a senha
                });
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
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
        fileInputRef.current?.click(); // Aciona o input de arquivo usando a referência
    };
    const handleUpdateClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // Lógica para salvar os dados atualizados
        console.log('Dados atualizados:', userData);
        setIsEditing(false);
    };

    const handleChangePassword = () => {
        if (!IsPasswordVisible) {
            SetPasswordVisible(true)
            setIsEditingPassword(true)
        }
        else {
            SetPasswordVisible(false)
            setIsEditingPassword(false)
        }
    };

    return (
        <div className="mx-auto mt-32 max-w-1440px px-2 bg-white min-h-screen">
            <div className='flex ml-350px'> 
                    <ButtonDefault
                    type='link'
                    link='/'
                    text='Voltar'
                    />
                </div>
            <div className="flex justify-end">
                <div>
                    <p className='text-lg'>Plano atual da minha conta:</p>
                    <p className="flex ml-12 text-lg">Plano Gratuito</p>
                    <button
                        className="flex text-lg border-4 ml-6 hover:bg-blue-thirth hover:text-white border-blue-thirth rounded-xl px-4 justify-center mr-40"
                    >Mudar de plano</button>
                </div>
            </div>
            <div className='flex justify-center'>
                <p className="text-3xl text-slate-800 mb-10 font-sans font-semibold">Meu perfil</p>
            </div>
            <div className="flex justify-center">
            <div className="flex max-w-530px mb-20 mr-20">    
                <form className="space-y-4">
                        {/* Campo Nome Completo */}
                        <p className="text-lg font-sans">Nome completo</p>
                        <input
                            type="text"
                            value={userData.fullName}
                            placeholder='Nome completo'
                            onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                            readOnly={!isEditing} // Permite edição se isEditing for true
                            className={`w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md shadow-slate-500 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing ? 'bg-gray-100' : ''}`}
                        />
                        <p className="text-lg font-sans">Email</p>
                        <input
                            type="email"
                            value={userData.email}
                            placeholder='Email'
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            readOnly={!isEditing}
                            className={`w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md shadow-slate-500 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing ? 'bg-gray-100' : ''}`}
                        />

                        <p className="text-lg font-sans">CPF</p>
                        <input
                            type="text"
                            value={userData.cpf}
                            placeholder='CPF'
                            onChange={(e) => setUserData({ ...userData, cpf: e.target.value })}
                            readOnly={!isEditing}
                            className={`w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md shadow-slate-500 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing ? 'bg-gray-100' : ''}`}
                        />

                        <p className="text-lg font-sans">Senha</p>
                        <input
                            type="password"
                            value={userData.password}
                            placeholder='Senha'
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            readOnly={!isEditingPassword}
                            className={`w-full border-4 border-blue-thirth rounded-2xl p-3 shadow-md shadow-slate-500 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing ? 'bg-gray-100' : ''}`}
                        />

                        <div className="flex min-w-screen h-16 ">
                            {isEditing ? (
                                <button 
                                    onClick={handleSaveClick}
                                    className="shadow-md h-full shadow-slate-500 w-full font-sans justify-center mt-4 mr-5 text-lg bg-green-border hover:bg-green-button hover:text-white border-collapse border-4 border-green-button text-black font-bold py-1 rounded-2xl hover:bg-blue-600 transition">
                                    Salvar alterações
                                </button>
                            ) : (
                                <button 
                                    onClick={handleUpdateClick}
                                    className="shadow-md h-full shadow-slate-500 w-full font-sans justify-center mt-4 mr-5 text-lg bg-green-border hover:bg-green-button hover:text-white border-collapse border-4 border-green-button text-black font-bold py-1 rounded-2xl hover:bg-blue-600 transition">
                                    Atualizar cadastro
                                </button>
                            )}
                            <button 
                        onClick={handleChangePassword}
                        className="shadow-md h-full shadow-slate-500 w-full font-sans justify-center mt-4 mr-5 text-lg bg-green-border hover:bg-green-button hover:text-white border-collapse border-4 border-green-button text-black font-bold py-1 rounded-2xl hover:bg-blue-600 transition">
                        Alterar senha
                    </button>
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
                        />
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange}
                            ref={fileInputRef} // Associando a referência ao input
                            className="absolute inset-0 opacity-0 cursor-pointer" // Esconde o input
                        />
                        <button 
                            onClick={handleButtonClick} // Chama a função ao clicar no botão
                            className="absolute bottom-2 left-1/2 transform border-4 border-blue-thirth bg-white mb-2  -translate-x-1/2 bg-blue-500 text-black rounded-full px-4 py-2">
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