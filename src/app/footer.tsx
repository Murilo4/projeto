'use client';

import React, { useState } from "react";

export const Footer = () => {
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  // Funções para abrir e fechar as modais
  const openModal1 = () => setIsModalOpen1(true);
  const closeModal1 = () => setIsModalOpen1(false);

  const openModal2 = () => setIsModalOpen2(true);
  const closeModal2 = () => setIsModalOpen2(false);

  return (
    <section className="flex flex-col items-center justify-center bg-light-blue space-y-6">
    <div className="inline-flex mb-10 mt-10">
      {/* Botões para abrir as modais */}
      <div className="px-0 max-w-310px rounded-xl">
        <button onClick={openModal1} className="rounded-xl py-4 bg-blue-500 text-white">
            <img src="/instagram.png" alt="Abrir Modal" className="w-14 h-14 rounded-xl" />
        </button>
      </div>
      <div className="max-w-310px">
        <button
          onClick={openModal2}
          className="rounded-xl px-4 mt-1 bg-blue-500 text-white"
        >
          <img src="/facebook.png" alt="Abrir Modal" className="w-20 h-20" />
        </button>
      </div>
      </div>
      {isModalOpen1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg z-60">
            <h2 className="text-xl mb-4">Instagram</h2>
            <div className="flex flex-col space-y-3">
                <button className="relative rounded-xl px-6 py-4 bg-blue-500 text-white flex items-center space-x-4">
                <img src="/instagram.png" alt="Instagram" className="w-10 h-10 rounded-lg" />
                <span className="text-black">
                <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline"
                    >
                    Contur
                    </a>
                </span>
                </button>
                
                <button className="relative rounded-xl px-6 py-4 bg-blue-500 text-white flex items-center space-x-4">
                <img src="/instagram.png" alt="Instagram" className="w-10 h-10 rounded-lg" />
                <span className="text-black">
                <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline"
                    >
                    SysForms
                    </a>
                </span>
                </button>
                
                <button className="relative rounded-xl px-6 py-4 bg-blue-500 text-white flex items-center space-x-4">
                <img src="/instagram.png" alt="Instagram" className="w-10 h-10 rounded-lg" />
                <span className="text-black">
                <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline"
                    >
                    Polo Francano De T.I
                    </a>
                </span>
                </button>
            </div>
            
            <div className="mt-4 text-right">
                <button
                onClick={closeModal1}
                className="px-4 py-2 text-black hover:text-black"
                >
                Fechar
                </button>
            </div>
            </div>
        </div>
        )}

      {/* Modal 2 */}
      {isModalOpen2 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 shadow-lg z-60">
        <h2 className="text-xl mb-4">Facebook</h2>
        <div className="flex flex-col space-y-3">
            <button className="relative rounded-xl px-6 py-4 bg-blue-500 text-white flex items-center space-x-4">
            <img src="/facebook.png" alt="Instagram" className="w-10 h-10 rounded-lg" />
            <span className="text-black">
            <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:underline"
                >
                Contur
                </a>
            </span>
            </button>
            
            <button className="relative rounded-xl px-6 py-4 bg-blue-500 text-white flex items-center space-x-4">
            <img src="/facebook.png" alt="Instagram" className="w-10 h-10 rounded-lg" />
            <span className="text-black">
            <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:underline"
                >
                SysForms
                </a>
            </span>
            </button>
            
            <button className="relative rounded-xl px-6 py-4 bg-blue-500 text-white flex items-center space-x-4">
            <img src="/facebook.png" alt="Instagram" className="w-10 h-10 rounded-lg" />
            <span className="text-black">
            <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:underline"
                >
                Polo Francano De T.I
                </a>
            </span>
            </button>
        </div>
        <div className="mt-5 text-right">
            <button
            onClick={closeModal2}
            className="px-5 py-2 text-black hover:text-black"
            >
            Fechar
            </button>
        </div>
        </div>
    </div>
      )}
    <div>
        <p className="text-white"> 2024 Todos os direitos reservados</p>
    </div>
    </section>
  );
};