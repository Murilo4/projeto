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
  estrelas: number;
}

export const Sliders2 = () => {
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
      delay: 2800,
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
          { src: "/sliders/restaurante3.jpg", alt: "restaurante", title: "Restaurante com ótimo preços", descricao: "Pratos saborosos a preços acessíveis.", horario: "12h - 22h", link: "/restaurante3", estrelas: 4 },
          { src: "/sliders/restaurante4.jpg", alt: "restaurante", title: "Restaurante com ótimo custo benefício", descricao: "Excelente qualidade por um preço justo.", horario: "12h - 22h", link: "/restaurante4", estrelas: 5 },
          { src: "/sliders/hotel4.jpg", alt: "hotel", title: "Hotel com ótima localização", descricao: "Próximo aos principais pontos turísticos.", horario: "24h", link: "/hotel4", estrelas: 4 },
          { src: "/sliders/hotel5.jpg", alt: "hotel", title: "Hotel com ótima avaliação", descricao: "Hospedagem de qualidade e conforto.", horario: "24h", link: "/hotel5", estrelas: 5 },
          { src: "/sliders/hotel6.jpg", alt: "hotel", title: "Hotel com café da manhã", descricao: "Desfrute de um delicioso café da manhã incluído.", horario: "24h", link: "/hotel6", estrelas: 4 },
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch slides:", error);
      setSlides([
        { src: "/sliders/restaurante3.jpg", alt: "restaurante", title: "Restaurante com ótimo preços", descricao: "Pratos saborosos a preços acessíveis.", horario: "12h - 22h", link: "/restaurante3", estrelas: 4 },
        { src: "/sliders/restaurante4.jpg", alt: "restaurante", title: "Restaurante com ótimo custo benefício", descricao: "Excelente qualidade por um preço justo.", horario: "12h - 22h", link: "/restaurante4", estrelas: 5 },
        { src: "/sliders/hotel4.jpg", alt: "hotel", title: "Hotel com ótima localização", descricao: "Próximo aos principais pontos turísticos.", horario: "24h", link: "/hotel4", estrelas: 4 },
        { src: "/sliders/hotel5.jpg", alt: "hotel", title: "Hotel com ótima avaliação", descricao: "Hospedagem de qualidade e conforto.", horario: "24h", link: "/hotel5", estrelas: 5 },
        { src: "/sliders/hotel6.jpg", alt: "hotel", title: "Hotel com café da manhã", descricao: "Desfrute de um delicioso café da manhã incluído.", horario: "24h", link: "/hotel6", estrelas: 4 },
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
    <section className="mx-auto max-w-1440px px-2 bg-background">

      <div className="mt-10 flex flex-col items-baseline justify-between">
        <p className="text-decoration-line: underline text-xl">Mais procurados</p>
      </div>

      <div className="w-full h-96 mt-5 bg-background mb-40">
        <Slider settings={settings}>
          {slides.map((slide, index) => (
            <SwiperSlide key={index + 5} className="flex justify-center">
              <div className="border bg-neutral-200 rounded-lg shadow-lg transition transform">
                <div className="w-full h-64">
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full h-64 object-cover rounded-md shadow-md hover:scale-95"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-xl">{slide.title}</h3>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow text-xl">
                      {"★".repeat(slide.estrelas)}{"☆".repeat(5 - slide.estrelas)} {/* Exemplo de estrelas */}
                    </span>
                    <span className="ml-2 text-base">{slide.estrelas} Estrelas</span>
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

export default Sliders2;