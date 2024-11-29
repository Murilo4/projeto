'use client'
import React from 'react';
import Slider from "@/components/Slider";
import { SwiperProps, SwiperSlide } from "swiper/react";

export const Sliders = () => {
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
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
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
    <section className="mx-auto mt-6 max-w-1440px px-2 bg-background min-h-screen">

      <p className="text-decoration-line: underline text-xl mt-10">Locais para se descobrir</p>

      <div className="w-full h-96 mt-5 mb-10 bg-background">
      <Slider settings={settings}>
          {slides.slice(0, 5).map((slide, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className="flex flex-col items-center h-96 ">
                <img 
                  src={slide.src} 
                  alt={slide.alt} 
                  className="w-full object-cover rounded-lg shadow-md shadow-slate-700" 
                  style={{ height: '85%' }}
                />
                <p 
                className="mt-2 text-center text-lg font-serif">
                  {slide.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Slider>
      </div>

      <div className="mt-10 flex flex-col items-baseline justify-between">
        <p className="text-decoration-line: underline text-xl">Mais procurados</p>
      </div>
      <div className="w-full h-96 mt-5 bg-background">
        <Slider settings={settings}>
          {slides.slice(5).map((slide, index) => (
            <SwiperSlide key={index + 5} className="flex justify-center">
              <div className="flex flex-col items-center h-96">
                <img 
                src={slide.src} 
                alt={slide.alt} 
                className="w-full object-cover rounded-lg  shadow-md shadow-slate-700" 
                style={{ height: '85%' }} />
                <p 
                className="mt-2 text-center text-lg font-serif">
                  {slide.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Sliders