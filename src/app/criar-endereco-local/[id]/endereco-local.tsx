'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import { FormRegisterAddressErrors, FormRegisterAddressValues } from '@/types/addressPlace'
import addressSchema from '@/schemas/registerAddressPlace'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'universal-cookie'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const initialValues: FormRegisterAddressValues = {
    addressName: '',
    cep: '',
    street: '',
    city: '',
    state: '',
    number: '',
    neighborhood: '',
}

const initialErrors: FormRegisterAddressErrors = {
    addressName: [],
    cep: [],
    street: [],
    city: [],
    state: [],
    number: [],
    neighborhood: [],
}

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
    categories: string[]
    photos: []
}

const CreateAddressLocal: React.FC = () => {
    const cookies = useMemo(() => new Cookies(), [])
    const [loader, setLoader] = useState<boolean>(false)
    const router = useRouter()
    const [formValues, setFormValues] = useState<FormRegisterAddressValues>(initialValues)
    const [formErrors, setFormErrors] = useState<FormRegisterAddressErrors>(initialErrors)
    const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
    const [place, setplace] = useState<Place>()
    const { id: placeId } = useParams()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormValues((prev) => ({ ...prev, [name]: value }))
    }

    const fetchPlaceData = useCallback(async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
            const response = await fetch(`${apiUrl}/get-place/${placeId}/`, {
                method: 'GET',
            })
            const data = await response.json()
            if (data.success) {
                console.log(data.place)
                setplace(data.place)
                setPhotoPreviews(data.place.photos)
            }
        } catch (error) {
            console.error('Erro ao buscar dados do local:', error)
        }
    }, [cookies, placeId])

    useEffect(() => {
        fetchPlaceData()
    }, [fetchPlaceData])

    const handleCepLookup = async (cep: string) => {
        if (!cep) return; // Verifica se o CEP está vazio

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            console.log(data); // Log do retorno da API

            if (!data.erro) {
                setFormValues((prev) => ({
                    ...prev,
                    street: data.logradouro || prev.street,
                    neighborhood: data.bairro || prev.neighborhood,
                    city: data.localidade || prev.city,
                    state: data.estado || prev.state,
                    cep: data.cep || prev.cep,
                }));
            } else {
                toast.error('CEP não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao buscar endereço pelo CEP:', error);
            toast.error('Erro ao buscar endereço. Tente novamente.');
        }
    }

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoader(true)

        const validation = addressSchema.safeParse(formValues)

        if (!validation.success) {
            console.log('Validation errors:', validation.error.formErrors.fieldErrors)
            setFormErrors({
                ...initialErrors,
                ...validation.error.formErrors.fieldErrors,
            })
            Object.values(validation.error.formErrors.fieldErrors).forEach((errorArray) => {
                errorArray.forEach((error) => {
                    toast.error(error)
                })
            })
            setLoader(false)
            return
        }

        try {
            const requestData = {
                ...formValues,
                placeId: placeId, // Aqui você está incluindo o placeId no corpo da requisição
            }
            const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

            const response = await fetch(`${apiUrl}/create-address-place/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.get('access')}`,
                },
                body: JSON.stringify(requestData)
            })

            const data = await response.json()

            if (response.status === 429) {
                toast.error('Muitas requisições. Tente novamente mais tarde.')
                setLoader(false)
                return
            }

            if (data.success) {
                toast.success(data.message)
                router.push(`/meus-locais`)
            } else {
                console.log('API error:', data.message, data.errors)
                toast.warning(data.message)
            }
        } catch (error) {
            console.error('API request error:', error)
            toast.error('Erro ao enviar a requisição. Tente novamente mais tarde.')
        }

        setLoader(false)
    }

    const handlebuttonBackClick = () => {
        router.push('/meus-locais')
    }

    // Concatenar o endereço completo
    const fullAddress = `${formValues.street}, ${formValues.number}, ${formValues.neighborhood}, ${formValues.city} - ${formValues.state}`;

    return (
        <>
            <ToastContainer />
            <div className="flex h-full scale-90">
                <div className="w-9/12 bg-gray-100 flex flex-col justify-end p-8 pt-0 shadow-lg rounded-lg">
                    <div className='flex border-2 w-20 bg-blue rounded-xl p-2 mb-4 shadow-sm bg-blue-500 text-white'>
                        <button className='flex content-center justify-center pl-2' onClick={handlebuttonBackClick}>Voltar</button>
                    </div>
                    <form className="space-y-4 mx-auto w-9/12" onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            name="addressName"
                            placeholder="Nome do endereço"
                            className="w-full border border-gray-300 focus:scale-105 rounded-2xl placeholder:text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
                            onChange={handleInputChange}
                            value={formValues.addressName}
                        />
                        {formErrors.addressName.length > 0 && <p className="text-red-500 text-sm">{formErrors.addressName[0]}</p>}

                        <input
                            type="text"
                            name="cep"
                            placeholder="CEP do endereço"
                            className="w-full border border-gray-300 focus:scale-105 rounded-2xl placeholder:text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
                            onChange={handleInputChange}
                            onBlur={(e) => handleCepLookup(e.target.value)}
                            value={formValues.cep}
                        />
                        {formErrors.cep.length > 0 && <p className="text-red-500 text-sm">{formErrors.cep[0]}</p>}

                        <input
                            type="text"
                            name="street"
                            placeholder="Rua"
                            className="w-full border border-gray-300 focus:scale-105 rounded-2xl placeholder:text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
                            onChange={handleInputChange}
                            value={formValues.street}
                        />
                        {formErrors.street.length > 0 && <p className="text-red-500 text-sm">{formErrors.street[0]}</p>}

                        <input
                            type="text"
                            name="number"
                            placeholder="Número"
                            className="w-full border border-gray-300 focus:scale-105 rounded-2xl placeholder:text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
                            onChange={handleInputChange}
                            value={formValues.number}
                        />
                        {formErrors.number.length > 0 && <p className="text-red-500 text-sm">{formErrors.number[0]}</p>}

                        <input
                            type="text"
                            name="neighborhood"
                            placeholder="Bairro"
                            className="w-full border border-gray-300 focus:scale-105 rounded-2xl placeholder:text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
                            onChange={handleInputChange}
                            value={formValues.neighborhood}
                        />
                        {formErrors.neighborhood.length > 0 && <p className="text-red-500 text-sm">{formErrors.neighborhood[0]}</p>}

                        <input
                            type="text"
                            name="city"
                            placeholder="Qual cidade fica o seu estabelecimento?"
                            className="w-full border border-gray-300 focus:scale-105 rounded-2xl placeholder:text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
                            onChange={handleInputChange}
                            value={formValues.city}
                        />
                        {formErrors.city?.length > 0 && <p className="text-red-500 text-sm">{formErrors.city[0]}</p>}

                        <input
                            type="text"
                            name="state"
                            placeholder="Qual estado fica o seu estabelecimento?"
                            className="w-full border border-gray-300 focus:scale-105 rounded-2xl placeholder:text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
                            onChange={handleInputChange}
                            value={formValues.state}
                        />
                        {formErrors.state?.length > 0 && <p className="text-red-500 text-sm">{formErrors.state[0]}</p>}

                        <button
                            type="submit"
                            className="w-full mt-4 text-xl bg-blue text-white font-bold py-3 px-4 rounded-3xl hover:bg-blue-600 transition"
                        >
                            {loader ? 'Enviando...' : 'Criar'}
                        </button>
                    </form>
                </div>
                <div className="w-5/12 bg-white pt-0 shadow-lg rounded-lg flex flex-col justify-between">
                    <h2 className="text-2xl font-bold mb-4">Pré visualização</h2>
                    <div className="border border-gray-300 p-1 rounded-lg flex flex-col justify-between h-full">
                        <h3 className="text-xl font-bold mt-2 text-center">{place?.placeName || 'Nome do estabelecimento'}</h3>
                        <div className="mx-auto w-3/4">
                            <Carousel
                                additionalTransfrom={0}
                                arrows
                                autoPlaySpeed={3000}
                                centerMode={false}
                                className=""
                                containerClass="container-with-dots"
                                dotListClass=""
                                draggable
                                focusOnSelect={false}
                                infinite
                                itemClass=""
                                keyBoardControl
                                minimumTouchDrag={80}
                                renderButtonGroupOutside={false}
                                renderDotsOutside={false}
                                responsive={{
                                    desktop: {
                                        breakpoint: {
                                            max: 3000,
                                            min: 1024
                                        },
                                        items: 1,
                                        partialVisibilityGutter: 40
                                    },
                                    mobile: {
                                        breakpoint: {
                                            max: 464,
                                            min: 0
                                        },
                                        items: 1,
                                        partialVisibilityGutter: 30
                                    },
                                    tablet: {
                                        breakpoint: {
                                            max: 1024,
                                            min: 464
                                        },
                                        items: 1,
                                        partialVisibilityGutter: 30
                                    }
                                }}
                                showDots={false}
                                sliderClass=""
                                slidesToSlide={1}
                                swipeable
                            >
                                {photoPreviews.length > 0 ? (
                                    photoPreviews.map((photo, index) => (
                                        <img key={index} src={`http://localhost:8000${photo}`} alt={`Foto ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
                                    ))
                                ) : (
                                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg">
                                        <p>Suas imagens</p>
                                    </div>
                                )}
                            </Carousel>
                        </div>
                        <div className="mx-auto w-3/4 ">
                            <p className="text-gray-800 mt-2">{fullAddress || 'Localização'}</p> {/* Exibe o endereço completo */}
                            <p className="text-gray-800 mb-4 mt-4">{place?.description || 'Uma breve descrição do estabelecimento'}</p>
                            <p className="text-green-button mb-4">{place?.workStart && place?.workStop ? `Horário de funcionamento: ${place?.workStart} - ${place?.workStop}` : 'Horário de funcionamento'}</p>
                            <p className="text-gray-800 mb-4">
                                {Array.isArray(place?.categories)
                                    ? place.categories.join(', ')
                                    : 'Categorias'}
                            </p>
                            <p className="text-gray-800 mb-4">{place?.about || 'Conte a história de seu estabelecimento'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateAddressLocal