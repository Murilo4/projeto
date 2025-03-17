'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'universal-cookie'
import { FaEdit, FaTrash, FaQuestion, FaEye } from 'react-icons/fa'

interface EventData {
  id: string;
  eventName: string;
  description: string;
  photo: string;
  qrCode: string;
  isActive: boolean;
  existFilter: boolean;
}
const Locais: React.FC = () => {
  const cookies = useMemo(() => new Cookies(), [])
  const [places, setPlaces] = useState<EventData[]>([])
  const [canAddPlace, setCanAddPlace] = useState<boolean | null>(null)
  const [loader, setLoader] = useState<boolean>(false)
  const router = useRouter()
  const [userData, setUserData] = useState({
    username: '',
    photo: ''
  });

  const validateAuth = useCallback(() => {
    const userValid = cookies.get('user_valid')
    setCanAddPlace(userValid === true)
  }, [cookies])
  // Função para validar o token do usuário
  const validateToken = useCallback(async () => {
    const token = cookies.get('access')
    if (!token) {
      router.push('/')
      return
    }
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/validate-token/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.error('Erro ao validar token:', error)
      router.push('/')
    }
  }, [router, cookies, validateAuth]);

  const handleStartEvent = async (eventId: string) => {
    router.push(`/control-evento/${eventId}`)
  }

  const handleLogout = () => {
    cookies.remove('access')
    cookies.remove('user_valid')
    router.push('/')
    toast.success('Você foi deslogado com sucesso!')
  }
  const fetchEvents = useCallback(async () => {
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
      if (response.ok) {
        setPlaces(data.places)
      } else {
        toast.error('Erro ao carregar locais')
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
      toast.error('Erro ao carregar locais. Tente novamente mais tarde.')
    }
    setLoader(false)
  }, [cookies]);

  const fetchUserData = useCallback(async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/user-profile/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.get('access')}`
        },
      });
      const data = await response.json();
      if (data.success) {
        setUserData({
          username: data.userData.username,
          photo: data.userData.photo ? `http://localhost:8000${data.userData.photo}` : '/foto-padrao.png'
        });
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  }, [cookies]);

  useEffect(() => {
    validateToken()
    fetchEvents()
    fetchUserData()
  }, [fetchEvents, validateToken, fetchUserData])


  const handleCreateEvent = () => {
      router.push('/criar-local')
    }

  const handleDeleteEvent = async (localId: string) => {
    setLoader(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/delete-local/${localId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${cookies.get('access')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ localId }),
      })
      const data = await response.json()
      if (response.ok) {
        setPlaces(places.filter(local => local.id !== localId))
        toast.success('Evento excluído com sucesso!')
        router.push('/main-page')
      } else {
        toast.error(data.message || 'Erro ao excluir evento.')
      }
    } catch (error) {
      console.error('Erro na requisição de exclusão:', error)
      toast.error('Erro ao excluir evento. Tente novamente mais tarde.')
    }
    setLoader(false)
  }

  const handleEditEvent = (localId: string) => {
    router.push(`/editar-evento?id=${localId}`)
  }

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto p-2 relative mt-28">
        <div className="container mx-auto relative">
          <h1 className="text-2xl font-bold text-center mb-1">Gerenciamento de locais</h1>
            <div className="text-center">
              <button
                onClick={handleCreateEvent}
                className="bg-principal-blue text-white py-2 px-4 mb-4 rounded-md hover:bg-blue-600"
              >
                Criar Novo local
              </button>
            </div>


          {canAddPlace === null ? (
            <p>Carregando...</p>
          ) : (
            <div className="text-center">
              <button
                onClick={handleCreateEvent}
                className="bg-principal-blue text-white py-2 px-4 mb-4 rounded-md hover:bg-blue-600"
                disabled={canAddPlace === false}
              >
                {canAddPlace ? 'Criar Novo Evento' : 'Solicitar Permissão para Criar Evento'}
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loader ? (
              <p>Carregando eventos...</p>
            ) : places.length === 0 ? (
              <p className="text-center">Nenhum local encontrado.</p>
            ) : (
              places.map(event => (
                <div key={event.id} className="border border-blue-mid p-4 rounded-md shadow-md shadow-blue-mid flex flex-col items-center w-full max-w-sm mx-auto">
                  <h3 className="text-xl mb-2 font-semibold text-center">{event.eventName}</h3>
                  {event.photo ? (
                    <img src={`http://localhost:8000${event.photo}`} alt="Foto do Evento" className="h-32 rounded-md mb-2" />
                  ) : (
                    <p>Foto do evento não disponível</p>
                  )}
                  <p className="text-center mt-2 text-base">{event.description}</p>
                  <div className="flex justify-center w-full mt-4">
                    <div className="grid grid-cols-4 gap-2 w-full">
                      <button
                        onClick={() => handleEditEvent(event.id)}
                        className="bg-blue text-white p-2 rounded-md hover:bg-blue flex flex-col items-center"
                      >
                        <FaEdit />
                        <span className="text-xs">Editar</span>
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="bg-red text-white p-2 rounded-md hover:bg-red flex flex-col items-center"
                      >
                        <FaTrash />
                        <span className="text-xs">Excluir</span>
                      </button>
                      <button
                        onClick={() => router.push(`/questions/${event.id}`)}
                        className="bg-yellow text-white p-2 rounded-md hover:bg-yellow flex flex-col items-center"
                      >
                        <FaQuestion />
                        <span className="text-xs">Perguntas</span>
                      </button>
                      <button
                        onClick={() => handleStartEvent(event.id)}
                        className="bg-green text-white p-2 rounded-md hover:bg-green flex flex-col items-center"
                        disabled={!canAddPlace}
                      >
                        <FaEye />
                        <span className="text-xs">Iniciar</span>
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push(`/past-events/${event.id}`)}
                    className="bg-purple text-white py-2 px-4 rounded-md hover:bg-purple w-full mt-2 flex flex-col items-center"
                    disabled={!event.existFilter}
                  >
                    <FaEye />
                    <span className="text-xs">Eventos Realizados</span>
                  </button>
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