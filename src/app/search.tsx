'use client'
import { ButtonDefault } from "@/components/ButtonDefault"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Slider from "@/components/Slider";
import { SwiperProps, SwiperSlide } from "swiper/react";
import Image from 'next/image';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const router = useRouter();

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Impede o comportamento padrão do formulário
        if (searchTerm.trim()) { // Verifica se o termo de pesquisa não está vazio
            router.push(`/results?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    const slides = [
      { src: "/mainPhotos/vistaaerea.jpg", alt: "hotel", title: "Hotel de luxo 4 estrelas" },
      { src: "/mainPhotos/Franca_02.jpg", alt: "hotel", title: "Hotel de luxo 5 estrelas" },
      { src: "/mainPhotos/franca2.png", alt: "hotel", title: "Hotel de luxo 5 estrelas" },
      { src: "/mainPhotos/Matriz-1930.jpg", alt: "restaurante", title: "Restaurante em ótima localização"},
      { src: "/mainPhotos/VistaAereapracaSRdaConceicao.jpg", alt: "restaurante", title: "Restaurante com ótimo preços"},
      { src: "/mainPhotos/PracaNSCon.jpg", alt: "restaurante", title: "Restaurante com vista para o mar"},
      { src: "/mainPhotos/pracamatriz1.png", alt: "restaurante", title: "Restaurante em ótima localização"},
      { src: "/mainPhotos/pracamatriz2.png", alt: "restaurante", title: "Restaurante em ótima localização"},
      { src: "/mainPhotos/Praca9dejulho.jpg", alt: "hotel", title: "Hotel Muito bem avaliado"},
      { src: "/mainPhotos/pracasoldado2.png", alt: "hotel", title: "Hotel Muito bem avaliado"},
      { src: "/mainPhotos/Relogio-do-sol-1940.jpg", alt: "restaurante", title: "Restaurante com ótimo custo beneficio" },
      { src: "/mainPhotos/relogio-do-sol.png", alt: "restaurante", title: "Restaurante com ótimo custo beneficio" },
      { src: "/mainPhotos/Estadio_AA.jpg", alt: "hotel" , title: "Hotel com ótima localização"},
      { src: "/mainPhotos/estadio_aa_novo.png", alt: "hotel" , title: "Hotel com ótima localização"},
      { src: "/mainPhotos/estacaomogiana.jpg", alt: "hotel", title: "Hotel com ótima avaliação"},
      { src: "/mainPhotos/estacaomogiana.png", alt: "hotel", title: "Hotel com café da manhã"},
      { src: "/mainPhotos/estacao-mogiana2.jpg", alt: "hotel", title: "Hotel com café da manhã"},
      { src: "/mainPhotos/estacaomogiana2.png", alt: "hotel", title: "Hotel com café da manhã"},
      { src: "/mainPhotos/parquefernandocosta.jpg", alt: "hotel", title: "Hotel com café da manhã"},
      { src: "/mainPhotos/parquefernandocosta2.jpg", alt: "hotel", title: "Hotel com café da manhã"},
      { src: "/mainPhotos/parquefernandocosta3.png", alt: "hotel", title: "Hotel com café da manhã"},
      { src: "/mainPhotos/parquefernandocosta4.png", alt: "hotel", title: "Hotel com café da manhã"},
    ];
    const settings: SwiperProps = {
      spaceBetween: 10,
      slidesPerView: 1,
      breakpoints: {
        100: {
          slidesPerView: 1, // 1 slide visível em telas pequenas
        },
        768: {
          slidesPerView: 1, // 2 slides visíveis em telas médias
        },
        1024: {
          slidesPerView: 1, // 3 slides visíveis em telas maiores
        },
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    }
  

  return (
    <section className="mx-auto mt-18 max-w-1440px px-40 bg-background min-h-screen">
      <div className="relative w-full h-656px">
        <Slider settings={settings}>
          {slides.slice(0, 22).map((slide, index) => (
            <SwiperSlide key={index} className="relative w-full h-656px">
              <div className="relative w-full h-656px">
                <img 
                  src={slide.src} 
                  alt={slide.alt} 
                  className="absolute  w-full h-full object-cover rounded-3xl" 
                  style={{ height: '100%' }}
                />
              </div>
            </SwiperSlide>
          ))}
          </Slider>
          <div className="relative pb-10 mt-4 flex flex-col items-center justify-end h-full">
            <ButtonDefault
              text="Saiba mais"
              type="link"
              style="light"
              link="/saiba-mais"
              radius="rounded-xl"
              paddingx="px-6"
              paddingy="py-4"
              shadow
            />
          </div>
        </div>
  
        {/* Search Form */}
        <div className="w-full mt-14 flex flex-col items-center">
          <form
            onSubmit={handleSearch}
            className="relative w-full max-w-md lg:max-w-2xl xl:max-w-3xl flex items-center"
          >
            <div className="relative w-full h-12 lg:h-14 flex items-center">
              <Image
                src="/lupa.png"
                alt="Ícone de busca"
                width={24}
                height={24}
                className="absolute left-6 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Procure por locais aqui..."
                className="pl-12 lg:pl-20 w-full h-full rounded-3xl border-opacity-70 lg:border-4 border-blue-thirth text-black placeholder:font-semibold placeholder-gray-800 shadow-very-clean shadow-blue-thirth focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-3xl ml-4"
              >
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  };
  
  export default Search;