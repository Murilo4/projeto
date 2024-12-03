'use client'
import React from 'react';
import Slider from "@/components/Slider";
import { SwiperProps, SwiperSlide } from "swiper/react";

export const Sliders2 = () => {
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
      delay: 2800,
      disableOnInteraction: false,
    },
  }

  // Array de slides para as imagens
  const slides = [
    { src: "/sliders/restaurante3.jpg", alt: "restaurante", title: "Restaurante com ótimo preços"},
    { src: "/sliders/restaurante4.jpg", alt: "restaurante", title: "Restaurante com ótimo custo beneficio" },
    { src: "/sliders/hotel4.jpg", alt: "hotel" , title: "Hotel com ótima localização"},
    { src: "/sliders/hotel5.jpg", alt: "hotel", title: "Hotel com ótima avaliação"},
    { src: "/sliders/hotel6.jpg", alt: "hotel", title: "Hotel com café da manhã"},
  ];

  return (
    <section className="mx-auto max-w-1440px px-2  bg-background">

      <div className="mt-10 flex flex-col items-baseline justify-between">
        <p className="text-decoration-line: underline text-xl">Mais procurados</p>
      </div>
      <div className="w-full h-96 mt-5 bg-background">
        <Slider settings={settings}>
            {slides.slice(0, 5).map((slide, index) => (
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

export default Sliders2