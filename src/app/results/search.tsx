'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

interface Item {
    id: number
    title: string
    description: string
}

const ResultsPage: React.FC = () => {
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get('search'); // Obtém o termo de pesquisa da query string
    const [data, setData] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm) {
                setLoading(true);
                try {
                    const response = await fetch(`https://api.exemplo.com/dados?search=${searchTerm}`);
                    const result: Item[] = await response.json();
                    setData(result);
                } catch (error) {
                    console.error("Erro ao buscar dados:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [searchTerm]);

    return (
        <div className="min-h-screen bg-white-background mt-32">
            {/* Barra de Navegação Superior */}
            <div className="flex justify-center mb-8 ml-28 ">
                <div className="flex border-2 border-light-blue rounded-lg overflow-hidden">
                    <button className="px-8 py-2 text-xl hover:bg-blue-200 transition">O que fazer</button>
                    <button className="px-8 py-2 text-xl hover:bg-blue-200 transition">Os mais visitados</button>
                    <button className="px-8 py-2 text-xl hover:bg-blue-200 transition">Buscar por cidade</button>
                </div>
            </div>

            {/* Conteúdo Centralizado */}
            <div className="flex justify-center ">
                <div className="flex gap-8 max-w-6xl w-full border-blue-thirth ">
                    {/* Filtros na Lateral Esquerda */}
                    <div className="w-1/4 bg-white p-4 border-2  rounded-lg border-blue-thirth shadow-lg shadow-slate-400 max-h-656px">
                        <button className="w-full bg-blue-500 text-black py-2 rounded-lg mb-6 border-2 shadow-lg shadow-slate-400 border-blue-thirth">
                            Esconder filtros
                        </button>

                        {/* Opções de Filtros */}
                        <div className="space-y-6 border-blue-thirth ">
                            <div>
                                <h3 className="font-bold mb-2">Tipo</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" /> Restaurantes
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" /> Bares
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" /> FastFood
                                    </label>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold mb-2">Preço</h3>
                                <input type="range" className="w-full" min="0" max="250" />
                                <div className="flex justify-between text-sm mt-1">
                                    <span>R$0,00</span>
                                    <span>R$250,00</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold mb-2">Estrelas</h3>
                                <div className="space-y-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <label key={star} className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            <span>{star} estrelas</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold mb-2">Horário de funcionamento</h3>
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" /> Aberto agora
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Lista de Restaurantes */}
                    <div className="flex-1 p-6 bg-background-blue rounded-lg shadow-very-clean shadow-slate-400 min-h-screen flex flex-col">
                        <h2 className="text-2xl font-bold mb-6">Restaurantes em Salvador</h2>

                        {/* Cards de Restaurantes */}
                        <div className="space-y-6">
                            {[1, 2, 3].map((_, index) => (
                                <div
                                    key={index}
                                    className="border-2 border-light-blue bg-white rounded-lg  flex"
                                >
                                    {/* Imagem do Restaurante */}
                                    <img
                                        src="https://via.placeholder.com/120"
                                        alt={`Restaurante ${index + 1}`}
                                        className="w-44 h-44 rounded-md object-cover mr-4"
                                    />
                                    {/* Informações do Restaurante */}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold mt-1">Espetto Carioca</h3>
                                        <div className="flex items-center mb-2">
                                            <span className="text-yellow">★★★★☆</span>
                                            <span className="ml-2 text-sm">4 Estrelas</span>
                                        </div>
                                        <p className="text-sm mb-2">
                                            "Ótimo lugar para se ir com a família"
                                        </p>
                                        <p className="text-sm mb-2">Bebidas, Lanches, Almoço</p>
                                        <p className="text-sm text-green">Fecha às 01:00</p>
                                    </div>
                                    {/* Botão Ver no Mapa */}
                                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg h-10 self-center">
                                        Ver no mapa
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;