'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Slider from "@/components/Slider";
import { SwiperProps, SwiperSlide } from "swiper/react";
import Image from 'next/image';

interface Suggestion {
  id: string;
  name: string;
  description: string;
}

interface Slide {
  src: string;
  alt: string;
  title: string;
}

interface SuggestionsResponse {
  places: Suggestion[];
  cities: Suggestion[];
  states: Suggestion[];
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [places, setPlaces] = useState<Suggestion[]>([]);
  const [cities, setCities] = useState<Suggestion[]>([]);
  const [states, setStates] = useState<Suggestion[]>([]);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Impede o comportamento padrão do formulário
    if (searchTerm.trim()) { // Verifica se o termo de pesquisa não está vazio
      router.push(`/results?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const fetchSuggestions = async (query: string) => {
    if (!query.trim()) return; // Verifica se o termo de pesquisa não está vazio
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    const response = await fetch(`${apiUrl}/search-suggestions/?query=${encodeURIComponent(query)}`);
    const data: SuggestionsResponse = await response.json();
    setPlaces(data.places || []);
    setCities(data.cities || []);
    setStates(data.states || []);
  };

  const fetchSlides = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    try {
      const response = await fetch(`${apiUrl}/slides`);
      const data = await response.json();
      if (data.slides && data.slides.length > 0) {
        setSlides(data.slides);
      } else {
        setSlides([
          { src: "/mainPhotos/vistaaerea.jpg", alt: "hotel", title: "Hotel de luxo 4 estrelas" },
          { src: "/mainPhotos/Franca_02.jpg", alt: "hotel", title: "Hotel de luxo 5 estrelas" },
          { src: "/mainPhotos/franca2.png", alt: "hotel", title: "Hotel de luxo 5 estrelas" },
          { src: "/mainPhotos/Matriz-1930.jpg", alt: "restaurante", title: "Restaurante em ótima localização" },
          { src: "/mainPhotos/VistaAereapracaSRdaConceicao.jpg", alt: "restaurante", title: "Restaurante com ótimo preços" },
          { src: "/mainPhotos/PracaNSCon.jpg", alt: "restaurante", title: "Restaurante com vista para o mar" },
          { src: "/mainPhotos/pracamatriz1.png", alt: "restaurante", title: "Restaurante em ótima localização" },
          { src: "/mainPhotos/pracamatriz2.png", alt: "restaurante", title: "Restaurante em ótima localização" },
          { src: "/mainPhotos/Praca9dejulho.jpg", alt: "hotel", title: "Hotel Muito bem avaliado" },
          { src: "/mainPhotos/pracasoldado2.png", alt: "hotel", title: "Hotel Muito bem avaliado" },
          { src: "/mainPhotos/Relogio-do-sol-1940.jpg", alt: "restaurante", title: "Restaurante com ótimo custo beneficio" },
          { src: "/mainPhotos/relogio-do-sol.png", alt: "restaurante", title: "Restaurante com ótimo custo beneficio" },
          { src: "/mainPhotos/Estadio_AA.jpg", alt: "hotel", title: "Hotel com ótima localização" },
          { src: "/mainPhotos/estadio_aa_novo.png", alt: "hotel", title: "Hotel com ótima localização" },
          { src: "/mainPhotos/estacaomogiana.jpg", alt: "hotel", title: "Hotel com ótima avaliação" },
          { src: "/mainPhotos/estacaomogiana.png", alt: "hotel", title: "Hotel com café da manhã" },
          { src: "/mainPhotos/estacao-mogiana2.jpg", alt: "hotel", title: "Hotel com café da manhã" },
          { src: "/mainPhotos/estacaomogiana2.png", alt: "hotel", title: "Hotel com café da manhã" },
          { src: "/mainPhotos/parquefernandocosta.jpg", alt: "hotel", title: "Hotel com café da manhã" },
          { src: "/mainPhotos/parquefernandocosta2.jpg", alt: "hotel", title: "Hotel com café da manhã" },
          { src: "/mainPhotos/parquefernandocosta3.png", alt: "hotel", title: "Hotel com café da manhã" },
          { src: "/mainPhotos/parquefernandocosta4.png", alt: "hotel", title: "Hotel com café da manhã" },
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch slides:", error);
      setSlides([
        { src: "/mainPhotos/vistaaerea.jpg", alt: "hotel", title: "Hotel de luxo 4 estrelas" },
        { src: "/mainPhotos/Franca_02.jpg", alt: "hotel", title: "Hotel de luxo 5 estrelas" },
        { src: "/mainPhotos/franca2.png", alt: "hotel", title: "Hotel de luxo 5 estrelas" },
        { src: "/mainPhotos/Matriz-1930.jpg", alt: "restaurante", title: "Restaurante em ótima localização" },
        { src: "/mainPhotos/VistaAereapracaSRdaConceicao.jpg", alt: "restaurante", title: "Restaurante com ótimo preços" },
        { src: "/mainPhotos/PracaNSCon.jpg", alt: "restaurante", title: "Restaurante com vista para o mar" },
        { src: "/mainPhotos/pracamatriz1.png", alt: "restaurante", title: "Restaurante em ótima localização" },
        { src: "/mainPhotos/pracamatriz2.png", alt: "restaurante", title: "Restaurante em ótima localização" },
        { src: "/mainPhotos/Praca9dejulho.jpg", alt: "hotel", title: "Hotel Muito bem avaliado" },
        { src: "/mainPhotos/pracasoldado2.png", alt: "hotel", title: "Hotel Muito bem avaliado" },
        { src: "/mainPhotos/Relogio-do-sol-1940.jpg", alt: "restaurante", title: "Restaurante com ótimo custo beneficio" },
        { src: "/mainPhotos/relogio-do-sol.png", alt: "restaurante", title: "Restaurante com ótimo custo beneficio" },
        { src: "/mainPhotos/Estadio_AA.jpg", alt: "hotel", title: "Hotel com ótima localização" },
        { src: "/mainPhotos/estadio_aa_novo.png", alt: "hotel", title: "Hotel com ótima localização" },
        { src: "/mainPhotos/estacaomogiana.jpg", alt: "hotel", title: "Hotel com ótima avaliação" },
        { src: "/mainPhotos/estacaomogiana.png", alt: "hotel", title: "Hotel com café da manhã" },
        { src: "/mainPhotos/estacao-mogiana2.jpg", alt: "hotel", title: "Hotel com café da manhã" },
        { src: "/mainPhotos/estacaomogiana2.png", alt: "hotel", title: "Hotel com café da manhã" },
        { src: "/mainPhotos/parquefernandocosta.jpg", alt: "hotel", title: "Hotel com café da manhã" },
        { src: "/mainPhotos/parquefernandocosta2.jpg", alt: "hotel", title: "Hotel com café da manhã" },
        { src: "/mainPhotos/parquefernandocosta3.png", alt: "hotel", title: "Hotel com café da manhã" },
        { src: "/mainPhotos/parquefernandocosta4.png", alt: "hotel", title: "Hotel com café da manhã" },
      ]);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      const delayDebounceFn = setTimeout(() => {
        fetchSuggestions(searchTerm);
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion: Suggestion, type: string) => {
    setSearchTerm(suggestion.name);
    setPlaces([]);
    setCities([]);
    setStates([]);
    if (type === 'place') {
      router.push(`/main-page?search=${encodeURIComponent(suggestion.name)}`);
    } else if (type === 'city') {
      router.push(`/cities?search=${encodeURIComponent(suggestion.name)}`);
    } else if (type === 'state') {
      router.push(`/states?search=${encodeURIComponent(suggestion.name)}`);
    }
  };

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
    <section className="mx-auto mt-18 mb-20 max-w-1440px px-40 bg-background">
      <div className="relative w-full h-656px">
        <Slider settings={settings}>
          {slides.map((slide, index) => (
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
              className="absolute left-4 top-1/2 transform -translate-y-1/2 lg:left-6"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Procure por locais aqui..."
              className="pl-12 lg:pl-16 w-full h-full rounded-3xl border-opacity-70 lg:border-2 border-blue-thirth text-black placeholder:font-semibold placeholder-gray-800 shadow-sm shadow-blue-thirth focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue text-white px-6 py-2 rounded-3xl ml-4 hover:bg-blue focus:bg-blue"
            >
              Buscar
            </button>
          </div>
          {isFocused && searchTerm && (
            <ul className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {places.length > 0 && (
                <>
                  <li className="px-4 py-2 text-gray-700 font-semibold">Locais</li>
                  {places.map((place) => (
                    <li
                      key={place.id}
                      onMouseDown={() => handleSuggestionClick(place, 'place')}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    >
                      {place.name}
                    </li>
                  ))}
                </>
              )}
              {cities.length > 0 && (
                <>
                  <li className="px-4 py-2 text-gray-700 font-semibold">Cidades</li>
                  {cities.map((city) => (
                    <li
                      key={city.id}
                      onMouseDown={() => handleSuggestionClick(city, 'city')}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    >
                      {city.name}
                    </li>
                  ))}
                </>
              )}
              {states.length > 0 && (
                <>
                  <li className="px-4 py-2 text-gray-700 font-semibold">Estados</li>
                  {states.map((state) => (
                    <li
                      key={state.id}
                      onMouseDown={() => handleSuggestionClick(state, 'state')}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    >
                      {state.name}
                    </li>
                  ))}
                </>
              )}
              {places.length === 0 && cities.length === 0 && states.length === 0 && (
                <li className="px-4 py-2 text-gray-500">Nenhuma sugestão encontrada</li>
              )}
            </ul>
          )}
        </form>
      </div>
    </section>
  );
};

export default Search;