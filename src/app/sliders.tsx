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
    { src: "/sliders/hotel1.jpg", alt: "hotel", title: "Hotel de luxo 4 estrelas" },
    { src: "/sliders/hotel2.jpg", alt: "hotel", title: "Hotel de luxo 5 estrelas" },
    { src: "/sliders/restaurante1.jpg", alt: "restaurante", title: "Restaurante em ótima localização"},
    { src: "/sliders/hotel3.jpg", alt: "hotel", title: "Hotel Muito bem avaliado"},
    { src: "/sliders/restaurante2.jpg", alt: "restaurante", title: "Restaurante com vista para o mar"},
  ];

  return (
    <section className="mx-auto max-w-1440px px-2 bg-background">

      <p className="text-decoration-line: underline text-xl ">Locais para se descobrir</p>

      <div className="w-full h-96 mt-5 bg-background">
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
    </section>
  );
}

export default Sliders