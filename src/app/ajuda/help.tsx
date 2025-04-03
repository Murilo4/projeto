'use client';

import React, { useState, useCallback, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Ícones para expandir/contrair

interface Doubs {
  id: number;
  doub: string;
  doub_answer: string; // Corrigido para corresponder ao nome da API
  photo: string | null; // Pode ser null se não houver foto
}

const Help = () => {
  const [doubs, setDoubs] = useState<Doubs[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [openQuestions, setOpenQuestions] = useState<number[]>([]); // Array para rastrear as perguntas abertas
  const router = useRouter();

  const fetchQuestions = useCallback(async () => {
    setLoader(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/get-doubs/`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.success) {
        setDoubs(data.doubs); // Corrigido para acessar "doubs"
      } else {
        toast.error('Erro ao buscar perguntas');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do local:', error);
      toast.error('Erro ao buscar dados. Tente novamente.');
    } finally {
      setLoader(false); // Garantir que o loader seja desativado no final
    }
  }, []);

  const toggleQuestion = (id: number) => {
    setOpenQuestions(prev => 
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const HandleRedirect = () => {
    router.push('/');
  };

  return ( 
    <>
      <ToastContainer />
      <div className="max-h-screen mt-20">
      <div className="flex ml-350px">
        <button
          onClick={HandleRedirect}
          className="flex text-lg max-h-10 border-blue-thirth rounded-2xl py-2 px-4 bg-blue-thirth text-white font-medium justify-start h-auto"
        >Voltar</button>
      </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl mb-4">Dúvidas frequentes</h2>
          
          <div className="w-11/12 sm:w-1/2 sm:ml-40">
            {loader ? (
              <p>Carregando perguntas...</p>
            ) : doubs.length === 0 ? (
              <p className="text-center">Nenhuma dúvida encontrada.</p>
            ) : (
              doubs.map((doubData) => (
                <div key={doubData.id} className="border border-blue p-4 rounded-md shadow-md shadow-blue-mid flex items-center w-full sm:w-4/5 mb-4">
                  {doubData.photo && (
                    <img src={`http://localhost:8000${doubData.photo}`} alt="Foto do Local" className="h-10 sm:h-20 rounded-md mr-4" />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl mb-2 font-semibold">{doubData.doub}</h3>
                    <button
                      className="flex items-center text-blue-500"
                      onClick={() => toggleQuestion(doubData.id)}
                    >
                      {openQuestions.includes(doubData.id) ? <FaChevronUp /> : <FaChevronDown />}
                      <span className="ml-2">{openQuestions.includes(doubData.id)}</span>
                    </button>
                    {openQuestions.includes(doubData.id) && (
                      <p className="mt-2 text-gray-700">{doubData.doub_answer}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;