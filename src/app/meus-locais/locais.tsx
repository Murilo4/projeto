'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'universal-cookie'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'

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
}

interface PlaceData {
  place: Place
  photos: string[]
  categories: string[]
}

const Locais: React.FC = () => {
  const cookies = useMemo(() => new Cookies(), [])
  const [places, setPlaces] = useState<PlaceData[]>([])
  const [loader, setLoader] = useState<boolean>(false)
  const router = useRouter()

  const validateToken = useCallback(async () => {
    const token = cookies.get('access')
    if (!token) {
      router.push('/')
      return
    }
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
      await fetch(`${apiUrl}/validate-token/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.error('Erro ao validar token:', error)
      router.push('/')
    }
  }, [router, cookies])

  const fetchPlaces = useCallback(async () => {
    setLoader(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/get-user-places/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${cookies.get('access')}`,
        },
      })
      const data = await response.json()
      if (response.ok && data.success) {
        setPlaces(data.place)
      } else {
        toast.error('Erro ao carregar locais')
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
      toast.error('Erro ao carregar locais. Tente novamente mais tarde.')
    }
    setLoader(false)
  }, [cookies])

  useEffect(() => {
    validateToken()
    fetchPlaces()
  }, [validateToken, fetchPlaces])

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto p-2 relative mt-28">
        <div className="container mx-auto relative">
          <h1 className="text-2xl font-bold text-center mb-1">Gerenciamento de locais</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loader ? (
              <p>Carregando locais...</p>
            ) : places.length === 0 ? (
              <p className="text-center">Nenhum local encontrado.</p>
            ) : (
              places.map((placeData, index) => (
                <div key={index} className="border border-blue-mid p-4 rounded-md shadow-md shadow-blue-mid flex flex-col items-center w-full max-w-sm mx-auto">
                  <h3 className="text-xl mb-2 font-semibold text-center">{placeData.place.placeName}</h3>
                  {placeData.photos.length > 0 ? (
                    <img src={`http://localhost:8000${placeData.photos[0]}`} alt="Foto do Local" className="h-32 rounded-md mb-2" />
                  ) : (
                    <p>Foto do local não disponível</p>
                  )}
                  <p className="text-center mt-2 text-base mb-1">{placeData.place.description}</p>
                  <p className="text-center mt-2 text-sm text-gray-600 mb-1">{placeData.place.about}</p>
                  <p className="text-center mt-2 text-sm text-green-button mb-1">
                    Horário de funcionamento: {placeData.place.workStart} - {placeData.place.workStop}
                  </p>
                  <h4 className="text-lg font-semibold mt-4 ">Categorias</h4>
                  <ul className="list-disc ml-6">
                    {placeData.categories.map((category, idx) => (
                      <li key={idx}>{category}</li>
                    ))}
                  </ul>
                  <div className="flex justify-center w-full mt-4">
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <button
                        onClick={() => router.push(`/editar-local/${placeData.place.id}`)}
                        className="bg-blue text-white p-2 rounded-md hover:bg-blue flex flex-col items-center"
                      >
                        <FaEdit />
                        <span className="text-xs">Editar</span>
                      </button>
                      <button
                        onClick={() => toast.error('Função de exclusão não implementada')}
                        className="bg-red text-white p-2 rounded-md hover:bg-red flex flex-col items-center"
                      >
                        <FaTrash />
                        <span className="text-xs">Excluir</span>
                      </button>
                      <button
                        onClick={() => router.push(`/main-page/${placeData.place.id}?${placeData.place.placeName}`)}
                        className="bg-green text-white p-2 rounded-md hover: flex flex-col items-center w-full"
                      >
                        <FaEye />
                        <span className="text-xs">Acessar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Locais