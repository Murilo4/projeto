'use client';

import React, { useState, useEffect } from 'react';
import Slider from '@/components/Slider'; // Componente Slider fornecido
import { SwiperSlide } from 'swiper/react';
import { Restaurante, Historia, CidadeData, Atracao, Hoteis, Cultura, Teatro } from '@/types/Restaurantes';
import { SwiperProps } from 'swiper/react';

const ResultsCitys = () => {
  const [cityData, setCityData] = useState<CidadeData | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [sortedCategories, setSortedCategories] = useState<string[]>([]);
  
  const [restaurants, setRestaurants] = useState<Restaurante[]>([]);
  const [history, setHistory] = useState<Historia[]>([]);
  const [attractions, setAttractions] = useState<Atracao[]>([]);
  const [hotels, setHotels] = useState<Hoteis[]>([]);
  const [culture, setCulture] = useState<Cultura[]>([]);
  const [theater, setTheater] = useState<Teatro[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchCity = params.get('search');
    
    if (searchCity) {
      setCity(searchCity);
      
      // Fazendo as requisições para as categorias separadas
      fetchCityData(searchCity);
    }
  }, []);

  const fetchCityData = async (city: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
      // Requisição para Restaurantes
      const restaurantsResponse = await fetch(`/${apiUrl}/restaurantes?city=${city}`);
      const restaurantsData = await restaurantsResponse.json();
      setRestaurants(restaurantsData);

      // Requisição para História
      const historyResponse = await fetch(`/${apiUrl}/historia?city=${city}`);
      const historyData = await historyResponse.json();
      setHistory(historyData);

      // Requisição para Atrações
      const attractionsResponse = await fetch(`/${apiUrl}/atracoes?city=${city}`);
      const attractionsData = await attractionsResponse.json();
      setAttractions(attractionsData);

      // Requisição para Hoteis
      const hotelsResponse = await fetch(`/${apiUrl}/hoteis?city=${city}`);
      const hotelsData = await hotelsResponse.json();
      setHotels(hotelsData);

      // Requisição para Cultura
      const cultureResponse = await fetch(`/${apiUrl}/cultura?city=${city}`);
      const cultureData = await cultureResponse.json();
      setCulture(cultureData);

      // Requisição para Teatro
      const theaterResponse = await fetch(`/${apiUrl}/teatro?city=${city}`);
      const theaterData = await theaterResponse.json();
      setTheater(theaterData);
      
      // Adiciona as categorias para exibição condicional
      setSortedCategories(['Restaurantes', 'Hoteis', 'Historia', 'Atrações', 'Cultura', 'Teatro']);
    } catch (error) {
      console.error("Erro ao buscar dados da cidade:", error);
    }
  };

  const sliderSettings: SwiperProps = {
    spaceBetween: 10,
    slidesPerView: 1,
    pagination: { clickable: true },
    autoplay: { delay: 3000, disableOnInteraction: false },
  };

  const handleSortCategory = (category: string) => {
    const newSortedCategories = [category, ...sortedCategories.filter(cat => cat !== category)];
    setSortedCategories(newSortedCategories);
  };

  const handleButtonClick = (link: string) => {
    window.location.href = link;
  };

  if (!city || !restaurants || !history || !attractions || !hotels || !culture || !theater) return <div>Carregando...</div>;

  return (
    <div className="container mx-auto p-4 mt-24">
      <p className="text-5xl mt-2 font-serif">{city}</p>
      <p className="flex text-3xl font-thin justify-center mb-4">Você encontra em {city}</p>

      {/* Botões para navegação entre categorias */}
      <div className="flex justify-center gap-4 mb-8 ">
        {['Restaurantes', 'Hoteis', 'Historia', 'Atrações', 'Cultura', 'Teatro'].map((category) => (
          <button
            key={category}
            className="px-4 bg-white text-black border-2 text-xl shadow-sm py-2 rounded-2xl hover:bg-blue-thirth hover:scale-110 hover:shadow-xl"
            onClick={() => handleSortCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Renderizando categorias com base nos dados da cidade */}
      {sortedCategories.map((category) => (
        <div key={category} className="mb-8">
          {/* Título da Categoria com Botão "Ver Todos" ao lado direito */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{category}</h1>
            {['Restaurantes', 'Hoteis', 'Atrações', 'Cultura', 'Teatro'].includes(category) && (
              <button
                className="bg-slate-300 text-black px-4 py-2 rounded-lg hover:bg-blue-test text-lg hover:scale-125"
                onClick={() => window.location.href = `/results?search=${category}&city=${city}`}
              >
                Ver Todos
              </button>
            )}
          </div>

          {/* Renderiza os itens de cada categoria */}
          {category === 'Historia' && history.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-lg">
              <h2 className="text-xl font-semibold mb-2">História de {city}</h2>
              <p className="ml-4 text-lg">{item.info}</p>
            </div>
          ))}

          {category === 'Restaurantes' && restaurants.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-lg">
              <Slider settings={sliderSettings}>
                {item.imagens.map((image, i) => (
                  <SwiperSlide key={i} className="w-full h-64 object-cover rounded-md">
                    <img src={image} alt={item.nome} className="w-full h-64 object-fill rounded-md mx-2 my-2 pr-4" />
                  </SwiperSlide>
                ))}
              </Slider>
              <div className="p-4">
                <h3 className="font-semibold text-xl">{item.nome}</h3>
                <div className="flex items-center mb-2">
                  <span className="text-yellow text-xl">
                    {"★".repeat(item.estrelas)}{"☆".repeat(5 - item.estrelas)}
                  </span>
                  <span className="ml-2 text-base">{item.estrelas} Estrelas</span>
                </div>
                <p className=" text-gray-600">{item.descricao}</p>
                <p className="text-base text-green-button">Horário: {item.horario}</p>
              </div>
              <div className="flex justify-between items-center mx-4 my-3">
                <button
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => handleButtonClick(item.link)}
                >
                  Visitar Página
                </button>
              </div>
            </div>
          ))}

          {category === 'Atrações' && attractions.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-lg mb-10 transition transform hover:shadow-2xl hover:scale-105">
              <h2 className="text-xl font-semibold mb-2">{item.nome}</h2>
              <p className="ml-4 text-lg">{item.descricao}</p>
            </div>
          ))}

          {category === 'Cultura' && culture.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-lg mb-10 transition transform hover:shadow-2xl hover:scale-105">
              <h2 className="text-xl font-semibold mb-2">{item.nome}</h2>
              <p className="ml-4 text-lg">{item.descricao}</p>
            </div>
          ))}

          {category === 'Teatro' && theater.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-lg mb-10 transition transform hover:shadow-2xl hover:scale-105">
              <h2 className="text-xl font-semibold mb-2">{item.nome}</h2>
              <p className="ml-4 text-lg">{item.descricao}</p>
            </div>
          ))}

          {category === 'Hoteis' && hotels.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-lg">
              <h2 className="text-xl font-semibold mb-2">{item.nome}</h2>
              <p className="text-lg">{item.descricao}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ResultsCitys;
