'use client'

import React, { useState } from 'react'
import 'rc-slider/assets/index.css'


const ResultsPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mapLink, setMapLink] = useState("");


    const openModalWithMap = (link: string) => {
        setMapLink(link);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setMapLink("");
    };

    // const searchParams = useSearchParams();
    // const searchTerm = searchParams.get('search'); // Obtém o termo de pesquisa da query string
    // const [data, setData] = useState<Item[]>([]);
    // const [loading, setLoading] = useState<boolean>(false);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (searchTerm) {
    //             setLoading(true);
    //             try {
    //                 const response = await fetch(`https://api.exemplo.com/dados?search=${searchTerm}`);
    //                 const result: Item[] = await response.json();
    //                 setData(result);
    //             } catch (error) {
    //                 console.error("Erro ao buscar dados:", error);
    //             } finally {
    //                 setLoading(false);
    //             }
    //         }
    //     };

    //     fetchData();
    // }, [searchTerm]);


    const handleButtonClick = (link: string) => {
        window.location.href = `http://localhost:3000${link}`;
    };

    const restaurantes = [
        {
          nome: "Restaurante Cio da Terra Grill",
          estrelas: 4,
          descricao: "Ótimo lugar para se ir com a família",
          categorias: ["Bebidas", "Lanches", "Almoço"],
          horario: "Fecha às 01:00",
          imagem: "/logo1.png",
          link: "/main-page",
          map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.370010117328!2d-47.405617822809546!3d-20.532036380996004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0a636e590b8e7%3A0x5675049e2c9bf771!2sR.%20Mal.%20Caxias%2C%202384%20-%20Centro%2C%20Franca%20-%20SP%2C%2014400-600!5e0!3m2!1spt-BR!2sbr!4v1733168085804!5m2!1spt-BR!2sbr"
        },
        {
          nome: "JOR-G BURG'S",
          estrelas: 5,
          descricao: "Ambiente descontraído com música ao vivo",
          categorias: ["Bares", "Petiscos"],
          horario: "Fecha às 02:00",
          imagem: "/logo2.png",
          link: "/JorGBurgS",
          map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.370010117328!2d-47.405617822809546!3d-20.532036380996004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0a7c02dbdcc93%3A0xa07c38e17b3f836b!2sR.%20El%C3%ADas%20Nassif%20Sobrinho%2C%20830%20-%20S%C3%A3o%20Joaquim%2C%20Franca%20-%20SP%2C%2014406-346!5e0!3m2!1spt-BR!2sbr!4v1733168218207!5m2!1spt-BR!2sbr"
        },
        {
            nome: "Restaurante Cio da Terra Grill",
            estrelas: 4,
            descricao: "Ótimo lugar para se ir com a família",
            categorias: ["Bebidas", "Lanches", "Almoço"],
            horario: "Fecha às 01:00",
            imagem: "/logo1.png",
            link: "/CioDaTerra",
            map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.370010117328!2d-47.405617822809546!3d-20.532036380996004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0a636e590b8e7%3A0x5675049e2c9bf771!2sR.%20Mal.%20Caxias%2C%202384%20-%20Centro%2C%20Franca%20-%20SP%2C%2014400-600!5e0!3m2!1spt-BR!2sbr!4v1733168085804!5m2!1spt-BR!2sbr"
          },
          {
            nome: "JOR-G BURG'S",
            estrelas: 5,
            descricao: "Ambiente descontraído com música ao vivo",
            categorias: ["Bares", "Petiscos"],
            horario: "Fecha às 02:00",
            imagem: "/logo2.png",
            link: "/JorGBurgS",
            map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.370010117328!2d-47.405617822809546!3d-20.532036380996004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0a7c02dbdcc93%3A0xa07c38e17b3f836b!2sR.%20El%C3%ADas%20Nassif%20Sobrinho%2C%20830%20-%20S%C3%A3o%20Joaquim%2C%20Franca%20-%20SP%2C%2014406-346!5e0!3m2!1spt-BR!2sbr!4v1733168218207!5m2!1spt-BR!2sbr"
          },
          {
            nome: "Restaurante Cio da Terra Grill",
            estrelas: 4,
            descricao: "Ótimo lugar para se ir com a família",
            categorias: ["Bebidas", "Lanches", "Almoço"],
            horario: "Fecha às 01:00",
            imagem: "/logo1.png",
            link: "/CioDaTerra",
            map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.370010117328!2d-47.405617822809546!3d-20.532036380996004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0a636e590b8e7%3A0x5675049e2c9bf771!2sR.%20Mal.%20Caxias%2C%202384%20-%20Centro%2C%20Franca%20-%20SP%2C%2014400-600!5e0!3m2!1spt-BR!2sbr!4v1733168085804!5m2!1spt-BR!2sbr"
          },
          {
            nome: "JOR-G BURG'S",
            estrelas: 5,
            descricao: "Ambiente descontraído com música ao vivo",
            categorias: ["Bares", "Petiscos"],
            horario: "Fecha às 02:00",
            imagem: "/logo2.png",
            link: "/JorGBurgS",
            map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.370010117328!2d-47.405617822809546!3d-20.532036380996004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0a7c02dbdcc93%3A0xa07c38e17b3f836b!2sR.%20El%C3%ADas%20Nassif%20Sobrinho%2C%20830%20-%20S%C3%A3o%20Joaquim%2C%20Franca%20-%20SP%2C%2014406-346!5e0!3m2!1spt-BR!2sbr!4v1733168218207!5m2!1spt-BR!2sbr"
          },
          {
            nome: "Restaurante Cio da Terra Grill",
            estrelas: 4,
            descricao: "Ótimo lugar para se ir com a família",
            categorias: ["Bebidas", "Lanches", "Almoço"],
            horario: "Fecha às 01:00",
            imagem: "/logo1.png",
            link: "/CioDaTerra",
            map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.370010117328!2d-47.405617822809546!3d-20.532036380996004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0a636e590b8e7%3A0x5675049e2c9bf771!2sR.%20Mal.%20Caxias%2C%202384%20-%20Centro%2C%20Franca%20-%20SP%2C%2014400-600!5e0!3m2!1spt-BR!2sbr!4v1733168085804!5m2!1spt-BR!2sbr"
          },
          {
            nome: "JOR-G BURG'S",
            estrelas: 5,
            descricao: "Ambiente descontraído com música ao vivo",
            categorias: ["Bares", "Petiscos"],
            horario: "Fecha às 02:00",
            imagem: "/logo2.png",
            link: "/JorGBurgS",
            map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.370010117328!2d-47.405617822809546!3d-20.532036380996004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0a7c02dbdcc93%3A0xa07c38e17b3f836b!2sR.%20El%C3%ADas%20Nassif%20Sobrinho%2C%20830%20-%20S%C3%A3o%20Joaquim%2C%20Franca%20-%20SP%2C%2014406-346!5e0!3m2!1spt-BR!2sbr!4v1733168218207!5m2!1spt-BR!2sbr"
          },
          {
            nome: "Restaurante Cio da Terra Grill",
            estrelas: 4,
            descricao: "Ótimo lugar para se ir com a família",
            categorias: ["Bebidas", "Lanches", "Almoço"],
            horario: "Fecha às 01:00",
            imagem: "/logo1.png",
            link: "/CioDaTerra",
            map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.370010117328!2d-47.405617822809546!3d-20.532036380996004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0a636e590b8e7%3A0x5675049e2c9bf771!2sR.%20Mal.%20Caxias%2C%202384%20-%20Centro%2C%20Franca%20-%20SP%2C%2014400-600!5e0!3m2!1spt-BR!2sbr!4v1733168085804!5m2!1spt-BR!2sbr"
          },
          {
            nome: "JOR-G BURG'S",
            estrelas: 5,
            descricao: "Ambiente descontraído com música ao vivo",
            categorias: ["Bares", "Petiscos"],
            horario: "Fecha às 02:00",
            imagem: "/logo2.png",
            link: "/JorGBurgS",
            map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.370010117328!2d-47.405617822809546!3d-20.532036380996004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0a7c02dbdcc93%3A0xa07c38e17b3f836b!2sR.%20El%C3%ADas%20Nassif%20Sobrinho%2C%20830%20-%20S%C3%A3o%20Joaquim%2C%20Franca%20-%20SP%2C%2014406-346!5e0!3m2!1spt-BR!2sbr!4v1733168218207!5m2!1spt-BR!2sbr"
          },
          {
            nome: "Restaurante Cio da Terra Grill",
            estrelas: 4,
            descricao: "Ótimo lugar para se ir com a família",
            categorias: ["Bebidas", "Lanches", "Almoço"],
            horario: "Fecha às 01:00",
            imagem: "/logo1.png",
            link: "/CioDaTerra",
            map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.370010117328!2d-47.405617822809546!3d-20.532036380996004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0a636e590b8e7%3A0x5675049e2c9bf771!2sR.%20Mal.%20Caxias%2C%202384%20-%20Centro%2C%20Franca%20-%20SP%2C%2014400-600!5e0!3m2!1spt-BR!2sbr!4v1733168085804!5m2!1spt-BR!2sbr"
          },
          {
            nome: "JOR-G BURG'S",
            estrelas: 5,
            descricao: "Ambiente descontraído com música ao vivo",
            categorias: ["Bares", "Petiscos"],
            horario: "Fecha às 02:00",
            imagem: "/logo2.png",
            link: "/JorGBurgS",
            map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.370010117328!2d-47.405617822809546!3d-20.532036380996004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0a7c02dbdcc93%3A0xa07c38e17b3f836b!2sR.%20El%C3%ADas%20Nassif%20Sobrinho%2C%20830%20-%20S%C3%A3o%20Joaquim%2C%20Franca%20-%20SP%2C%2014406-346!5e0!3m2!1spt-BR!2sbr!4v1733168218207!5m2!1spt-BR!2sbr"
          },
          {
            nome: "Restaurante Cio da Terra Grill",
            estrelas: 4,
            descricao: "Ótimo lugar para se ir com a família",
            categorias: ["Bebidas", "Lanches", "Almoço"],
            horario: "Fecha às 01:00",
            imagem: "/logo1.png",
            link: "/CioDaTerra",
            map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.370010117328!2d-47.405617822809546!3d-20.532036380996004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0a636e590b8e7%3A0x5675049e2c9bf771!2sR.%20Mal.%20Caxias%2C%202384%20-%20Centro%2C%20Franca%20-%20SP%2C%2014400-600!5e0!3m2!1spt-BR!2sbr!4v1733168085804!5m2!1spt-BR!2sbr"
          },
          {
            nome: "JOR-G BURG'S",
            estrelas: 5,
            descricao: "Ambiente descontraído com música ao vivo",
            categorias: ["Bares", "Petiscos"],
            horario: "Fecha às 02:00",
            imagem: "/logo2.png",
            link: "/JorGBurgS",
            map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.370010117328!2d-47.405617822809546!3d-20.532036380996004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0a7c02dbdcc93%3A0xa07c38e17b3f836b!2sR.%20El%C3%ADas%20Nassif%20Sobrinho%2C%20830%20-%20S%C3%A3o%20Joaquim%2C%20Franca%20-%20SP%2C%2014406-346!5e0!3m2!1spt-BR!2sbr!4v1733168218207!5m2!1spt-BR!2sbr"
          },

        // Outros restaurantes...
      ];

    return (
        <div
            style={{
                boxShadow: "0px -4px 6px rgba(0, 0, 0, 0.1), 0px 4px 0px rgba(238, 238, 238, 1)",
            }}
            className="flex-1 p-6 bg-background-blue rounded-t-lg shadow-md shadow-slate-400 min-h-screen flex flex-col"
            >
            <h2 className="text-2xl font-bold mb-5">Restaurantes em Franca - SP</h2>
                <div className="inline-flex gap-2 mb-5">
                    <h2 className="flex items-center gap-2 bg-gray-100 text-lg font-medium px-4 py-2 rounded-full shadow">
                        <span className="text-green-button">✔</span> São Paulo
                    </h2>
                    <h2 className="flex items-center gap-2 bg-gray-100 text-lg font-medium px-4 py-2 rounded-full shadow">
                        <span className="text-green-button">✔</span> Franca
                    </h2>
                    <h2 className="flex items-center gap-2 bg-gray-100 text-lg font-medium px-4 py-2 rounded-full shadow">
                        <span className="text-green-button">✔</span> Restaurantes
                    </h2>
                </div>
                        {/* Cards de Restaurantes */}
                <div className="space-y-6 ">
                    {restaurantes.map((restaurante, index) => (
                    <div
                        key={index}
                        className="border-2 border-white bg-white rounded-lg flex shadow-lg shadow-slate-400"
                    >
                        {/* Imagem do Restaurante */}
                        <img
                            src={restaurante.imagem}
                            alt={`Restaurante ${index + 1}`}
                            className="w-44 h-44 rounded-l-md object-fill mr-4"
                        />
                        {/* Informações do Restaurante */}
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mt-1">{restaurante.nome}</h3>
                            <div className="flex items-center mb-2">
                                <span className="text-yellow text-xl">
                                    {"★".repeat(restaurante.estrelas)}{"☆".repeat(5 - restaurante.estrelas)}
                                </span>
                                <span className="ml-2 text-base">{restaurante.estrelas} Estrelas</span>
                            </div>
                                <p className="text-base mb-2">{restaurante.descricao}</p>
                                <p className="text-base mb-2">
                                    {restaurante.categorias.join(", ")}
                                </p>
                                <p className="text-base font-semibold text-green-button">{restaurante.horario}</p>
                        </div>
                            {/* Botão Ver no Mapa */}
                            <button className="bg-blue-500 text-black max-w-48 max-h-32 rounded-lg self-center relative"
                            onClick={() => openModalWithMap(restaurante.map)}>
                                <img className="w-full h-full object-cover rounded-lg" src='/maps.jpg' alt="Mapa" />
                                <div className="absolute inset-0 flex justify-center items-center">
                                    <span className="text-slate-700 rounded-md px-1 text-xl font-bold bg-white">Ver no Mapa</span>
                                </div>
                            </button>
                            <button 
                                className="bg-blue-500 text-black py-2 px-6 rounded-lg h-10 self-center"
                                onClick={() => handleButtonClick(restaurante.link)}><img src='/saida.png' className='max-w-8 max-h-8' alt='link'></img>
                            </button>
                            </div>
                    ))}
                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg relative w-1/2 h-3/4">
                            <button
                                className="absolute top-2 right-2 text-xl font-bold"
                                onClick={closeModal}
                            >
                            X
                            </button>
                            <iframe
                                src={mapLink}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default ResultsPage;