'use client'
import React from "react";

const CreateAccountPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Metade Esquerda (Azul) */}
      <div className="w-1/2 bg-blue-thirth text-white flex flex-col justify-center p-8">
        <h2 className="text-2xl font-bold mb-4">Que bom que você deseja Fazer parte da Contur!</h2>
        <p className="text-sm mb-6">
          Vamos realizar o seu cadastro rapidamente para que você possa desfrutar de tudo que podemos oferecer!
        </p>
        <p className="text-sm mb-6">
          Caso já tenha uma conta e deseja utilizá-la, você pode realizar o login através deste botão:
        </p>
        <a href="/login" target="_blank">
          <button className="bg-white text-black py-3 px-4 rounded-3xl font-bold hover:bg-gray-200 transition">
            Realizar login
          </button>
        </a>
      </div>

      {/* Metade Direita (Branca) */}
      <div className="w-1/2 bg-gray-100 flex flex-col justify-center p-8">
        <form className="space-y-4">
          {/* Razão Social */}
          <input
            type="text"
            placeholder="Razão social"
            className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Email para Contato */}
          <input
            type="email"
            placeholder="Email para contato"
            className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Confirmar Email */}
          <input
            type="email"
            placeholder="Confirme o Email"
            className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* CNPJ */}
          <input
            type="text"
            placeholder="CNPJ"
            className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Endereço */}
          <input
            type="text"
            placeholder="Endereço"
            className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Número */}
          <input
            type="text"
            placeholder="Número"
            className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Estado */}
          <input
            type="text"
            placeholder="Estado"
            className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Cidade */}
          <input
            type="text"
            placeholder="Cidade"
            className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Senha */}
          <input
            type="password"
            placeholder="Senha"
            className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Confirmar Senha */}
          <input
            type="password"
            placeholder="Confirme a senha"
            className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Botão de Cadastro */}
          <button
            className="w-full mt-4 text-xl bg-blue-thirth text-white font-bold py-3 px-4 rounded-3xl hover:bg-blue-600 transition"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountPage;