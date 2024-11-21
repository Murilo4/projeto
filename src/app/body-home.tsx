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
    effect: 'cards',
  }

  // Array de slides para as imagens
  const slides = [
    { src: "/hotel1.jpg", alt: "hotel" },
    { src: "/hotel2.jpg", alt: "hotel" },
    { src: "/restaurante1.jpg", alt: "restaurante" },
    { src: "/hotel3.jpg", alt: "hotel" },
    { src: "/restaurante2.jpg", alt: "restaurante" },
    { src: "/restaurante3.jpg", alt: "restaurante" },
    { src: "/restaurante4.jpg", alt: "restaurante" },
    { src: "/hotel4.jpg", alt: "hotel" },
    { src: "/hotel5.jpg", alt: "hotel" },
    { src: "/hotel6.jpg", alt: "hotel" },
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
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center justify-between">
        <div className="relative w-656px h-14 mt-10 flex flex-col items-center justify-between">
          <img
            src="/lupa.png"
            alt="Ícone de busca"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-8"
          />
          <input
            type="text"
            placeholder="Procure por locais aqui..."
            className="pl-20 w-full h-14 rounded-lg border-4 border-light-blue text-black placeholder-black"
          />
        </div>
      </div>

      <p className="text-decoration-line: underline text-xl mt-10">Mais procurados</p>

      <div className="w-full h-96 mt-5 mb-30 bg-white">
        <Slider settings={settings}>
          {slides.slice(0, 5).map((slide, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className="flex flex-col items-center h-80 justify-center">
                <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover rounded-lg" />
              </div>
            </SwiperSlide>
          ))}
        </Slider>
      </div>

      <div className="mt-10 flex flex-col items-baseline justify-between">
        <p className="text-decoration-line: underline text-xl">Mais procurados</p>
      </div>

      <div className="w-full h-96 bg-white">
        <Slider settings={settings}>
          {slides.slice(5).map((slide, index) => (
            <SwiperSlide key={index + 5} className="flex items-center justify-center">
              <div className="flex flex-col items-center h-80 justify-center">
                <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover rounded-lg" />
              </div>
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    </section>
  );
}