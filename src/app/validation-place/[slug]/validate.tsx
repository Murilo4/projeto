'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie'

interface Place {
    placeName: string;
    description: string;
    about: string;
    categories: string[];
    workStart: string;
    workStop: string;
    address: string;
    photos: string[];
}

interface PlaceAddress {
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
    cep: string
  }

const ValidationPlacePage: React.FC = () => {
    const { slug } = useParams();
    const router = useRouter();
    const [place, setPlace] = useState<Place | null>(null);
    const [observations, setObservations] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [placeAddress, setPlaceAddress] = useState<PlaceAddress | null>(null);
    const cookies = useMemo(() => new Cookies(), []);

    const fetchPlaceData = useCallback(async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/get-place-base/${slug}/`, {
                method: 'GET',
            });
            const data = await response.json();
            if (data.success) {
                setPlace(data.place);
            } else {
                toast.error('Erro ao carregar os dados do local.');
            }
        } catch (error) {
            console.error('Erro ao buscar dados do local:', error);
            toast.error('Erro ao buscar os dados do local.');
        }
    }, [slug]);

    const fetchPlaceAddress = useCallback(async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
          const response = await fetch(`${apiUrl}/get-place-address/${slug}/`, {
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
      }, [cookies, slug]);

    useEffect(() => {
        fetchPlaceData();
        fetchPlaceAddress()
    }, [fetchPlaceData, fetchPlaceAddress]);

    const handleValidation = async (isApproved: boolean) => {
        setLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/validate-place/${slug}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    is_approved: isApproved,
                    observations,
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success(isApproved ? 'Local aprovado com sucesso!' : 'Local negado com sucesso!');
                router.push('/'); // Redireciona para o dashboard do admin
            } else {
                toast.error('Erro ao validar o local.');
            }
        } catch (error) {
            console.error('Erro ao enviar validação:', error);
            toast.error('Erro ao enviar a validação. Tente novamente.');
        }
        setLoading(false);
    };

    if (!place) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            <ToastContainer />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">{place.placeName}</h1>
                <p className="mb-2"><strong>Descrição:</strong> {place.description}</p>
                <p className="mb-2"><strong>Sobre:</strong> {place.about}</p>
                <p className="mb-2"><strong>Horário de funcionamento:</strong> {place.workStart} - {place.workStop}</p>
                <div className="hover:scale-105 transition-transform duration-300">
                    <p className="text-2xl text-black font-serif">Endereço</p>
                    <p className="mt-2 text-xl text-black">&#x1F4CD; {placeAddress?.street}, {placeAddress?.number}, {placeAddress?.neighborhood}.</p>
                    <p className="mt-2 mb-4 text-xl text-black">{placeAddress?.city}, {placeAddress?.state}. {placeAddress?.cep}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {place.photos.map((photo, index) => (
                        <img key={index} src={`http://localhost:8000${photo}`} alt={`Foto ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
                    ))}
                </div>
                <textarea
                    className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                    placeholder="Deixe suas observações (opcional)"
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                />
                <div className="flex gap-4">
                    <button
                        className="bg-green text-white px-4 py-2 rounded-lg"
                        onClick={() => handleValidation(true)}
                        disabled={loading}
                    >
                        {loading ? 'Enviando...' : 'Aprovar'}
                    </button>
                    <button
                        className="bg-red text-white px-4 py-2 rounded-lg"
                        onClick={() => handleValidation(false)}
                        disabled={loading}
                    >
                        {loading ? 'Enviando...' : 'Negar'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ValidationPlacePage;
