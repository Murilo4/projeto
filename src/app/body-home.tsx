'use client'
import { ButtonDefault } from "@/components/ButtonDefault"
import React from 'react';
import Slider from "@/components/Slider";
import { SwiperProps, SwiperSlide } from "swiper/react";

export const HomeBody = () => {
  const settings: SwiperProps = {
    spaceBetween: 10,
    slidesPerView: 3,
    pagination: {
      clickable: true
    },
    breakpoints: {
      100: {
        slidesPerView: 1, // 1 slide visível em telas pequenas
      },
      768: {
        slidesPerView: 2, // 2 slides visíveis em telas médias
      },
      1024: {
        slidesPerView: 3, // 3 slides visíveis em telas maiores
      },
    },
  }

  // Array de slides para as imagens
  const slides = [
    { src: "/hotel1.jpg", alt: "hotel", title: "Hotel de luxo 4 estrelas" },
    { src: "/hotel2.jpg", alt: "hotel", title: "Hotel de luxo 5 estrelas" },
    { src: "/restaurante1.jpg", alt: "restaurante", title: "Restaurante em ótima localização"},
    { src: "/hotel3.jpg", alt: "hotel", title: "Hotel Muito bem avaliado"},
    { src: "/restaurante2.jpg", alt: "restaurante", title: "Restaurante com vista para o mar"},
    { src: "/restaurante3.jpg", alt: "restaurante", title: "Restaurante com ótimo preços"},
    { src: "/restaurante4.jpg", alt: "restaurante", title: "Restaurante com ótimo custo beneficio" },
    { src: "/hotel4.jpg", alt: "hotel" , title: "Hotel com ótima localização"},
    { src: "/hotel5.jpg", alt: "hotel", title: "Hotel com ótima avaliação"},
    { src: "/hotel6.jpg", alt: "hotel", title: "Hotel com café da manhã"},
  ];

  return (
    <section className="mx-auto mt-6 max-w-1440px px-2 bg-white min-h-screen">
      <div className="relative w-full h-656px">
        <img
          src="/background.jpg"
          alt="Imagem 1"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
        />
        <div className="relative pb-10 flex flex-col items-center justify-end h-full">
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

      <div className="w-full mt-5 flex flex-col items-center">
        <div className="relative w-full max-w-md lg:max-w-2xl xl:max-w-3xl h-12 mt-12 flex items-center">
          <img
            src="/lupa.png"
            alt="Ícone de busca"
            className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 lg:w-8 lg:h-8"
          />
          <input
            type="text"
            placeholder="Procure por locais aqui..."
            className="pl-12 lg:pl-20 w-full h-12 lg:h-14 rounded-3xl border-opacity-70 lg:border-4 border-blue-thirth text-black placeholder-gray-500 shadow-very-clean shadow-blue-thirth focus:outline-none"
          />
        </div>
      </div>

      <p className="text-decoration-line: underline text-xl mt-10">Locais para se descobrir</p>

      <div className="w-full h-96 mt-5 mb-10 bg-white">
      <Slider settings={settings}>
          {slides.slice(0, 5).map((slide, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className="flex flex-col items-center h-96">
                <img 
                  src={slide.src} 
                  alt={slide.alt} 
                  className="w-full object-cover rounded-lg" 
                  style={{ height: '80%' }}
                />
                <p 
                className="mt-4 text-center text-lg font-serif">
                  {slide.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Slider>
      </div>

      <div className="mt-10 flex flex-col items-baseline justify-between">
        <p className="text-decoration-line: underline text-xl">Mais procurados</p>
      </div>
      <div className="w-full h-96 mt-5 bg-white">
        <Slider settings={settings}>
          {slides.slice(5).map((slide, index) => (
            <SwiperSlide key={index + 5} className="flex justify-center">
              <div className="flex flex-col items-center h-96">
                <img 
                src={slide.src} 
                alt={slide.alt} 
                className="w-full object-cover rounded-lg" 
                style={{ height: '80%' }} />
                <p 
                className="mt-4 text-center text-lg font-serif">
                  {slide.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    </section>
  );
}