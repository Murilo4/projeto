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

    // const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()
    //     if (searchTerm) {
            
    // }
    return (
        <div className="ml-10 min-h-screen mt-32">
            {/* Container Flexível para os Botões */}
            <div className="flex justify-center items-center mb-10">
                <div className="flex rounded-lg border-4 border-light-blue max-w-920px w-full h-10">
                    <button className='px-10 text-xl'>O que fazer</button> 
                    <button className='pr-10 text-xl'>Os mais visitados</button> 
                    <button className='text-xl'>Buscar por cidade</button>
                </div>
            </div>
    
            {/* {loading ? (
                <p>Carregando...</p>
            ) : ( */}
                {/* <div>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <div key={item.id} className="border p-4 mb-4">
                                <h2 className="text-xl">{item.title}</h2>
                                <p>{item.description}</p>
                            </div>
                        ))
                    )} */}
                    {/* // ) : (
                    //     <p className='flex justify-center'>Nenhum dado encontrado para "{searchTerm}".</p>
                    // )} */}
    
            {/* Botão Expandir Filtros */}
            <div className=''>
                <div className='flex border-4 border-light-blue max-w-80 max-h-10 rounded-lg items-center'>
                    <button
                        // onClick={handleClick} 
                        className='text-black text-2xl font-serif'>Expandir filtros</button>
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;