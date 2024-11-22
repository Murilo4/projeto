'use client'
import React from "react";

const CreateAccountPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Metade Esquerda (Azul) */}
      <div className="w-1/2 bg-blue-thirth text-white flex flex-col justify-center p-8">
        <h2 className="text-2xl font-bold mb-4">Que bom que você deseja Fazer parte da Contur!</h2>
        <p className="text-sm mb-6">
          Vamos realizar o seu cadastro rapidamente para você possa desfrutar de tudo que podemos oferecer!
        </p>
        <p className="text-sm mb-6">
          Caso já tenha uma conta e deseja utilizar ela, você pode realizar o login através deste botão:
        </p>
        <a href="/login"
        target="_blank" >
            <button className="bg-white text-black py-3 px-4 rounded-3xl font-bold hover:bg-gray-200 transition">
            Realizar login
            </button></a>
      </div>

      {/* Metade Direita (Branca) */}
      <div className="w-1/2 bg-blue-thirth  flex flex-col justify-center p-8">
        <form className="space-y-4">
          {/* Campo Nome Completo */}
          <input
            type="text"
            placeholder="Nome completo"
            className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Campo Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Campo Confirmar Email */}
          <input
            type="email"
            placeholder="Confirme o Email"
            className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Campo CPF */}
          <input
            type="text"
            placeholder="Cpf"
            className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Campo Senha */}
          <input
            type="password"
            placeholder="Senha"
            className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Campo Confirmar Senha */}
          <input
            type="password"
            placeholder="Confirme a senha"
            className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

            <button 
            className="w-full max-w-52 mt-4 text-xl mb-10 bg-white text-black font-bold py-2 px-4 hover:bg-blue-thirth transition shadow-light-blue shadow-mid rounded-3xl">
                  Cadastre-se
            </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountPage;