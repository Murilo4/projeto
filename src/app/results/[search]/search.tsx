'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import 'rc-slider/assets/index.css'
import { useRouter, useParams } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import Cookies from 'universal-cookie'
import Slider from "rc-slider";
import 'react-toastify/dist/ReactToastify.css'
import { CircularProgress } from '@mui/material'; // Importa o loader circular do Material-UI
import { number } from 'zod'

interface Place {
  id: number
  slug: string
  about: string
  description: string
  ratingNumber: number | null
  type: string
  workStart: string
  workStop: string
  lowerPrice: number
  higherPrice: number
  mediumRate: number
}

interface PlaceData {
  place: Place
  photo: string
  comment: string
  categories: string[]
  rating: number
  placeName: string
}

interface LocalType {
  id: string;
  type: string;
}

const ResultsPage: React.FC = () => {
  const cookies = useMemo(() => new Cookies(), [])
  const router = useRouter();
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [showFilters, setFiltrosVisiveis] = useState(true);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const minStars:number = 1
  const maxStars:number = 5
  const [hidden] = useState({ price: false });
  const [filterTypes, setFilterTypes] = useState<LocalType[]>([]);
  const [isOpenNow, setIsOpenNow] = useState<boolean>(false); // Estado para "Aberto agora"
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]); // Estado para tipos selecionados
  const [filterData, setFilterData] = useState({
    price: {
      min: minPrice,
      max: maxPrice,
    },
  });
  const [filterStars, setFilterStars] = useState({
    stars: {
      min: minStars,
      max: maxStars,
    },
  });

  const { search } = useParams()
  const searchText = Array.isArray(search) ? search[0] : search?.slice(9) || '';
  const toggleFiltros = () => {
    setFiltrosVisiveis(!showFilters);
  };

  const handleSliderChange = (newValues: number | number[]) => {
    if (Array.isArray(newValues)) {
      setFilterData((prevState) => ({
        ...prevState,
        price: {
          min: newValues[0],
          max: newValues[1],
        },
      }))
    }
  }

  const handleSliderStarsChange = (newValues: number | number[]) => {
    if (Array.isArray(newValues)) {
      setFilterStars((prevState) => ({
        ...prevState,
        stars: {
          min: newValues[0],
          max: newValues[1],
        },
      }))
    }
  }

  const fetchTypesFilter = useCallback(async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/get-types/`, {
        method: 'GET',
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setFilterTypes(data.tipos);
      } else {
        toast.error('Erro ao carregar tipos');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      toast.error('Erro ao carregar tipos. Tente novamente mais tarde.');
    }
  }, []); // Remova cookies do array de dependências

  useEffect(() => {
    fetchTypesFilter();
  }, [fetchTypesFilter]);
  const city = localStorage.getItem('selectedCity') || "";
  const [searchInput, setSearchInput] = useState<string>(searchText);

  const handleSearchSubmit = () => {
    fetchPlaces(pageNumber, filterData.price.min, filterData.price.max, filterStars.stars.min, filterStars.stars.max, isOpenNow, selectedTypes);
  };

  // Função para buscar os locais
  const fetchPlaces = useCallback(async (pageNumber: number, minPrice: number, maxPrice: number, minStars: number, maxStars: number, isOpenNow: boolean, selectedTypes: string[]) => {
    setLoader(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      const token = cookies.get('access');
      const typesQuery = selectedTypes.map((type) => `type=${type}`).join('&');
      const searchQuery = selectedTypes.length > 0 ? '' : `&search=${searchText}`;
      const selectedCity = localStorage.getItem('selectedCity') || city; // Captura a cidade do localStorage ou usa o valor padrão
      const response = await fetch(`${apiUrl}/get-all-places/${pageNumber}/?${`${searchQuery}&city=${selectedCity}&lowerPrice=${minPrice}&higherPrice=${maxPrice}&minStars=${minStars}&maxStarts=${maxStars}&openNow=${isOpenNow}&${typesQuery}`}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.success) {
        console.log(data);
        setPlaces(data.places);
        setHasNextPage(data.hasNext);
        setHasPreviousPage(data.hasPrevious);
        setPage(data.page);
        setPageNumber(data.page)
        setMinPrice(data.minPrice);
        setMaxPrice(data.maxPrice);
        setTotalPages(data.totalPages);
      } else {
        toast.error('Erro ao carregar locais');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      toast.error('Erro ao carregar locais. Tente novamente mais tarde.');
    }
    setLoader(false);
  }, [city, cookies, searchText]); // Remova cookies do array de dependências

  useEffect(() => {
    fetchPlaces(pageNumber, minPrice, maxPrice, minStars, maxStars, isOpenNow, selectedTypes);
  }, [fetchPlaces, isOpenNow, maxPrice, maxStars, minPrice, minStars, pageNumber, selectedTypes])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilterData({
        price: {
          min: minPrice,
          max: maxPrice,
        },
      });
    }, 300); // Adiciona um atraso de 300ms

    return () => clearTimeout(timeout); // Limpa o timeout anterior para evitar conflitos
  }, [minPrice, maxPrice]);

  // Atualiza os tipos selecionados com base no searchText
  useEffect(() => {
    if (filterTypes.length > 0 && typeof searchText === 'string') { // Verifica se searchText é uma string
      const matchedTypes = filterTypes
        .filter((type) => searchText.toLowerCase().includes(type.type.toLowerCase()))
        .map((type) => type.type);
      setSelectedTypes(matchedTypes);
    }
  }, [filterTypes, searchText]);

  const handleTypeChange = (type: string, isChecked: boolean) => {
    setSelectedTypes((prevSelected) =>
      isChecked ? [...prevSelected, type] : prevSelected.filter((t) => t !== type)
    );
  };

  const handleButtonClick = (link: string) => {
    router.push(`http://localhost:3000/main-page/${link}`)
  };

  return (
    <>
      <ToastContainer />
      {/* Barra de pesquisa */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Pesquisar..."
          className="w-1/2 p-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearchSubmit}
          className="ml-4 px-4 py-2 bg-blue text-white rounded-xl shadow-md hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-6 px-4">
        {/* Filtros */}
        <div className="w-full lg:w-1/5 mb-6 lg:mb-0">
          <button
            onClick={toggleFiltros}
            className="w-full bg-blue-500 text-black py-2 rounded-lg border-slate-400 mb-6 border-2 shadow-lg shadow-slate-400"
          >
            {showFilters ? "Esconder filtros" : "Abrir filtros"}
          </button>
          {showFilters ? (
            loader ? (
              <div className="flex items-center justify-center h-32">
                <CircularProgress /> {/* Loader circular para os filtros */}
              </div>
            ) : (
              <div className="bg-white p-4 border-2 border-slate-400 rounded-lg shadow-lg shadow-slate-400 space-y-6">
                <div className="h-full">
                  <h3 className="font-bold mb-2">Tipo</h3>
                  {filterTypes.length === 0 ? (
                    <p className="text-center">Nenhum tipo encontrado.</p>
                  ) : (
                    filterTypes.map((type, index) => (
                      <div className="space-y-1" key={index}>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={selectedTypes.includes(type.type)} // Marca automaticamente os tipos correspondentes
                            onChange={(e) => handleTypeChange(type.type, e.target.checked)} // Atualiza os tipos selecionados
                          />
                          {type.type}
                        </label>
                      </div>
                    ))
                  )}
                  <div
                    className={`${hidden.price ? 'max-h-0 opacity-0' : 'max-h-96 py-2 opacity-100'} overflow-hidden px-3 transition-all duration-300 ease-in-out`}
                  >
                    <h3 className="font-bold mb-2">Preço</h3>
                    <Slider
                      range
                      min={minPrice}  // Define o valor mínimo do slider
                      max={maxPrice}  // Define o valor máximo do slider
                      step={5}                          // Passo do slider
                      value={[filterData.price.min, filterData.price.max]} // Valores atuais do slider
                      onChange={handleSliderChange}
                      styles={{
                        track: {
                          backgroundColor: '#2196f3', // Cor da faixa preenchida
                          height: 8, // Espessura da faixa
                          borderRadius: 5,
                        },
                        rail: {
                          backgroundColor: '#d3d3d3', // Cor da faixa não preenchida
                          height: 8, // Espessura da faixa não preenchida
                          borderRadius: 5,
                        },
                        handle: {
                          backgroundColor: '#2196f3', // Cor do controle
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                        },
                      }}
                    />
                    <div className="flex justify-between text-sm mt-1">
                      <span>R${filterData.price.min}</span>   {/* Exibe o valor mínimo */}
                      <span>R${filterData.price.max}</span>   {/* Exibe o valor máximo */}
                    </div>
                  </div>

                  <div className='px-3'>

                    <h3 className="font-bold mb-2">Estrelas</h3>
                    <Slider
                      range
                      min={minStars}  // Define o valor mínimo do slider
                      max={maxStars}  // Define o valor máximo do slider
                      step={1}                          // Passo do slider
                      value={[filterStars.stars.min, filterStars.stars.max]} // Valores atuais do slider
                      onChange={handleSliderStarsChange}
                      styles={{
                        track: {
                          backgroundColor: '#2196f3', // Cor da faixa preenchida
                          height: 8, // Espessura da faixa
                          borderRadius: 5,
                        },
                        rail: {
                          backgroundColor: '#d3d3d3', // Cor da faixa não preenchida
                          height: 8, // Espessura da faixa não preenchida
                          borderRadius: 5,
                        },
                        handle: {
                          backgroundColor: '#2196f3', // Cor do controle
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                        },
                      }}
                    />
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-yellow text-sm">
                        {filterStars.stars.min} {"★".repeat(filterStars.stars.min)}</span>   {/* Exibe o valor mínimo */}
                      <span className="text-yellow text-sm ml-2">
                        {filterStars.stars.max} {"★".repeat(filterStars.stars.max)}</span>   {/* Exibe o valor máximo */}
                    </div>
                  </div>

                  <div className='px-3'>
                    <h3 className="font-bold mb-2">Horário de funcionamento</h3>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={isOpenNow}
                        onChange={(e) => setIsOpenNow(e.target.checked)} // Atualiza o estado
                      />
                      Aberto agora
                    </label>
                  </div>
                  <div>
                    <button
                      className="w-full bg-blue-500 text-black py-2 rounded-lg mt-2 border-2 shadow-lg shadow-slate-400 border-slate-400"
                      onClick={() => {
                        fetchPlaces(pageNumber, filterData.price.min, filterData.price.max, filterStars.stars.min, filterStars.stars.max, isOpenNow, selectedTypes); // Inclui os tipos selecionados
                      }}
                    >
                      Aplicar filtros
                    </button>
                  </div>
                </div>
              </div>
            )
          ) : null}
        </div>

        {/* Conteúdo principal */}
        <div
          style={{
            boxShadow: "0px -4px 6px rgba(0, 0, 0, 0.1), 4px 0px 8px rgba(200, 200, 200, 1)",
          }}
          className="flex-1 p-4 bg-background-blue rounded-t-lg shadow-md shadow-slate-400 min-h-screen"
        >
          <h2 className="text-2xl font-bold mb-5 text-center">{searchText} em {city}</h2>
          <div className="inline-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <h2 className="flex items-center gap-2 bg-gray-100 border-2 text-base font-medium px-4 py-2 rounded-full shadow border-slate-300">
              <span className="text-green-button">✔</span> {city}
            </h2>
            {selectedTypes.map((type, index) => (
              <h2 key={index} className="flex items-center border-2 gap-2 bg-gray-100 w-auto text-base font-medium px-2 py-2 rounded-full shadow border-slate-300">
                <span className="text-green-button">✔</span> {type}
              </h2>
            ))}
          </div>
          {/* Cards de Restaurantes */}
          <div className="space-y-5">
            {loader ? (
              <div className="flex items-center justify-center h-64">
                <CircularProgress /> {/* Loader circular para a lista de locais */}
              </div>
            ) : places.length === 0 ? (
              <p className="text-center">Nenhum local encontrado.</p>
            ) : (
              places.map((placeData, index) => (
                <div
                  key={index}
                  className="border-2 border-white bg-white rounded-lg flex flex-col lg:flex-row shadow-lg shadow-slate-400 hover:scale-105 transition-transform duration-500"
                >
                  {/* Imagem do Restaurante */}
                  <img
                    src={placeData.photo ? `http://localhost:8000${placeData.photo}` : "/default-image.png"}
                    alt={`Restaurante ${index + 1}`}
                    className="w-full lg:w-44 h-44 lg:h-full rounded-t-md lg:rounded-l-md object-cover border"
                  />
                  {/* Informações do Restaurante */}
                  <div className="flex-1 p-4">
                    <h3 className="text-xl font-semibold mt-1">{placeData.placeName}
                      <span className="ml-4 text-base">{placeData.place.mediumRate} Estrelas</span>
                      <span className="text-yellow text-xl ml-2">
                        {"★".repeat(placeData.place.mediumRate)}{"☆".repeat(5 - placeData.place.mediumRate)}
                      </span>
                    </h3>
                    <p>{placeData.comment}</p>
                    <p className="text-base">{placeData.place.description}</p>
                    <p className="text-base mb-2">
                      {placeData.categories.join(", ")}
                    </p>
                    <p className="text-base font-semibold text-green">horario de funcionamento: {placeData.place.workStart} - {placeData.place.workStop}</p>
                    <p className="text-base font-semibold">Preço: R$ {placeData.place.lowerPrice} - R$ {placeData.place.higherPrice}</p>
                  </div>
                  <button
                    className="bg-blue-500 text-black py-2 px-6 rounded-lg h-10 self-center hover:scale-110"
                    onClick={() => handleButtonClick(placeData.place.slug)}><img src='/saida.png' className='max-w-8 max-h-8' alt='link'></img>
                  </button>
                </div>
              )
              ))}
          </div>
          {/* Paginação */}
          <div className="flex justify-center mt-5">
            <button
              onClick={() => {
                setPage(page - 1);
                fetchPlaces(page - 1, minPrice, maxPrice, minStars, maxStars, isOpenNow, selectedTypes);
              }}
              className={`bg-blue text-white py-2 px-4 rounded-lg ${!hasPreviousPage && 'hidden'}`}
            >
              Anterior
            </button>
            <span className="mx-4">
              Página {page} de {totalPages}
            </span>
            <button
              onClick={() => {
                setPage(page + 1);
                fetchPlaces(page + 1, minPrice, maxPrice, minStars, maxStars, isOpenNow, selectedTypes);
              }}
              className={`bg-blue text-white py-2 px-4 rounded-lg ${!hasNextPage && 'hidden'}`}
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsPage;