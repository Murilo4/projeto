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
import { CircularProgress } from '@mui/material'; // Biblioteca de spinner do Material-UI


interface Place {
  id: number
  slug: string
  placeName: string
  about: string
  description: string
  enterprise: number
  rating: number | null
  mediumRate: number | null
  type: string
  workStart: string
  workStop: string
  photos: string[]
}

interface PlaceList {
  categories: string[]
  comments: PlaceComment[]
}

interface PlaceComment {
  username: string
  comment: string
  date: string
  photo: File | null
  rating: number
  userHasComment?: boolean
}

interface PlaceAddress {
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  cep: string
}


const Main = () => {
  // State hooks
  const [comments, setComments] = useState<PlaceComment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [placeBase, setPlaceBase] = useState<Place | null>(null);
  const [placeList, setPlaceList] = useState<PlaceList | null>(null);
  const [placeAddress, setPlaceAddress] = useState<PlaceAddress | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [haveRating, setHaveRating] = useState<boolean>(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentText, setEditingCommentText] = useState<string>("");

  // Memoized hooks
  const cookies = useMemo(() => new Cookies(), []);

  // Router hooks
  const { id } = useParams();
  const router = useRouter();

  // Callback hooks
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
        if (data.favorite === true) {
          setIsFavorited(true);
        }
      } else if (response.status === 401) {
        toast.error('Faça login para adicionar aos favoritos.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      toast.error('Erro ao adicionar local aos favoritos. Tente novamente mais tarde.');
    }
  }, [cookies, id]);

  const handleRating = useCallback(async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    const token = cookies.get('access');
    try {
      const response = await fetch(`${apiUrl}/get-rating/${id}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok && data.success) {
        console.log(data.rating.rating)
        setHaveRating(true)
        setRating(data.rating.rating)
      }
    }
    catch (error) {
      console.error('Erro na requisição:', error);
      toast.error('Erro ao adicionar local aos favoritos. Tente novamente mais tarde.');
    }
  }, [cookies, id]);

  const fetchPlaces = useCallback(async () => {
    setLoader(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/get-place-base/${id}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${cookies.get('access')}`,
        },
      })
      const data = await response.json()
      if (response.ok && data.success) {
        setPlaceBase(data.place)
        setRating(data.place.rating_number || 0); // Define a avaliação inicial
      } else {
        toast.error('Erro ao carregar locais')
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
      toast.error('Erro ao carregar locais. Tente novamente mais tarde.')
    }
    setLoader(false)
  }, [cookies, id]);

  const fetchPlaceLists = useCallback(async () => {
    setLoader(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/get-place-lists/${id}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${cookies.get('access')}`,
        },
      })
      const data = await response.json()
      if (response.ok && data.success) {
        setPlaceList(data.place)
        setComments(data.place.comments)
      } else {
        toast.error('Erro ao carregar locais')
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
      toast.error('Erro ao carregar locais. Tente novamente mais tarde.')
    }
    setLoader(false)
  }, [cookies, id]);

  const fetchPlaceAddress = useCallback(async () => {
    setLoader(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/get-place-address/${id}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${cookies.get('access')}`,
        },
      })
      const data = await response.json()
      if (response.ok && data.success) {
        setPlaceAddress(data.place)
      } else {
        toast.error('Erro ao carregar locais')
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
      toast.error('Erro ao carregar locais. Tente novamente mais tarde.')
    }
    setLoader(false)
  }, [cookies, id]);

  const handleAddComment = useCallback(async (newComment: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    const token = cookies.get('access');
    if (!token) {
      toast.error('Você precisa estar logado para adicionar um comentário.');
      return;
    }
    try {
      const requestData = { comment: newComment };
      const response = await fetch(`${apiUrl}/send-comment/${id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast.success('Comentário adicionado com sucesso!');
        setNewComment(""); // Clear the text box
        fetchPlaceLists(); // Refresh comments
      } else {
        toast.error('Erro ao adicionar o comentário.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      toast.error('Erro ao adicionar o comentário. Tente novamente mais tarde.');
    }
  }, [cookies, id, fetchPlaceLists]);

  // Effect hooks
  useEffect(() => {
    const fetchData = async () => {
      await fetchPlaces();
      await handleFavorite();
      await fetchPlaceLists();
      await fetchPlaceAddress();
      handleRating();
      setIsLoading(false);
    };

    fetchData();
  }, [fetchPlaces, handleFavorite, fetchPlaceLists, fetchPlaceAddress, handleRating]);

  const handleDeleteComment = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    const token = cookies.get('access');
    try {
      const response = await fetch(`${apiUrl}/delete-comment/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success('Comentário excluído com sucesso!');
        setComments((prevComments) => prevComments.filter((comment) => !comment.userHasComment));
      } else {
        toast.error('Erro ao excluir o comentário.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      toast.error('Erro ao excluir o comentário. Tente novamente mais tarde.');
    }
  };

  const handleUpdateComment = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    const token = cookies.get('access');
    try {
      const response = await fetch(`${apiUrl}/update-comment/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ commentId: editingCommentId, comment: editingCommentText }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast.success('Comentário atualizado com sucesso!');
        setEditingCommentId(null);
        setEditingCommentText("");
        fetchPlaceLists(); // Re-fetch comments after update
      } else {
        toast.error('Erro ao atualizar o comentário.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      toast.error('Erro ao atualizar o comentário. Tente novamente mais tarde.');
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingCommentText("");
  };

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
    spaceBetween: 5,
    slidesPerView: 1,
  };

  const handleToggleFavorite = async () => {
    const token = cookies.get('access');
    if (!token) {
      toast.error('Faça login para adicionar aos favoritos.');
      router.push('/login'); // Redirect to login page
      return;
    }

    setIsFavorited(!isFavorited);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
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

  const renderStars = (rate: number) => {
    const totalStars = 5;
    const filledStars = Math.floor(rate);
    const halfStar = rate % 1 !== 0;
    const emptyStars = totalStars - filledStars - (halfStar ? 1 : 0);

    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow" />);
    }
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-border" />);
    }

    return stars;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPlaces();
      await handleFavorite();
      await fetchPlaceLists();
      await fetchPlaceAddress();
      handleRating(); // Fetch rating independently without awaiting
      setIsLoading(false); // Finaliza o loading após carregar todos os dados
    };

    fetchData();
  }, [fetchPlaces, handleFavorite, fetchPlaceLists, fetchPlaceAddress, handleRating]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress size={50} color="primary" />
      </div>
    );
  }

  if (loader && !placeBase) {
    return <div>Carregando...</div>; // Show loading only if placeBase is not loaded
  }

  if (!placeBase) {
    return <div>Nenhum local encontrado.</div>; // Show this message if no place data is available
  }

  return (
    <>
      <ToastContainer />
      <div className="p-4 max-w-4xl mx-auto mt-20">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl ml-2 mb-2 font-serif text-gray-900">{placeBase?.placeName}</h1>
          <button
            onClick={handleToggleFavorite}
            className={`text-lg ${isFavorited ? 'text-yellow' : 'text-gray-400'} hover:text-yellow transition duration-300`}
          >
            {cookies.get('access')
              ? (isFavorited ? "Remover dos favoritos ★" : "Adicionar aos favoritos ★")
              : "Faça login para adicionar aos favoritos"}
          </button>
        </div>
        <div className="mt-2 text-xl mb-4">
          <div className="flex space-x-1">
            {cookies.get('access')
              ? (haveRating ? renderStars(rating) : <p></p>)
              : renderStars(placeBase?.mediumRate || 0)} {/* Use mediumRate if not logged in */}
            <span className="ml-2 text-xl">
              {placeBase?.rating
                ? `${placeBase?.rating} ${placeBase?.rating === 1 ? 'Avaliação' : 'Avaliações'}`
                : "Ainda não avaliado"}
            </span>
          </div>
        </div>
        <Slider settings={sliderSettings}>
          {placeBase.photos.map((image, i) => (
            <SwiperSlide key={i} className="w-full h-96 object-cover rounded-md relative">
              <img
                src={`http://localhost:8000${image}`}
                alt={"imagem"}
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
                {placeBase.photos.map((image, i) => (
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
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-300 transition duration-300 focus:bg-gray-3">
          <div className="hover:scale-105 transition-transform duration-300">
            <p className="text-2xl text-black font-serif">Endereço</p>
            <p className="mt-2 text-xl text-black">&#x1F4CD; {placeAddress?.street}, {placeAddress?.number}, {placeAddress?.neighborhood}.</p>
            <p className="mt-2 mb-4 text-xl text-black">{placeAddress?.city}, {placeAddress?.state}. {placeAddress?.cep}</p>
          </div>
          <div className="hover:scale-105 transition-transform duration-300">
            <p className="text-2xl text-black font-serif">Sobre o local</p>
            <p className="text-lg text-black mb-4">{placeBase?.about}</p>
          </div>
          <hr className="my-4" />
          <div className="hover:scale-105 transition-transform duration-300">
            <p className="text-2xl text-black font-serif">Descrição</p>
            <p className="text-lg">{placeBase?.description}</p>
          </div>
          <hr className="my-4" />
          <div className="hover:scale-105 transition-transform duration-300">
            <p className="text-lg font-serif text-green-button">
              <strong>Horário de funcionamento:</strong> {placeBase?.workStart} até {placeBase?.workStop}
            </p>
          </div>
          <hr className="my-4" />
          <div className="hover:scale-105 transition-transform duration-300">
            <p className="text-2xl text-black font-serif">O que você pode encontrar no local:</p>
            {placeList?.categories.join(", ")}.
          </div>
          <hr className="my-4" />
        </div>

        {/* Adicionar Comentário */}
        {!comments.some((comment) => comment.userHasComment) && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Adicionar Comentário</h3>
            <textarea
              className="w-full border placeholder:text-black border-gray-500 rounded-md p-2 mt-2 h-24"
              placeholder="Escreva seu comentário aqui..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            {cookies.get('access') ? (
              <button
                className="mt-2 bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => handleAddComment(newComment)}
              >
                Enviar Comentário
              </button>
            ) : (
              <div className="mt-2 flex space-x-2">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-not-allowed"
                  disabled
                >
                  Logue para adicionar um comentário
                </button>
                <button
                  className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={() => router.push('/login')}
                >
                  Ir para Login
                </button>
              </div>
            )}
          </div>
        )}

        {/* Comentários */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Comentários</h2>
          <ul className="mt-4 space-y-3">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <li key={index} className="bg-gray-100 p-3 rounded-md shadow-sm flex items-start">
                  <img
                    src={`http://localhost:8000${comment?.photo}` || '/default-profile.png'} // Default profile picture if none is provided
                    alt="Foto do perfil"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-800 mr-4">{comment.username}</h4>
                      <span className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
                      <span className="flex ml-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i} className={`text-yellow ${i < comment.rating ? 'text-yellow' : 'text-yellow-border'}`}>
                            {i < comment.rating ? <FaStar /> : <FaRegStar />}
                          </span>
                        ))}
                      </span>
                    </div>
                    {editingCommentId === index ? (
                      <div className="mt-2">
                        <textarea
                          className="w-full border rounded-md p-2 h-24"
                          value={editingCommentText}
                          onChange={(e) => setEditingCommentText(e.target.value)}
                        />
                        <div className="flex space-x-2 mt-2">
                          <button
                            className="bg-green text-white px-3 py-1 rounded-md hover:bg-green-600"
                            onClick={handleUpdateComment}
                          >
                            Atualizar
                          </button>
                          <button
                            className="bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                            onClick={handleCancelEdit}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-900 mt-1">{comment.comment}</p>
                        {comment.userHasComment && (
                          <div className="flex space-x-2 mt-2">
                            <button
                              className="bg-blue text-white px-3 py-1 rounded-md hover:bg-blue-600"
                              onClick={() => {
                                setEditingCommentId(index);
                                setEditingCommentText(comment.comment);
                              }}
                            >
                              Editar
                            </button>
                            <button
                              className="bg-red text-white px-3 py-1 rounded-md hover:bg-red-600"
                              onClick={handleDeleteComment}
                            >
                              Excluir
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-700">Nenhum comentário ainda. Seja o primeiro a comentar!</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Main;
