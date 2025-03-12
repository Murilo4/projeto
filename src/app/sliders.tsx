'use client'
import React, { useState, useEffect } from 'react';
import Slider from "@/components/Slider";
import { SwiperProps, SwiperSlide } from "swiper/react";

interface Slide {
  src: string;
  alt: string;
  title: string;
  descricao: string;
  horario: string;
  link: string;
}

export const Sliders = () => {
  const [slides, setSlides] = useState<Slide[]>([]);

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

  const settingsImages: SwiperProps = {
    spaceBetween: 10,
    slidesPerView: 1,
    pagination: {
      clickable: true
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  }

  const fetchSlides = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    try {
      const response = await fetch(`${apiUrl}/slides`);
      const data = await response.json();
      if (data.slides && data.slides.length > 0) {
        setSlides(data.slides);
      } else {
        setSlides([
          { src: "/sliders/hotel1.jpg", alt: "hotel", title: "Hotel de luxo 4 estrelas", descricao: "Um hotel de luxo com vista panorâmica.", horario: "24h", link: "/hotel1" },
          { src: "/sliders/hotel2.jpg", alt: "hotel", title: "Hotel de luxo 5 estrelas", descricao: "Hospedagem de luxo e alto padrão de qualidade.", horario: "24h", link: "/hotel2" },
          { src: "/sliders/restaurante1.jpg", alt: "restaurante", title: "Restaurante em ótima localização", descricao: "Restaurante gourmet com pratos sofisticados.", horario: "12h - 22h", link: "/restaurante1" },
          { src: "/sliders/hotel3.jpg", alt: "hotel", title: "Hotel Muito bem avaliado", descricao: "Hospedagem premiada por sua excelência.", horario: "24h", link: "/hotel3" },
          { src: "/sliders/restaurante2.jpg", alt: "restaurante", title: "Restaurante com vista para o mar", descricao: "Comida deliciosa com uma vista incrível.", horario: "12h - 23h", link: "/restaurante2" },
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch slides:", error);
      setSlides([
        { src: "/sliders/hotel1.jpg", alt: "hotel", title: "Hotel de luxo 4 estrelas", descricao: "Um hotel de luxo com vista panorâmica.", horario: "24h", link: "/hotel1" },
        { src: "/sliders/hotel2.jpg", alt: "hotel", title: "Hotel de luxo 5 estrelas", descricao: "Hospedagem de luxo e alto padrão de qualidade.", horario: "24h", link: "/hotel2" },
        { src: "/sliders/restaurante1.jpg", alt: "restaurante", title: "Restaurante em ótima localização", descricao: "Restaurante gourmet com pratos sofisticados.", horario: "12h - 22h", link: "/restaurante1" },
        { src: "/sliders/hotel3.jpg", alt: "hotel", title: "Hotel Muito bem avaliado", descricao: "Hospedagem premiada por sua excelência.", horario: "24h", link: "/hotel3" },
        { src: "/sliders/restaurante2.jpg", alt: "restaurante", title: "Restaurante com vista para o mar", descricao: "Comida deliciosa com uma vista incrível.", horario: "12h - 23h", link: "/restaurante2" },
      ]);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  // Função para redirecionar ao clicar no botão
  const handleButtonClick = (link: string) => {
    window.location.href = link;
  };

  return (
    <section className="mx-auto max-w-1440px px-2 bg-background mb-40">
      <p className="text-decoration-line: underline text-xl">Locais para se descobrir</p>

      <div className="w-full h-96 mt-5 bg-background">
        <Slider settings={settings}>
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="flex  justify-center">
              <div className="border bg-neutral-200 rounded-lg shadow-lg transition transform">
                <Slider settings={settingsImages}>
                  <SwiperSlide className="w-full h-64 object-cover rounded-md mx-2 my-2 pr-4">
                    <img src={slide.src} alt={slide.alt} className="w-full h-64 object-cover rounded-md shadow-md hover:scale-95" />
                  </SwiperSlide>
                </Slider>
                <div className="p-4">
                  <h3 className="font-semibold text-xl">{slide.title}</h3>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow text-xl">
                      {"★".repeat(4)}{"☆".repeat(5 - 4)} {/* Exemplo de estrelas */}
                    </span>
                    <span className="ml-2 text-base">4 Estrelas</span>
                  </div>
                  <p className="text-gray-600">{slide.descricao}</p>
                  <p className="text-base text-green-button">Horário: {slide.horario}</p>
                </div>
                <div className="flex justify-between items-center mx-4 my-3">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => handleButtonClick(slide.link)}
                  >
                    Visitar Página
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Sliders;