'use client';
import React, { useState, useRef, useEffect } from 'react';
import Slider from "@/components/Slider";
import { SwiperProps, SwiperSlide } from "swiper/react";

export const Partners = () => {
  const [activeModal, setActiveModal] = useState<number | null>(null); // Modal dinâmico
  const modalRef = useRef<HTMLDivElement>(null);

  const settings: SwiperProps = {
    spaceBetween: 10,
    slidesPerView: 3,
    breakpoints: {
      100: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
    autoplay: { delay: 3500, disableOnInteraction: true },
  };

  const slides = [
    { 
      src: "/fatec.jpeg", 
      alt: "Fatec Franca", 
      title: "Fatec Franca",
      socials: { facebook: "https://www.facebook.com/fatecfranca/", 
      instagram: "https://www.instagram.com/fatecfranca", linkedin: "https://br.linkedin.com/school/fatec-franca/",
      x: "https://x.com/FatecFranca" },
    },
    { 
      src: "/unifacef.jpg", 
      alt: "Uni-Facef", 
      title: "Uni-Facef",
      socials: { facebook: "https://www.facebook.com/unifacef/", 
      instagram: "https://www.instagram.com/unifacef/", linkedin: "https://br.linkedin.com/school/uni-facef/",
      x: "https://x.com/UniFACEF" }
    },
    { 
      src: "/famef.png", 
      alt: "famef", 
      title: "Famef SP",
      socials: { facebook: "https://www.facebook.com/famef.sp", 
      instagram: "https://www.instagram.com/famef.sp/", linkedin: "https://br.linkedin.com/school/famef/" }
    },
    { 
      src: "/BarraGrande.png", 
      alt: "BarraGrande", 
      title: "Cachaça Barra Grande",
      socials: { facebook: "https://www.facebook.com/cachacabarragde", 
      instagram: "https://www.instagram.com/cachacabarragrande/" }
    },
    { 
      src: "/nenaviagens.jpg", 
      alt: "nenaviagens", 
      title: "Nena Viagens",
      socials: { facebook: "https://www.facebook.com/nena.viagens/?locale=pt_BR", 
      instagram: "https://www.instagram.com/nenaviagens/", linkedin: "https://br.linkedin.com/company/nena-viagens" }
    },
    { 
      src: "/infinitytransporte.jpg", 
      alt: "infinity transporte", 
      title: "Infinity Transporte Turismo",
      socials: { facebook: "https://www.facebook.com/infinity.transporte.turismo", 
      instagram: "https://www.instagram.com/infinity_transporte_turismo/"}
    },
    { 
      src: "/olintocafe.png", 
      alt: "infinity transporte", 
      title: "Infinity Transporte Turismo",
      socials: { facebook: "https://www.facebook.com/@olintocafefranca/", 
      instagram: "https://www.instagram.com/olintocafe/", linkedin: "https://br.linkedin.com/company/olinto-cafe"}
    },
    { 
      src: "/prefeituradefranca.jpg", 
      alt: "Prefeitura de Franca", 
      title: "Prefeitura de Franca",
      socials: { facebook: "https://www.facebook.com/prefeituradefranca", 
      instagram: "https://www.instagram.com/prefeituradefranca/", linkedin: "https://br.linkedin.com/company/prefeitura-municipal-de-franca",
      x: "https://x.com/preffrancasp"}
    },
    { 
      src: "/acif.png", 
      alt: "Acif Franca", 
      title: "Acif Franca",
      socials: { facebook: "https://www.facebook.com/acifrancasp", 
      instagram: "https://www.instagram.com/acifranca/", linkedin: "https://br.linkedin.com/in/acifranca"}
    },
    { 
      src: "/sebrae.jpg", 
      alt: "sebrae", 
      title: "Sebrae",
      socials: { facebook: "https://www.facebook.com/sebrae", 
      instagram: "https://www.instagram.com/sebrae/", linkedin: "https://br.linkedin.com/company/sebrae",
      x: "https://x.com/sebraesp"}
    },
    { 
      src: "/senac.png", 
      alt: "Senac", 
      title: "Senac",
      socials: { facebook: "https://www.facebook.com/@senacfranca", 
      instagram: "https://www.instagram.com/senacfranca/", linkedin: "https://br.linkedin.com/school/senacsaopaulo/",
      x: "https://x.com/SenacBrasil"}
    },
    { 
      src: "/sesc.jpg", 
      alt: "Sesc", 
      title: "Sesc",
      socials: { facebook: "https://www.facebook.com/SescBrasil", 
      instagram: "https://www.instagram.com/sescfranca/", linkedin: "https://br.linkedin.com/company/sescbrasil",
      x: "https://x.com/sescsp"}
    },
    { 
      src: "/senai.jpg", 
      alt: "Senai", 
      title: "Senai",
      socials: { facebook: "https://www.facebook.com/senaisp.franca", 
      instagram: "https://www.instagram.com/senaifranca/", linkedin: "https://br.linkedin.com/company/senai-nacional",
      x: "https://x.com/SENAInacional"}
    },
    { 
      src: "/sacremate.png", 
      alt: "Sacramalte", 
      title: "Sacramalte",
      socials: { facebook: "https://www.facebook.com/sacramalte", 
      instagram: "https://www.instagram.com/sacramalte/", x: "https://x.com/SacraMalte"}
    },
    { 
      src: "/hallel.jpg", 
      alt: "Hallel Franca", 
      title: "Hallel Franca",
      socials: { facebook: "https://www.facebook.com/hallelfranca", instagram: "https://www.instagram.com/hallelfrancaoficial/"}
    },
  ];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setActiveModal(null);
      }
    };
    if (activeModal !== null) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [activeModal]);

  return (
    <section className="mx-auto max-w-full px-2 bg-blue-test">
      <div className="mx-auto max-w-1440px px-2 bg-blue-test">
        <p className="text-decoration-line: underline text-xl font-serif">Parceiros</p>
        <div className="w-full h-80 mt-4 mb-10 bg-blue-test">
          <Slider settings={settings}>
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <div className="flex flex-col items-center h-80">
                  <img 
                    src={slide.src} 
                    alt={slide.alt} 
                    className="w-full object-cover rounded-lg shadow-md shadow-slate-700" 
                    style={{ height: '85%' }}
                    onClick={() => setActiveModal(index)} // Abre o modal dinâmico
                  />
                  <p 
                  className="mt-2 text-center text-lg font-serif shadow-slate-700 font-semibold">
                    {slide.title}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Slider>
        </div>
      </div>

      {/* Modal */}
      {activeModal !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            ref={modalRef} 
            className="bg-white rounded-lg p-6 w-96 shadow-lg z-60 overflow-y-auto">
            <h2 className="text-xl mb-4 text-black font-serif">
              Redes Sociais - {slides[activeModal].title}
            </h2>
            <div className="flex flex-col space-y-3">
            <button className="relative rounded-xl px-4 py-2 bg-blue-500 text-white flex items-center space-x-4">
                <img 
                  src="/instagram.png" 
                  alt="Instagram" 
                  className="w-12 h-12 rounded-lg" 
                />
                <span className="text-black">
                  <a
                    href={slides[activeModal].socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline font-serif text-xl"
                  >
                    Instagram
                  </a>
                </span>
              </button>
              <button className="relative rounded-xl px-2 py-2 bg-blue-500 text-white flex items-center space-x-4">
                <img 
                  src="/facebook.png" 
                  alt="Facebook" 
                  className="w-16 h-16 rounded-lg" 
                />
                <span className="text-black">
                  <a
                    href={slides[activeModal].socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline font-serif text-xl"
                  >
                    Facebook
                  </a>
                </span>
              </button>
              {slides[activeModal].socials.linkedin && (
              <button className="relative rounded-xl px-4 py-2 bg-blue-500 text-white flex items-center space-x-4">
                <img 
                  src="/linkedin.png" 
                  alt="linkedin" 
                  className="w-12 h-12 rounded-lg" 
                />
                <span className="text-black">
                  <a
                    href={slides[activeModal].socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline font-serif text-xl"
                  >
                    Linkedin
                  </a>
                </span>
              </button>
              )}
              {slides[activeModal].socials.x && (
              <button className="relative rounded-xl px-4 py-3 bg-blue-500 text-white flex items-center space-x-4">
                <img 
                  src="/x.jpg" 
                  alt="x" 
                  className="w-12 h-12 rounded-lg" 
                />
                <span className="text-black">
                  <a
                    href={slides[activeModal].socials.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline font-serif text-xl"
                  >
                    Twitter/X
                  </a>
                </span>
              </button>
              )}
            </div>
            <div className="mt-4 text-right">
              <button 
                onClick={() => setActiveModal(null)} 
                className="px-4 py-2 bg-red-500 text-black rounded-lg hover:bg-red-600"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Partners;