'use client';

import React, { useState, useCallback, useMemo, useEffect } from "react";
import Cookies from 'universal-cookie'
import Slider from '@/components/Slider'; // Componente Slider fornecido
import { SwiperSlide } from 'swiper/react';
import { SwiperProps } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { toast, ToastContainer } from 'react-toastify'
import { useRouter, useParams } from 'next/navigation'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const data = {
  nome: "Restaurante Cio da Terra Grill",
  estrelas: 4.5,
  qtda_reviews: 6733,
  address: "R. Mal. Caxias, 2384 - Centro",
  descrição: "Cozinha informal de opções tradicionais à la carte com petiscos e churrasco de carnes nobres em espaço casual.",
  avaliações: "Ótimo lugar para se ir com a família.",
  categorias: ["Bebidas", "Lanches", "Almoço"],
  horario: "Fecha às 01:00",
  sobre: 'O Restaurante Cio da Terra Grill, localizado no coração de Franca, é um destino ideal para quem busca uma experiência gastronômica de qualidade. Com um ambiente aconchegante e um atendimento impecável, o local oferece um cardápio diversificado que vai de deliciosos grelhados a pratos tradicionais brasileiros. Reconhecido pelo sabor autêntico e ingredientes frescos, é perfeito tanto para encontros familiares quanto para reuniões com amigos. Sua localização estratégica e o horário estendido tornam o restaurante uma escolha prática e irresistível. Venha conhecer e desfrutar do melhor da culinária local!',
  imagens: ["/cidades/logo1.png", "/cidades/cio-da-terra2.png"],
  avaliaçãoDetalhada: {
    localização: 4.5,
    quartos: 4.3,
    custo: 4.2,
    limpeza: 4.6,
    atendimento: 4.8,
    sono: 4.4,
  },
  comments: [],
};

interface Place {
  id: number
  placeName: string
  about: string
  description: string
  enterprise: number
  locationX: string
  locationY: string
  rating_number: number | null
  type: string
  workStart: string
  workStop: string
  city: string
  state: string
  street: string
  neighborhood: string 
  number: string
  cep: string
  photos: string[]
  categories: string[]
}

interface PlaceData {
  place: Place
}

const Main = () => {
  const [comments, setComments] = useState<string[]>(data.comments || []);
  const [newComment, setNewComment] = useState<string>("");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const cookies = useMemo(() => new Cookies(), [])
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isFavorited, setIsFavorited] = useState<boolean>(false); // Estado para favoritar o local
  const { id } = useParams()
  const [loader, setLoader] = useState<boolean>(false)
  const [place, setPlace] = useState<Place | null>(null)
  const [rating, setRating] = useState<number>(0); // Estado para a avaliação em estrelas

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment.trim()]);
      setNewComment("");
    } else {
      alert("Por favor, escreva um comentário antes de enviar.");
    }
  };
  
  const handleFavorite = useCallback(async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    const token = cookies.get('access');
    try {
      const response = await fetch(`${apiUrl}/get-favorite/${id}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok && data.success) {
        if (data.favorite == true) {
          setIsFavorited(true)  }}
    }
    catch (error) {
      console.error('Erro na requisição:', error);
      toast.error('Erro ao adicionar local aos favoritos. Tente novamente mais tarde.');
    }
  }, [cookies, id])

  const handleOpenFullscreen = (index: number) => {
    setCurrentImageIndex(index);
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  const sliderSettings: SwiperProps = {
    spaceBetween: 10,
    slidesPerView: 1,
    autoplay: { delay: 3000, disableOnInteraction: false },
  };

  const Settings: SwiperProps = {
    spaceBetween: 10,
    slidesPerView: 1,
  };

  const handleToggleFavorite = async () => {
    setIsFavorited(!isFavorited);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    const token = cookies.get('access');
    try {
      const response = await fetch(`${apiUrl}/set-favorite/${id}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok && data.success) {
        if (data.isOwner) {
          toast.error('Você não pode adicionar seu próprio local aos favoritos.');
        } else {
          toast.success(isFavorited ? 'Local removido dos favoritos.' : 'Local adicionado aos favoritos.');
        }
      } else {
        toast.error('Erro ao adicionar local aos favoritos.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      toast.error('Erro ao adicionar local aos favoritos. Tente novamente mais tarde.');
    }
  };

  const handleRatingChange = async (newRating: number) => {
    setRating(newRating); // Atualiza o estado da avaliação

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    const token = cookies.get('access');
    
    try {
      const response = await fetch(`${apiUrl}/create-rating/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ placeId: id, rating: newRating }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast.success('Avaliação enviada com sucesso!');
      } else {
        toast.error('Erro ao enviar avaliação.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      toast.error('Erro ao enviar avaliação. Tente novamente mais tarde.');
    }
  };

  const renderStars = () => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const halfStar = rating - filledStars >= 0.5 ? 1 : 0;
    const emptyStars = totalStars - filledStars - halfStar;

    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-500 cursor-pointer" onClick={() => handleRatingChange(i + 1)} />);
    }
    if (halfStar) stars.push(<FaStarHalfAlt key="half" className="text-yellow-500 cursor-pointer" onClick={() => handleRatingChange(filledStars + 0.5)} />);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-500 cursor-pointer" onClick={() => handleRatingChange(filledStars + 1 + i)} />);
    }

    return stars;
  };

  const fetchPlaces = useCallback(async () => {
    setLoader(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/get-place/${id}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${cookies.get('access')}`,
        },
      })
      const data = await response.json()
      if (response.ok && data.success) {
        setPlace(data.place)
        setRating(data.place.rating_number || 0); // Define a avaliação inicial
      } else {
        toast.error('Erro ao carregar locais')
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
      toast.error('Erro ao carregar locais. Tente novamente mais tarde.')
    }
    setLoader(false)
  }, [cookies, id])

  useEffect(() => {
    fetchPlaces()
    handleFavorite()
  }, [fetchPlaces, handleFavorite])

  if (loader) {
    return <div>Carregando...</div>; // Exibe uma mensagem de carregamento
  }

  if (!place) {
    return <div>Nenhum local encontrado.</div>; // Mensagem caso não haja dados
  }

  return (
    <>
      <ToastContainer />
      <div className="p-4 max-w-4xl mx-auto mt-20">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl ml-2 mb-2 font-bold">{place?.placeName}</h1>
          <button
            onClick={handleToggleFavorite}
            className={`text-4xl ${isFavorited ? 'text-yellow-500' : 'text-gray-500'}`}
          >
            {isFavorited ? "★" : "★"}
          </button>
        </div>
        <div className="mt-2 text-xl mb-4">
          <div className="flex space-x-1">
            {renderStars()}
          </div>
          <span className="ml-2 text-xl ">{place?.rating_number} Avaliações</span>
        </div>
        <p className="mt-2 text-xl text-black">&#x1F4CD; {place?.street}, {place?.number}. {place?.neighborhood}, {place?.city}, {place?.state}</p>
        <Slider settings={sliderSettings}>
          {place.photos.map((image, i) => (
            <SwiperSlide key={i} className="w-full h-96 object-cover rounded-md relative">
              <img
                src={`http://localhost:8000${image}`}
                alt={data.nome}
                className="w-full h-96 object-fill rounded-lg mx-2 my-2 pr-2"
              />
              <button
                onClick={() => handleOpenFullscreen(i)}
                className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-sm px-4 py-2 rounded-md hover:bg-opacity-75"
              >
                Abrir Imagem
              </button>
            </SwiperSlide>
          ))}
        </Slider>

        {isFullscreen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
            <div className="w-full h-full max-w-4xl max-h-96 flex items-center justify-center">
              <Slider
                settings={{
                  ...Settings,
                  initialSlide: currentImageIndex,
                  spaceBetween: 10, // Remove espaços entre slides no fullscreen
                  slidesPerView: 1, // Um slide por vez
                }}
              >
                {place.photos.map((image, i) => (
                  <SwiperSlide key={i} className="flex justify-center items-center">
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={`http://localhost:8000${image}`}
                        alt="imagem"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Slider>
              <button
                onClick={handleCloseFullscreen}
                className="absolute top-2 right-4 bg-white text-black text-lg px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        {/* Avaliações */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Sobre</h2>
          <p className="text-lg text-gray-800 mb-4">{place?.about}</p>

          <hr className="my-4" />

          <p className="text-lg">
            <strong>Descrição:</strong> {place?.description}
          </p>

          <hr className="my-4" />

          <p className="text-lg text-green-button">
            <strong>Horário de funcionamento:</strong> {place?.workStart} até {place?.workStop}
          </p>

          <hr className="my-4" />

          <p className="text-lg">
            <strong>Categorias:</strong> {place?.categories.join(", ")}
          </p>
          <hr className="my-4" />
        </div>

        {/* Adicionar Comentário */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Adicionar Comentário</h3>
          <textarea
            className="w-full border rounded-md p-2 mt-2 h-24"
            placeholder="Escreva seu comentário aqui..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={handleAddComment}
          >
            Enviar Comentário
          </button>
        </div>

        {/* Comentários */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Comentários</h2>
          <ul className="mt-4 space-y-3">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <li key={index} className="bg-gray-100 p-3 rounded-md shadow-sm">
                  {comment}
                </li>
              ))
            ) : (
              <li className="text-gray-500">Nenhum comentário ainda. Seja o primeiro a comentar!</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Main;
