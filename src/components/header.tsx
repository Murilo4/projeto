'use client'

import { ButtonDefault } from "@/components/ButtonDefault"
import { HeaderType } from "@/types/header";
import Image from "next/image"
import { useEffect, useState } from "react";

const Header: HeaderType = ({short = true}) => {
  
  const [mobile, setMobile] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  // Funções para abrir e fechar as modais
  const Novidades = () => setIsModalOpen1(true);
  const closeNovidades = () => setIsModalOpen1(false);

  const openConta = () => setIsModalOpen2(true);
  const closeConta = () => setIsModalOpen2(false);

  const [activeModal, setActiveModal] = useState(null); // Estado para rastrear a modal ativa
  const openModal = (modal) => {
    setActiveModal(modal); // Define a modal ativa
  };

  const closeModal = () => {
    setActiveModal(null); // Fecha a modal
  };



  useEffect(() => {
    function handleResize() {
      const size = window.innerWidth

      if (size < 1024) setMobile(true)
      else setMobile(false)

      setLoading(false)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
    <section className="mx-auto mt-3 max-w-1440px px-2 flex bg-white items-center">
    {short && (
      <div className="inline-flex justify-start">
        <div className="flex items-center">
          <Image
            src="/contur.png"
            width={180}
            height={100}
            alt="logo"
          />
        </div>
      </div>
    )}
    <nav>
      <ul className="flex justify-between items-center px-10">
        <li className="relative inline-flex items-center px-10">
        <ButtonDefault
            text="Novidades"
            type="button"
            style="light"
            radius="rounded-xl"
            paddingx="px-6"
            paddingy="py-4"
            onClick={Novidades}
          />
        
          {activeModal === isModalOpen1 && (
            <div className="absolute left-0 top-full mt-4 ml-20 bg-light-blue rounded-lg p-6 w-464px shadow-lg z-50">
              <h2 className="text-xl mb-4 text-slate-800 font-serif hover:text-black">Novidades</h2>
              <div className="flex flex-col space-y-3">
                <button className="relative rounded-xl px-6 py-4 bg-blue-500 text-white flex items-center space-x-4">
                  <span className="text-black font-serif text-xl">
                    <a href="https://www.instagram.com/comtur_franca/" target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:underline hover:text-2xl hover:text-black"> Restaurantes mais populares </a>
                  </span>
                </button>
                <button className="relative rounded-xl px-6 py-4 bg-blue-500 text-white flex items-center space-x-4">
                  <span className="text-black font-serif text-xl">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:underline hover:text-2xl hover:text-black"> Hotéis mais procurados </a>
                  </span>
                </button>
                <button className="relative rounded-xl px-6 py-4 bg-blue-500 text-white flex items-center space-x-4">
                  <span className="text-black font-serif text-xl">
                    <a href="https://www.instagram.com/polotifranca" target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:underline hover:text-black hover:text-2xl"> Descobrir locais novos </a>
                  </span>
                </button>
              </div>
              <div className="mt-4 text-right">
                <button onClick={closeNovidades} className="px-4 text-slate-800 hover:text-black font-serif text-xl hover:text-2xl"> Fechar </button>
              </div>
            </div>
          )}
        </li>
        <li className="inline-flex items-center px-10">
        <ButtonDefault
            text="Meus ganhos"
            type="link"
            style="light"
            link="/ganhos"
            radius="rounded-xl"
            paddingx="px-6"
            paddingy="py-4"
          />
        </li>
        <li className="inline-flex items-center px-10">
        <ButtonDefault
            text="Ajuda"
            type="link"
            style="light"
            link="/ajuda"
            radius="rounded-xl"
            paddingx="px-6"
            paddingy="py-4"
          />
        </li>
        <div className="flex justify-end ">
        <li className="relative inline-flex items-center">
        <ButtonDefault
            text="minha conta"
            type="button"
            style="light"
            radius="rounded-xl"
            paddingx="px-6"
            paddingy="py-4"
            onClick={openConta}
          />
          {activeModal === isModalOpen2 && (
            <div className="absolute left-0 top-full mt-4 ml-20 bg-light-blue rounded-lg p-6 w-464px shadow-lg z-50">
              <h2 className="text-xl mb-4 text-black font-serif">Minha conta</h2>
              <div className="flex flex-col space-y-3">
                <button className="relative rounded-xl px-6 py-4 bg-blue-500 text-white flex items-center space-x-4">
                  <span className="text-black font-serif text-xl">
                    <a href="https://www.instagram.com/comtur_franca/" target="_blank" rel="noopener noreferrer" className="text-black hover:underline"> Restaurantes mais populares </a>
                  </span>
                </button>
                <button className="relative rounded-xl px-6 py-4 bg-blue-500 text-white flex items-center space-x-4">
                  <span className="text-black font-serif text-xl">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:underline"> Hotéis mais procurados </a>
                  </span>
                </button>
                <button className="relative rounded-xl px-6 py-4 bg-blue-500 text-white flex items-center space-x-4">
                  <span className="text-black font-serif text-xl">
                    <a href="https://www.instagram.com/polotifranca" target="_blank" rel="noopener noreferrer" className="text-black hover:underline"> Descobrir locais novos </a>
                  </span>
                </button>
              </div>
              <div className="mt-4 text-right">
                <button onClick={closeConta} className="px-4 text-black hover:text-black font-serif text-xl"> Fechar </button>
              </div>
            </div>
          )}
        </li>
        </div>
      </ul>
    </nav>
  </section>
  </>
  );
}

export default Header