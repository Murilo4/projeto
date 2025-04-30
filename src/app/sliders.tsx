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
  rating: number;
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
        const response = await fetch(`${apiUrl}/get-place-base-slides/`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();

        if (data.places && data.places.length > 0) {
            // Mapeia os dados recebidos para o formato esperado pelo slider
            const mappedSlides = data.places.map((place: any) => ({
                src: place.photos[0] || "/sliders/default.jpg", // Usa a primeira foto ou uma imagem padrão
                alt: place.placeName,
                title: place.placeName,
                descricao: place.description,
                rating: place.rating,
                horario: `${place.workStart} - ${place.workStop}`,
                link: `/main-page/${place.slug}`, // Gera um link baseado no nome do local
            }));

            setSlides(mappedSlides);
        } else {
            console.warn('Nenhum local encontrado.');
            setSlides([]);
        }
    } catch (error) {
        console.error("Failed to fetch slides:", error);
        setSlides([]);
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

      <div className="w-full h-96 mt-5 mb-4 bg-background">
        <Slider settings={settings}>
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="flex  justify-center">
              <div className="border bg-neutral-300 rounded-lg mb-4 shadow-lg transition transform">
                <Slider settings={settingsImages}>
                  <SwiperSlide className="w-full h-64 object-cover rounded-md mx-2 my-2 pr-4">
                    <img src={`http://localhost:8000${slide.src}`} alt={slide.alt} className="w-full h-64 object-cover rounded-md shadow-md hover:scale-95" />
                  </SwiperSlide>
                </Slider>
                <div className="p-4">
                  <h3 className="font-semibold text-xl">{slide.title}</h3>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow text-xl">
                      {"★".repeat(slide.rating)}
                    </span>
                    <span className="ml-2 text-base">{`${slide.rating} Estrelas`}</span>
                  </div>
                  <p className="text-gray-600">{slide.descricao}</p>
                  <p className="text-base text-green-button">Horário: {slide.horario}</p>
                </div>
                <div className="flex justify-between items-center mx-4 my-3">
                  <button
                    className="bg-green-button px-4 py-2 rounded hover:bg-gray-400"
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