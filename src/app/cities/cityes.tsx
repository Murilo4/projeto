'use client'

import React, { useState, useEffect } from 'react';
import Slider from '@/components/Slider'; // Componente Slider fornecido
import { SwiperSlide } from 'swiper/react';
import { Restaurante, Historia, CidadeData, Atracao } from '@/types/Restaurantes';
import data from './data'
import { SwiperProps } from 'swiper/react';
// Dados já definidos conforme a estrutura acima


const ResultsCitys = () => {
  const [cityData, setCityData] = useState<CidadeData | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [sortedCategories, setSortedCategories] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchCity = params.get('search');
    if (searchCity && data[searchCity]) {
      setCity(searchCity);
      setCityData(data[searchCity]);

      // Inicializa as categorias disponíveis
      const initialCategories = Object.keys(data[searchCity]);
      setSortedCategories([
        ...initialCategories.filter(cat => cat === 'Restaurantes' || cat !== 'Restaurantes')
      ]);
    }
  }, []);

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

  if (!cityData) return <div>Carregando...</div>;

  return (
    <div className="container mx-auto p-4 mt-24">
      <p className="text-5xl mt-2 font-serif">{city}</p>
      <p className="flex text-3xl font-thin justify-center mb-4">Você encontra em {city}</p>

      {/* Botões para navegação entre categorias */}
      <div className="flex justify-center gap-4 mb-8">
        {['Restaurantes', 'Hoteis', 'Historia', 'Atracoes', 'cultura'].map((category) => (
          <button
            key={category}
            className="px-4 bg-white text-black border-2 text-xl shadow-sm py-2 rounded-2xl hover:bg-blue-thirth"
            onClick={() => handleSortCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Renderizando categorias com base nos dados da cidade */}
      {sortedCategories.map((category) => (
        <div key={category} className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{category}</h1>
          </div>

          {/* Renderiza os itens de cada categoria */}
          {category === 'Historia' ? (
            <div>
              {cityData.Historia?.map((item: Historia, index: number) => (
                <div key={index} className="border rounded-lg p-4 shadow-lg">
                  <h2 className="text-xl font-semibold mb-2">História de {city}</h2>
                  <p>{item.info}</p>
                  <div className="mt-4 pl-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {item.imagens.map((img, i) => (
                      <img key={i} src={img} alt={`História de ${city}`} className="w-full h-64 object-cover rounded-md" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : category === 'Restaurantes' || category === 'Hoteis' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
              {category === 'Restaurantes' && cityData.Restaurantes?.map((item: Restaurante, index: number) => (
                <div key={index} className="border rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105">
                  <Slider settings={sliderSettings}>
                    {item.imagens.map((image, i) => (
                      <SwiperSlide key={i} className="w-full h-64 object-cover rounded-md">
                        <img src={image} alt={item.nome} className="w-full h-64 object-fill rounded-md mx-2 my-2 pr-4" />
                      </SwiperSlide>
                    ))}
                  </Slider>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{item.nome}</h3>
                    <div className="flex items-center mb-2">
                      <span className="text-yellow text-xl">
                        {"★".repeat(item.estrelas)}{"☆".repeat(5 - item.estrelas)}
                      </span>
                      <span className="ml-2 text-base">{item.estrelas} Estrelas</span>
                    </div>
                    <p className="text-sm text-gray-600">{item.descricao}</p>
                    <p className="text-sm text-gray-600">Horário: {item.horario}</p>
                  </div>
                  <div className="flex justify-between items-center mx-2 my-3">
                    <button
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                      onClick={() => window.location.href = item.link}
                    >
                      Visitar Página
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : category === 'Atracoes' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
              {cityData.Atracoes?.map((item: Atracao, index: number) => (
                <div key={index} className="border rounded-lg p-4 shadow-lg">
                  <h3 className="font-semibold text-lg">{item.nome}</h3>
                  <p className="text-sm text-gray-600">{item.descricao}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {item.imagens.map((img, i) => (
                      <img key={i} src={img} alt={`Atração ${item.nome}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default ResultsCitys;