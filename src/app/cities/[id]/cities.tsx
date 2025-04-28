'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Slider from '@/components/Slider';
import { SwiperSlide } from 'swiper/react';
import { SwiperProps } from 'swiper/react';

interface Place {
  id: number;
  slug: string;
  about: string;
  description: string;
  ratingNumber: number | null;
  type: string;
  workStart: string;
  workStop: string;
  lowerPrice: number;
  higherPrice: number;
  mediumRate: number;
}

interface PlaceData {
  place: Place;
  photo: string;
  comment: string | null;
  categories: string[];
  rating: number;
  placeName: string;
}

interface Historys {
  history: string;
  info: string;
}

interface ApiResponse {
  places: PlaceData[];
}

const ResultsCitys = () => {
  const [restaurants, setRestaurants] = useState<PlaceData[]>([]);
  const [history, setHistory] = useState<Historys[]>([]);
  const [attractions, setAttractions] = useState<PlaceData[]>([]);
  const [hotels, setHotels] = useState<PlaceData[]>([]);
  const [culture, setCulture] = useState<PlaceData[]>([]);
  const [theater, setTheater] = useState<PlaceData[]>([]);
  const [sortedCategories, setSortedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { id: rawId } = useParams();
  const id = rawId as string;

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

  const processPlacesResponse = (data: ApiResponse) => {
    if (!data || !Array.isArray(data.places)) {
      console.error("Erro: dados retornados não possuem a propriedade 'places' ou não são um array.", data);
      return [];
    }
    return data.places;
  };

  const fetchCategory = useCallback(async (url: string, setState: React.Dispatch<React.SetStateAction<PlaceData[]>>, category: string) => {
    try {
    const response = await fetch(url);
    if (response.ok) {
    const data = await response.json();
    setState(processPlacesResponse(data));
    console.log(data)
    if (data.places && data.places.length > 0) setSortedCategories(prev => [...prev, category]);
    }
    } catch (error) {
    console.error(`Erro ao buscar dados para a categoria ${category}:`, error);
    }
    }, []);

  useEffect(() => {
    if (!id) return; // Early return if id is not valid

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchCategory(`${apiUrl}/get-all-places/${1}/?&city=${id}&type=Restaurante`, setRestaurants, 'Restaurantes'),
        fetchCategory(`${apiUrl}/get-all-places/${1}/?&city=${id}&type=atracao`, setAttractions, 'Atrações'),
        fetchCategory(`${apiUrl}/get-all-places/${1}/?&city=${id}&type=hotel`, setHotels, 'Hoteis'),
        fetchCategory(`${apiUrl}/cultura?city=${id}`, setCulture, 'Cultura'),
        fetchCategory(`${apiUrl}/get-all-places/${1}/?&city=${id}&type=teatro`, setTheater, 'Teatro'),
      ]);
      setLoading(false);
    };
    fetchData();
  }, [fetchCategory, id, apiUrl]);

  const fetchHistory = useCallback(
    async (url: string, setState: React.Dispatch<React.SetStateAction<Historys[]>>, category: string) => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setState(data); // Assuming data is already in the correct format for History[]
          console.log(data);
          if (data.places && data.places.length > 0) setSortedCategories(prev => [...prev, category]);
        }
      } catch (error) {
        console.error(`Erro ao buscar dados para a categoria ${category}:`, error);
      }
    },
    []
  );

  useEffect(() => {
    if (id) {
      fetchHistory(`${apiUrl}/historia?city=${id}`, setHistory, 'Historia');
    }
  }, [fetchHistory, id, apiUrl]);
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

  const handleViewAll = (category: string) => {
    localStorage.setItem('selectedCity', id);
    window.location.href = `/results/search=${category}`;
  };

  if (loading) {
    return <div className="text-center text-2xl mt-10">Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-4 mt-24">
      <p className="text-5xl mt-2 font-serif">{id}</p>
      <p className="flex text-3xl font-thin justify-center mb-4">Você encontra em {id}</p>

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
                onClick={() => handleViewAll(category)} // Usa a função handleViewAll
              >
                Ver Todos
              </button>
            )}
          </div>

          {/* Renderiza os itens de cada categoria */}
          {category === 'Historia' && history.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-lg">
              <h2 className="text-xl font-semibold mb-2">História de {id}</h2>
              <p className="ml-4 text-lg">{item.info}</p>
            </div>
          ))}

          {category === 'Restaurantes' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {restaurants.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 shadow-lg">
                  <Slider settings={sliderSettings}>
                    <SwiperSlide className="w-full h-64 object-cover rounded-md">
                      <img src={`http://localhost:8000${item.photo}`} alt={item.placeName} className="w-full h-64 object-fill rounded-md mx-2 my-2 pr-4" />
                    </SwiperSlide>
                  </Slider>
                  <div className="p-4">
                    <h3 className="font-semibold text-xl">{item.placeName}</h3>
                    <div className="flex items-center mb-2">
                      <span className="text-yellow text-xl">
                        {"★".repeat(item.place.mediumRate || 0)}{"☆".repeat(5 - (item.place.mediumRate || 0))}
                      </span>
                      <span className="ml-2 text-base">{item.place.mediumRate || 0} Estrelas</span>
                    </div>
                    <p className="text-gray-600">{item.place.description}</p>
                    <p className="text-base text-green-button">Horário: {item.place.workStart} - {item.place.workStop}</p>
                    <p className="text-base text-gray-500">Preço: R$ {item.place.lowerPrice} - R$ {item.place.higherPrice}</p>
                  </div>
                  <div className="flex justify-between items-center mx-4 my-3">
                    <button
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                      onClick={() => handleButtonClick(`/main-page/${item.place.slug}`)}
                    >
                      Visitar Página
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {category === 'Atrações' && attractions.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-lg">
              <h3 className="font-semibold text-xl">{item.placeName}</h3>
              <p className="text-gray-600">{item.place.description}</p>
              <p className="text-base text-gray-500">Categorias: {item.categories.join(', ')}</p>
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 mt-2"
                onClick={() => handleButtonClick(`/main-page/${item.place.slug}`)}
              >
                Visitar Página
              </button>
            </div>
          ))}

          {category === 'Cultura' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {culture.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 shadow-lg">
                  <Slider settings={sliderSettings}>
                    <SwiperSlide className="w-full h-64 object-cover rounded-md">
                      <img src={`http://localhost:8000${item.photo}`} alt={item.placeName} className="w-full h-64 object-fill rounded-md mx-2 my-2 pr-4" />
                    </SwiperSlide>
                  </Slider>
                  <div className="p-4">
                    <h3 className="font-semibold text-xl">{item.placeName}</h3>
                    <div className="flex items-center mb-2">
                      <span className="text-yellow text-xl">
                        {"★".repeat(item.place.mediumRate || 0)}{"☆".repeat(5 - (item.place.mediumRate || 0))}
                      </span>
                      <span className="ml-2 text-base">{item.place.mediumRate || 0} Estrelas</span>
                    </div>
                    <p className="text-gray-600">{item.place.description}</p>
                    <p className="text-base text-green-button">Horário: {item.place.workStart} - {item.place.workStop}</p>
                    <p className="text-base text-gray-500">Preço: R$ {item.place.lowerPrice} - R$ {item.place.higherPrice}</p>
                  </div>
                  <div className="flex justify-between items-center mx-4 my-3">
                    <button
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                      onClick={() => handleButtonClick(`/main-page/${item.place.slug}`)}
                    >
                      Visitar Página
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {category === 'Teatro' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {theater.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 shadow-lg">
                  <Slider settings={sliderSettings}>
                    <SwiperSlide className="w-full h-64 object-cover rounded-md">
                      <img src={`http://localhost:8000${item.photo}`} alt={item.placeName} className="w-full h-64 object-fill rounded-md mx-2 my-2 pr-4" />
                    </SwiperSlide>
                  </Slider>
                  <div className="p-4">
                    <h3 className="font-semibold text-xl">{item.placeName}</h3>
                    <div className="flex items-center mb-2">
                      <span className="text-yellow text-xl">
                        {"★".repeat(item.place.mediumRate || 0)}{"☆".repeat(5 - (item.place.mediumRate || 0))}
                      </span>
                      <span className="ml-2 text-base">{item.place.mediumRate || 0} Estrelas</span>
                    </div>
                    <p className="text-gray-600">{item.place.description}</p>
                    <p className="text-base text-green-button">Horário: {item.place.workStart} - {item.place.workStop}</p>
                    <p className="text-base text-gray-500">Preço: R$ {item.place.lowerPrice} - R$ {item.place.higherPrice}</p>
                  </div>
                  <div className="flex justify-between items-center mx-4 my-3">
                    <button
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                      onClick={() => handleButtonClick(`/main-page/${item.place.slug}`)}
                    >
                      Visitar Página
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {category === 'Hoteis' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {hotels.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 shadow-lg">
                  <Slider settings={sliderSettings}>
                    <SwiperSlide className="w-full h-64 object-cover rounded-md">
                      <img src={`http://localhost:8000${item.photo}`} alt={item.placeName} className="w-full h-64 object-fill rounded-md mx-2 my-2 pr-4" />
                    </SwiperSlide>
                  </Slider>
                  <div className="p-4">
                    <h3 className="font-semibold text-xl">{item.placeName}</h3>
                    <div className="flex items-center mb-2">
                      <span className="text-yellow text-xl">
                        {"★".repeat(item.place.mediumRate || 0)}{"☆".repeat(5 - (item.place.mediumRate || 0))}
                      </span>
                      <span className="ml-2 text-base">{item.place.mediumRate || 0} Estrelas</span>
                    </div>
                    <p className="text-gray-600">{item.place.description}</p>
                    <p className="text-base text-green-button">Horário: {item.place.workStart} - {item.place.workStop}</p>
                    <p className="text-base text-gray-500">Preço: R$ {item.place.lowerPrice} - R$ {item.place.higherPrice}</p>
                  </div>
                  <div className="flex justify-between items-center mx-4 my-3">
                    <button
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                      onClick={() => handleButtonClick(`/main-page/${item.place.slug}`)}
                    >
                      Visitar Página
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResultsCitys;
