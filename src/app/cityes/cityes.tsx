'use client';

import React, { useState, useEffect } from 'react';
import 'rc-slider/assets/index.css';

interface Restaurante {
    nome: string;
    estrelas: number;
    descricao: string;
    categorias: string[];
    horario: string;
    imagem: string;
    link: string;
    map: string;
  }
  
const data: { [key: string]: { nome: string; estrelas: number; descricao: string; categorias: string[]; horario: string; imagem: string; link: string; map: string; }[] } = {
  Franca: [
    {
      nome: 'Restaurante Cio da Terra Grill',
      estrelas: 4,
      descricao: 'Ótimo lugar para se ir com a família',
      categorias: ['Bebidas', 'Lanches', 'Almoço'],
      horario: 'Fecha às 01:00',
      imagem: '/logo1.png',
      link: '/main-page',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3...',
    },
    {
      nome: 'JOR-G BURG\'S',
      estrelas: 5,
      descricao: 'Ambiente descontraído com música ao vivo',
      categorias: ['Bares', 'Petiscos'],
      horario: 'Fecha às 02:00',
      imagem: '/logo2.png',
      link: '/JorGBurgS',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3...',
    },
    {
        nome: 'Restaurante Cio da Terra Grill',
        estrelas: 4,
        descricao: 'Ótimo lugar para se ir com a família',
        categorias: ['Bebidas', 'Lanches', 'Almoço'],
        horario: 'Fecha às 01:00',
        imagem: '/logo1.png',
        link: '/main-page',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3...',
      },
      {
        nome: 'JOR-G BURG\'S',
        estrelas: 5,
        descricao: 'Ambiente descontraído com música ao vivo',
        categorias: ['Bares', 'Petiscos'],
        horario: 'Fecha às 02:00',
        imagem: '/logo2.png',
        link: '/JorGBurgS',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3...',
      },
      {
        nome: 'Restaurante Cio da Terra Grill',
        estrelas: 4,
        descricao: 'Ótimo lugar para se ir com a família',
        categorias: ['Bebidas', 'Lanches', 'Almoço'],
        horario: 'Fecha às 01:00',
        imagem: '/logo1.png',
        link: '/main-page',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3...',
      },
      {
        nome: 'JOR-G BURG\'S',
        estrelas: 5,
        descricao: 'Ambiente descontraído com música ao vivo',
        categorias: ['Bares', 'Petiscos'],
        horario: 'Fecha às 02:00',
        imagem: '/logo2.png',
        link: '/JorGBurgS',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3...',
      },
      {
        nome: 'Restaurante Cio da Terra Grill',
        estrelas: 4,
        descricao: 'Ótimo lugar para se ir com a família',
        categorias: ['Bebidas', 'Lanches', 'Almoço'],
        horario: 'Fecha às 01:00',
        imagem: '/logo1.png',
        link: '/main-page',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3...',
      },
      {
        nome: 'JOR-G BURG\'S',
        estrelas: 5,
        descricao: 'Ambiente descontraído com música ao vivo',
        categorias: ['Bares', 'Petiscos'],
        horario: 'Fecha às 02:00',
        imagem: '/logo2.png',
        link: '/JorGBurgS',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3...',
      },
    // Adicione mais restaurantes conforme necessário
  ],
  Rifaina: [
    {
      nome: 'Bar e Restaurante Rio Azul',
      estrelas: 3,
      descricao: 'Excelente para reuniões descontraídas',
      categorias: ['Petiscos', 'Cervejas Artesanais'],
      horario: 'Fecha às 23:00',
      imagem: '/logo4.png',
      link: '/RioAzul',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3...',
    },
  ],
};

const ResultsCitys = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapLink, setMapLink] = useState('');
  const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar a expansão
  const [cityData, setCityData] = useState<Restaurante[]>([]);

  // Utilizando useEffect para acessar o window apenas no lado do cliente
  useEffect(() => {
    // Obtém o parâmetro search da URL apenas no cliente
    const params = new URLSearchParams(window.location.search);
    const city = params.get('search');
    if (city && data[city]) {
      setCityData(data[city]);
    }
  }, []);

  const openModalWithMap = (link: string) => {
    setMapLink(link);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMapLink('');
  };

  const handleButtonClick = (link: string) => {
    window.location.href = link;
  };

  // Função para alternar o estado de expansão
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="container mx-auto p-4 mt-24">
      {/* Cabeçalho com a palavra "Restaurantes" e a seta */}
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <span className="mr-2">Restaurantes</span>
        <button onClick={toggleExpansion} className="flex items-center">
          <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
            &#x2193; {/* Símbolo da seta para baixo */}
          </span>
        </button>
      </h1>
      
      {/* Mostrar a lista de restaurantes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cityData.length > 0 ? (
          // Mostrar a quantidade de itens com base no estado 'isExpanded'
          cityData.slice(0, isExpanded ? cityData.length : 3).map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
            >
              <img
                src={item.imagem}
                alt={item.nome}
                className="w-full h-48 object-fill rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{item.nome}</h2>
              <p className="text-sm text-gray-500 mb-2">{item.descricao}</p>
              <p className="text-sm text-gray-600">
                Categorias:{' '}
                {item.categorias.map((categoria: string, i: number) => (
                  <span
                    key={i}
                    className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold mr-2"
                  >
                    {categoria}
                  </span>
                ))}
              </p>
              <p className="text-sm font-medium mb-2">Horário: {item.horario}</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => handleButtonClick(item.link)}
                >
                  Visitar Página
                </button>
                <button
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => openModalWithMap(item.map)}
                >
                  Ver no Mapa
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhum resultado encontrado para esta cidade.</p>
        )}
      </div>

      {/* Modal para exibir o mapa */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-4/5 md:w-2/3 lg:w-1/2">
            <h2 className="text-xl font-bold mb-4">Localização</h2>
            <iframe
              src={mapLink}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
            <div className="text-right mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={closeModal}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsCitys;