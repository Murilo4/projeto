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
    autoplay: { delay: 10000, disableOnInteraction: true },
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
        <div className="w-full h-80 mt-5 mb-10 bg-blue-test">
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