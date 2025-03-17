'use client';

import React, { useState } from "react";
import Slider from '@/components/Slider'; // Componente Slider fornecido
import { SwiperSlide } from 'swiper/react';
import { SwiperProps } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

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

const Main = () => {
  const [comments, setComments] = useState<string[]>(data.comments || []);
  const [newComment, setNewComment] = useState<string>("");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isFavorited, setIsFavorited] = useState<boolean>(false); // Estado para favoritar o local

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment.trim()]);
      setNewComment("");
    } else {
      alert("Por favor, escreva um comentário antes de enviar.");
    }
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
    spaceBetween: 10,
    slidesPerView: 1,
  };

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited); // Altera o estado de favorito
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl ml-2 mb-2 font-bold">{data.nome}</h1>
        <button
          onClick={handleToggleFavorite}
          className={`text-4xl ${isFavorited ? 'text-yellow-500' : 'text-gray-500'}`}
        >
          {isFavorited ? "★" : "★"} {/* Ícone de favorito */}
        </button>
      </div>
      <div className="mt-2 text-xl mb-4">
        <span className="text-yellow text-3xl">
          {"★".repeat(Math.floor(data.estrelas))}{"☆".repeat(5 - Math.floor(data.estrelas))}
        </span>
        <span className="ml-2 text-xl ">{data.qtda_reviews} Avaliações</span>
      </div>
      <p className="mt-2 text-xl text-black">&#x1F4CD; {data.address}</p>
      <Slider settings={sliderSettings}>
        {data.imagens.map((image, i) => (
          <SwiperSlide key={i} className="w-full h-96 object-cover rounded-md relative">
            <img
              src={image}
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
              {data.imagens.map((image, i) => (
                <SwiperSlide key={i} className="flex justify-center items-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={image}
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
        <p className="text-lg text-gray-800 mb-4">{data.sobre}</p>

        <hr className="my-4" />

        <p className="text-lg">
          <strong>Descrição:</strong> {data.descrição}
        </p>

        <hr className="my-4" />

        <p className="text-lg">
          <strong>Horário de funcionamento:</strong> {data.horario}
        </p>

        <hr className="my-4" />

        <p className="text-lg">
          <strong>Categorias:</strong> {data.categorias.join(", ")}
        </p>

        <hr className="my-4" />

        <ul className="mt-4 space-y-2">
          <li>
            <strong>Idiomas falados:</strong> Português, Inglês
          </li>
        </ul>
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
  );
};

export default Main;