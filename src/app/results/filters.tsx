'use client'

import Slider from "rc-slider";
import React, { useState } from "react";

const Filters: React.FC = () => {
    const [showFilters, setFiltrosVisiveis] = useState(true);
    const [hidden] = useState({ flashcards: false });
    const [filterData, setFilterData] = useState({
        flashcards: {
          min: 0,
          max: 250,
        },
      });


    const toggleFiltros = () => {
        setFiltrosVisiveis(!showFilters);
    };


    const handleSliderChange = (newValues: number | number[]) => {
        if (Array.isArray(newValues)) {
          setFilterData((prevState) => ({
            ...prevState,
            flashcards: {
              min: newValues[0],
              max: newValues[1],
            },
          }))
        }
      }

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

    return (
        <div className="w-1/4">
            <button
                onClick={toggleFiltros}
                className="w-full bg-blue-500 text-black py-2 rounded-lg mb-6 border-2 shadow-lg shadow-slate-400 border-blue-thirth"
                >
                {showFilters ? "Esconder filtros" : "Abrir filtros"}
                </button>

                {showFilters && (
                    <div className="bg-white p-4 border-2 last:rounded-lg border-blue-thirth shadow-lg shadow-slate-400 max-h-656px space-y-6">
                        <div className='px-3'>
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

                        <div
                            className={`${hidden.flashcards ? 'max-h-0 opacity-0' : 'max-h-96 py-2 opacity-100'} overflow-hidden px-3 transition-all duration-300 ease-in-out`}
                            >
                            <h3 className="font-bold mb-2">Preço</h3>
                            <Slider
                                range
                                min={0}  // Define o valor mínimo do slider
                                max={250}  // Define o valor máximo do slider
                                step={1}                          // Passo do slider
                                value={[filterData.flashcards.min, filterData.flashcards.max]} // Valores atuais do slider
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
                                <span>R${filterData.flashcards.min}</span>   {/* Exibe o valor mínimo */}
                                <span>R${filterData.flashcards.max}</span>   {/* Exibe o valor máximo */}
                            </div>
                        </div>

                            <div className='px-3'>
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

                            <div className='px-3'>
                                <h3 className="font-bold mb-2">Horário de funcionamento</h3>
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" /> Aberto agora
                                </label>
                            </div>
                            <div>
                            <button
                                className="w-full bg-blue-500 text-black py-2 rounded-lg mb-6 border-2 shadow-lg shadow-slate-400 border-blue-thirth"
                            >
                                Aplicar filtros
                            </button>
                            </div>
                        </div>
                    )}
                </div>
        )
}

export default Filters