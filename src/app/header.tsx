'use client'

import { ButtonDefault } from "@/components/ButtonDefault";
import { HeaderProps } from "@/types/header";
import { useState, useEffect } from "react";
import { ModalState } from "@/types/modal";
import HamburgerButton from "@/components/hamburgerButton";
import Link from 'next/link';
import Cookies from 'universal-cookie';

const Header: React.FC<HeaderProps> = () => {
  const [activeModal, setActiveModal] = useState<ModalState | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<"novidades" | "minha-conta" | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userType, setUserType] = useState<"cpf" | "cnpj" | null>(null);

  useEffect(() => {
    const cookies = new Cookies();
    const accessToken = cookies.get('access');
    const refreshToken = cookies.get('refresh');
    if (accessToken || refreshToken) {
      setIsLoggedIn(true);
      // Fetch user data to determine if they have CPF or CNPJ
      fetchUserData().then(data => {
        console.log(data)
        if (data.cpf) {
          setUserType("cpf");
        } else if (data.cnpj) {
          setUserType("cnpj");
        }
      });
    }
  }, []);

  const fetchUserData = async () => {
    const cookies = new Cookies();
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/get-user-type/`, {
        method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${cookies.get('access')}`
            },
          });
      const data = await response.json();
      if (data.success) {
        return data.userData;
      }
  };

  const openModal = (modal: 'novidades' | "registro" | "minha-conta") => {
    setActiveModal({ isOpen: true, type: modal });
  };

  const toggleSection = (section: "novidades" | "minha-conta" | null) => {
    if (activeSection === section) {
      setActiveSection(null); // Se a seção já estiver aberta, fecha ela
    } else {
      setActiveSection(section); // Abre a seção clicada
    }
  };

  const closeModal = () => {
    setActiveModal({ isOpen: false, type: null });
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleModalClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  return (
    <header className="bg-background max-h-32 shadow-md fixed top-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 pt-1 flex items-center justify-between bg-background">
        <Link href="/" passHref>
          <img src="/novo_Logo.jpg" width={135} height={100} alt="logo"
          className="bg-background object-cover max-h-32 max-w-48" />
        </Link>

        <nav className="hidden lg:flex items-center flex-grow justify-center space-x-8">
          <div className="relative">
            <ButtonDefault
              text="Novidades"
              type="button"
              style="light"
              onClick={() => toggleSection("novidades")}
            />
            {activeSection === "novidades" && (
              <div className="absolute left-1/2 transform  bg-white border-2 border-gray-300 -translate-x-1/2 top-full mt-2 rounded-lg p-6 w-64 shadow-lg z-50">
                <button
                  onClick={() => toggleSection(null)}
                  className="absolute top-2 right-2 bg-white border-2 z-50  border-gray-300 text-black text-2xl font-bold hover:text-gray-300"
                >
                  &times;
                </button>
                <h2 className="text-xl mb-4 font-semibold text-center text-dark-blue">Novidades</h2>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://www.instagram.com/comtur_franca/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-800 hover:underline flex items-center text-xl"
                    >
                      <img src="/icons/restaurant.svg" alt="Restaurantes" className="w-6 h-6 mr-2" />
                      Restaurantes mais populares
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-800 hover:underline flex items-center text-xl"
                    >
                      <img src="/icons/hotel.svg" alt="Hotéis" className="w-6 h-6 mr-2" />
                      Hotéis mais procurados
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {isLoggedIn && userType === "cpf" && (
            <ButtonDefault
              text="Meus ganhos"
              type="link"
              style="light"
              link="/ganhos"
            />
          )}
          {isLoggedIn && userType === "cnpj" && (
            <ButtonDefault
              text="Meus locais"
              type="link"
              style="light"
              link="/meus-locais"
            />
          )}
          <ButtonDefault
            text="Ajuda"
            type="link"
            style="light"
            link="/ajuda"
          />
        </nav>

        <div className="hidden lg:flex items-center">
          {isLoggedIn ? (
            <ButtonDefault
              text="Minha Conta"
              type="button"
              style="light"
              onClick={() => openModal("minha-conta")}
            />
          ) : (
            <>
              <div className="relative pr-3">
                <ButtonDefault
                  text="Login"
                  type="link"
                  style="light"
                  link="/login"
                />
              </div>
              <div>
                <ButtonDefault
                  text="Registro"
                  type="button"
                  style="light"
                  onClick={() => openModal("registro")}
                />
              </div>
            </>
          )}
        </div>

        <div className="lg:hidden">
          <HamburgerButton onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* Modal */}
      {activeModal?.type === "registro" && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 modal-overlay"
          aria-hidden="true"
          onClick={handleModalClick}
        >
          <div className="flex w-full max-w-4xl h-[70vh] rounded-lg overflow-hidden shadow-lg">
            <div className="bg-blue-thirth text-black text-xl p-12 flex flex-col  w-1/2 z-50">
              <div>
                <h3 className="text-xl font-bold mb-4 font-serif">
                  Que bom que você deseja Fazer parte da Contur!
                </h3>
                <p className="text-xl font-semibold font-serif mt-10">
                  Vamos realizar o seu cadastro rapidamente para que você possa
                  desfrutar de tudo que podemos oferecer!
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold font-serif mt-10">
                  Caso já tenha uma conta e deseje utilizar ela, você pode
                  realizar o login através deste botão:
                </p>
                <a href="/login">
                  <button
                    className="mt-8 ml-20 mb-20 bg-white justify-center font-bold py-2 border-spacing-1 border-black px-8 rounded-3xl hover:bg-gray-200 transition shadow-black shadow-mid"
                  >
                    Realizar login
                  </button>
                </a>
              </div>
            </div>
            <div className="bg-slate-200 text-black pt-4 p-12 w-1/2 flex flex-col">
              <div>
                <button
                  onClick={closeModal}
                  className="pl-350px text-black text-2xl font-bold hover:text-gray-300"
                >
                  &times;
                </button>
                <h3 className="text-xl font-bold mb-4 text-black">
                  Qual tipo de conta você gostaria de abrir conosco?
                </h3>
                <div className="mb-10">
                  <p className="text-sm font-medium">
                    <span className="font-bold text-xl">Consumidor: Quero estar me hospedando e ganhando pontos</span>
                  </p>
                  <a href="/registro-consumidor">
                    <button
                      className="mt-4 ml-4 text-xl mb-10 text-black font-bold py-2 px-4 hover:bg-blue-thirth transition border-2 border-blue-thirth shadow-black shadow-mid rounded-3xl"
                    >
                      Cadastre-se aqui
                    </button>
                  </a>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm font-medium mt-0">
                  <span className="font-bold text-xl">Empresa: Quero cadastrar minha empresa</span>
                </p>
                <a href="/registro-empresa">
                  <button className="mt-4 text-xl ml-4 text-black font-bold py-2 px-4 hover:bg-blue-thirth transition border-2 border-blue-thirth shadow-black shadow-mid rounded-3xl">
                    Cadastre sua empresa aqui
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeModal?.type === "minha-conta" && (
        <div
          className="fixed inset-0 flex items-start justify-center bg-opacity-50 z-50 modal-overlay"
          aria-hidden="true"
          onClick={handleModalClick}
        >
          <div className="relative bg-white border-2  border-gray-300 rounded-lg p-6 w-64 shadow-2xl z-50 mt-20" style={{ left: '37%', transform: 'translateX(-50%)' }}>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-black text-2xl font-bold hover:text-gray-300"
            >
              &times;
            </button>
            <h2 className="text-xl mb-4 font-semibold text-center text-dark-blue">Minha Conta</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="/meu-perfil"
                  className="text-slate-800 hover:underline flex items-center text-xl"
                >
                  Acessar meu perfil
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    const cookies = new Cookies();
                    cookies.remove('access');
                    cookies.remove('refresh');
                    setIsLoggedIn(false);
                    closeModal();
                  }}
                  className="text-slate-800 hover:underline flex items-center text-xl"
                >
                  Sair
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-4 flex flex-col">
            <button
              onClick={toggleMobileMenu}
              className="text-slate-800 hover:text-black text-xl font-bold p-2 mb-4"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-slate-800 text-white rounded-md">
                <span className="text-xl font-semibold">×</span>
              </div>
            </button>
            <div className="flex-1 overflow-auto">
              <ul className="space-y-4">
                <li>
                  <button
                    className="text-slate-800 hover:underline w-full mb-2 text-left"
                    onClick={() => toggleSection("novidades")}
                  >
                    Novidades
                  </button>
                  {activeSection === 'novidades' && (
                    <div className="pl-4 mt-2 space-y-2">
                      <p>
                        <a
                          href=""
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-800 hover:underline"
                        >
                          Restaurantes mais populares
                        </a>
                      </p>
                      <p>
                        <a
                          href=""
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-800 hover:underline"
                        >
                          Hotéis mais procurados
                        </a>
                      </p>
                    </div>
                  )}
                </li>
                <li>
                  <button
                    className="text-slate-800 hover:underline w-full mb-2 text-left"
                  >
                    <a href="/meus-ganhos" target="_blank"></a>
                    Meus Ganhos
                  </button>
                </li>
                <li>
                  <button
                    className="text-slate-800 hover:underline w-full mb-6 text-left"
                  >
                    <a href="/ajuda"></a>
                    Ajuda
                  </button>
                </li>
                <button
                  className="text-slate-800 hover:underline w-full text-left"
                  onClick={() => toggleSection('minha-conta')}
                >
                  Conta
                </button>
                {activeSection === 'minha-conta' && (
                  <div className="pl-4 mt-2 space-y-2">
                    {isLoggedIn ? (
                      <>
                        <p>
                          <a
                            href="/meu-perfil"
                            target="_blank"
                            className="text-slate-800 hover:underline"
                          >
                            Perfil
                          </a>
                        </p>
                        <p>
                          <a
                            href="/minha-conta"
                            target="_blank"
                            className="text-slate-800 hover:underline"
                          >
                            Sair
                          </a>
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          <a
                            href="/login"
                            target="_blank"
                            className="text-slate-800 hover:underline"
                          >
                            Login
                          </a>
                        </p>
                        <p>
                          <button onClick={() => openModal("registro")}>
                            Registro
                          </button>
                        </p>
                      </>
                    )}
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;