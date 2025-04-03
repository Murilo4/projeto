'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import { FormRegisterPlaceErrors, FormRegisterPlaceValues } from '@/types/editplace'
import editPlace from '@/schemas/editPlace'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'universal-cookie'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

interface categories {
    id: string;
    category: string;
}

interface LocalType {
    id: string;
    type: string;
}


const initialValues: FormRegisterPlaceValues = {
    placeName: '',
    description: '',
    photo: [],
    city: '',
    state: '',
    type: [],
    // locationX: '',
    // locationY: '',
    workStart: '',
    workStop: '',
    lowerPrice: '',
    higherPrice: '',
    about: '',
    categories: [],
    // enterprese: '',
}

const initialErrors: FormRegisterPlaceErrors = {
    placeName: [],
    description: [],
    photo: [],
    city: [],
    state: [],
    type: [],
    // locationX: [],
    // locationY: [],
    workStart: [],
    workStop: [],
    lowerPrice: [],
    higherPrice: [],
    about: [],
    categories: [],
    // enterprese: [],
}

const EditLocal: React.FC = () => {
    const cookies = useMemo(() => new Cookies(), [])
    const router = useRouter()
    const { id } = useParams()
    const [formValues, setFormValues] = useState<FormRegisterPlaceValues>(initialValues)
    const [formErrors, setFormErrors] = useState<FormRegisterPlaceErrors>(initialErrors)
    const [categoriesData, setCategoriesData] = useState<categories[]>([])
    const [typeData, setTypeData] = useState<LocalType[]>([])
    const [loader, setLoader] = useState<boolean>(false)
    const [photos, setPhotos] = useState<File[]>([])
    const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
    const [isChanged, setIsChanged] = useState<boolean>(false)
    const [originalValues, setOriginalValues] = useState<FormRegisterPlaceValues>(initialValues)

    const fetchPlaceData = useCallback(async () => {
        setLoader(true)
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
            const response = await fetch(`${apiUrl}/get-place/${id}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${cookies.get('access')}`,
                },
            })
            const data = await response.json()
            if (response.ok && data.success) {
                // Ajustando os dados para incluir todos os campos obrigatórios
                const fetchedValues = {
                    placeName: data.place.placeName || '',  // Adicionando valor default
                    description: data.place.description || '', // Adicionando valor default
                    workStart: data.place.workStart || '',  // Adicionando valor default
                    workStop: data.place.workStop || '',  // Adicionando valor default
                    about: data.place.about || '',  // Adicionando valor default
                    city: data.place.city || '',  // Adicionando valor default
                    state: data.place.state || '',  // Adicionando valor default
                    categories: data.place.categories || [], // Garantindo que seja um array
                    type: data.place.type || [], // Garantindo que seja um array
                    // locationX: data.place.locationX || null,  // Valor padrão para locationX
                    // locationY: data.place.locationY || null,  // Valor padrão para locationY
                    photo: data.place.photos || [],  // Garantindo que seja um array de fotos (pode estar vazio)
                    lowerPrice: data.place.lowerPrice || null,
                    higherPrice: data.place.higherPrice || null,
                    enterprise: data.place.enterprise || '',
                }

                setFormValues(fetchedValues)  // Preenche os valores do formulário
                setOriginalValues(fetchedValues)  // Armazena os valores originais

                // Configura as pré-visualizações das fotos
                const backendPhotoUrls = data.place.photos.map((photo: string) => `http://localhost:8000${photo}`)
                setPhotoPreviews(backendPhotoUrls)  // Preenche as pré-visualizações das fotos
            } else {
                toast.error('Erro ao carregar os dados do local.')
            }
        } catch (error) {
            console.error('Erro ao buscar dados do local:', error)
            toast.error('Erro ao carregar os dados do local. Tente novamente mais tarde.')
        }
        setLoader(false)
    }, [id, cookies])

    const fetchCategoriesData = useCallback(async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
            const response = await fetch(`${apiUrl}/get-categories/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json()
            if (data.success) {
                setCategoriesData(data.categories)
            }
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error)
        }
    }, [cookies])

    const fetchTypesData = useCallback(async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
            const response = await fetch(`${apiUrl}/get-types/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json()
            if (data.success) {
                console.log(data.tipos)
                setTypeData(data.tipos)
            }
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error)
        }
    }, [cookies])

    useEffect(() => {
        fetchPlaceData()
        fetchCategoriesData()
        fetchTypesData()
    }, [fetchPlaceData, fetchCategoriesData, fetchTypesData])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = event.target

        if (type === 'checkbox') {
            const target = event.target as HTMLInputElement // Narrowing to HTMLInputElement
            const checked = target.checked

            if (name === 'categories') {
                setFormValues((prevValues) => ({
                    ...prevValues,
                    categories: checked
                        ? [...prevValues.categories, value]
                        : prevValues.categories.filter((cat) => cat !== value),
                }))
            } else if (name === 'tipos') {
                setFormValues((prevValues) => ({
                    ...prevValues,
                    type: checked
                        ? [...prevValues.type, value]
                        : prevValues.type.filter((type) => type !== value),
                }))
            }
        } else {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }))
        }
        setIsChanged(true)
    }

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files)
            setPhotos((prevPhotos) => prevPhotos.concat(filesArray))
            const previewUrls = filesArray.map((file) => URL.createObjectURL(file))
            setPhotoPreviews((prevPreviews) => prevPreviews.concat(previewUrls))
            setIsChanged(true)
        }
    }

    const handleRemovePhoto = (index: number) => {
        setPhotoPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index))
        setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index))
        setIsChanged(true)
    }

    async function handleFormSubmit(place: React.FormEvent<HTMLFormElement>) {
        place.preventDefault()
        setLoader(true)

        const validation = editPlace.safeParse(formValues)

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
            return
        }

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

            // Prepare categories as an array of objects with id and category
            const selectedCategories = formValues.categories.filter(Boolean)
            const categoryObjects = selectedCategories.map((category) => {
                const categoryData = categoriesData.find((cat) => cat.category === category)
                return categoryData ? { id: categoryData.id, category: categoryData.category } : null
            }).filter(Boolean)

            // Prepare the payload as FormData
            const formData = new FormData()
            formData.append('placeName', formValues.placeName)
            formData.append('description', formValues.description)
            formData.append('city', formValues.city)
            formData.append('state', formValues.state)
            formData.append('type', JSON.stringify(formValues.type))
            formData.append('workStart', formValues.workStart)
            formData.append('workStop', formValues.workStop)
            formData.append('about', formValues.about)
            formData.append('lowerPrice', formValues.lowerPrice)
            formData.append('higherPrice', formValues.higherPrice)
            formData.append('categories', JSON.stringify(categoryObjects))
            formData.append('lowerPrice', formValues.lowerPrice)
            formData.append('higherPrice', formValues.higherPrice)

            photos.forEach((photo) => {
                formData.append('photos', photo)
            })

            const response = await fetch(`${apiUrl}/update-place/${id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${cookies.get('access')}`,
                },
                body: formData,
            })

            const data = await response.json()

            if (response.status === 429) {
                toast.error('Muitas requisições. Tente novamente mais tarde.')
                setLoader(false)
                return
            }

            if (data.success) {
                toast.success(data.message)
                router.push('/meus-locais')
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

    return (
        <>
            <ToastContainer />
            <div className="flex h-full scale-90">
                <div className="w-9/12 bg-gray-100 flex flex-col justify-end p-8 pt-0 shadow-lg rounded-lg">
                    <div className='flex border-2 w-20 bg-blue rounded-xl p-2 mb-4 shadow-sm bg-blue-500 text-white'>
                        <button className='flex content-center justify-center pl-2'
                            onClick={handlebuttonBackClick}>Voltar
                        </button>
                    </div>
                    <form className="space-y-4 mx-auto w-9/12" onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            name="placeName"
                            placeholder="Nome do estabelecimento"
                            className="w-full border border-gray-300 focus:scale-105 rounded-2xl placeholder:text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
                            onChange={handleInputChange}
                            value={formValues.placeName}
                        />
                        {formErrors.placeName.length > 0 && <p className="text-red-500 text-sm">{formErrors.placeName[0]}</p>}

                        <input
                            type="text"
                            name="description"
                            placeholder="Uma breve descrição do estabelecimento"
                            className="w-full border border-gray-300 focus:scale-105 rounded-2xl placeholder:text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
                            onChange={handleInputChange}
                            value={formValues.description}
                        />
                        {formErrors.description.length > 0 && <p className="text-red-500 text-sm">{formErrors.description[0]}</p>}

                        <input
                            type="text"
                            name="workStart"
                            placeholder="Horário de início de funcionamento"
                            className="w-full border border-gray-300 focus:scale-105 rounded-2xl placeholder:text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
                            onChange={handleInputChange}
                            value={formValues.workStart}
                        />
                        {formErrors.workStart.length > 0 && <p className="text-red-500 text-sm">{formErrors.workStart[0]}</p>}
                        <input
                            type="text"
                            name="workStop"
                            placeholder="Horário de encerramento de funcionamento"
                            className="w-full border border-gray-300 focus:scale-105 rounded-2xl placeholder:text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
                            onChange={handleInputChange}
                            value={formValues.workStop}
                        />
                        {formErrors.workStop.length > 0 && <p className="text-red-500 text-sm">{formErrors.workStop[0]}</p>}

                        <input
                            type="text"
                            name="lowerPrice"
                            placeholder="Menor valor ofertado"
                            className="w-full border border-gray-300 focus:scale-105 rounded-2xl placeholder:text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
                            onChange={handleInputChange}
                            value={formValues.lowerPrice}
                        />
                        {formErrors.lowerPrice.length > 0 && <p className="text-red-500 text-sm">{formErrors.lowerPrice[0]}</p>}
                        <input
                            type="text"
                            name="higherPrice"
                            placeholder="Maior valor ofertado"
                            className="w-full border border-gray-300 focus:scale-105 rounded-2xl placeholder:text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
                            onChange={handleInputChange}
                            value={formValues.higherPrice}
                        />
                        {formErrors.higherPrice.length > 0 && <p className="text-red-500 text-sm">{formErrors.higherPrice[0]}</p>}
                        <input
                            type="text"
                            name="about"
                            placeholder="Conte a história de seu estabelecimento"
                            className="w-full border border-gray-300 focus:scale-105 rounded-2xl placeholder:text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
                            onChange={handleInputChange}
                            value={formValues.about}
                        />
                        {formErrors.about.length > 0 && <p className="text-red-500 text-sm">{formErrors.about[0]}</p>}

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

                        <div>
                            <label className="block text-gray-700">Categorias:</label>
                            <div className="flex flex-wrap">
                                {categoriesData.map((cat) => (
                                    <label key={cat.id} className="mr-4">
                                        <input
                                            type="checkbox"
                                            name="categories"
                                            value={cat.category}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                            checked={(formValues.categories || []).includes(cat.category)}
                                        />
                                        {cat.category}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700">Tipo:</label>
                            <div className="flex flex-wrap">
                                {typeData.map((data) => (
                                    <label key={data.id} className="mr-4">
                                        <input
                                            type="checkbox"
                                            name="tipos"
                                            value={data.type}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                            checked={(formValues.type || []).includes(data.type)}
                                        />
                                        {data.type}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700">Fotos:</label>
                            <input
                                type="file"
                                multiple
                                onChange={handlePhotoChange}
                                className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
                            />
                            <div className="flex flex-wrap mt-4">
                                {photoPreviews.map((photo, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={photo}
                                            alt={`Foto ${index + 1}`}
                                            className="w-24 h-24 object-cover rounded-lg mr-2 mb-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemovePhoto(index)}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-4 text-xl bg-blue text-white font-bold py-3 px-4 rounded-3xl hover:bg-blue-600 transition"
                            disabled={!isChanged}
                        >
                            {loader ? 'Enviando...' : 'Salvar'}
                        </button>
                    </form>
                </div>
                <div className="w-5/12 bg-white  pt-0 shadow-lg rounded-lg flex flex-col justify-between">
                    <h2 className="text-2xl font-bold mb-4">Pré visualização</h2>
                    <div className="border border-gray-300 p-1 rounded-lg flex flex-col justify-between h-full">
                        <h3 className="text-xl font-bold mt-2 text-center">{formValues.placeName || 'Nome do estabelecimento'}</h3>
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
                                        <img key={index} src={photo} alt={`Foto ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
                                    ))
                                ) : (
                                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg">
                                        <p>Suas imagens</p>
                                    </div>
                                )}
                            </Carousel>
                        </div>
                        <div className="mx-auto w-3/4 ">
                            <p className="text-gray-800 mb-4 mt-4">{formValues.description || 'Uma breve descrição do estabelecimento'}</p>
                            <p className="text-green-button mb-4">{formValues.workStart && formValues.workStop ? `Horário de funcionamento: ${formValues.workStart} - ${formValues.workStop}` : 'Horário de funcionamento'}</p>
                            <p className="">{formValues.lowerPrice && formValues.higherPrice ? `Valor dos produtos: R$ ${formValues.lowerPrice} A R$ ${formValues.higherPrice} Reais` : `Valor dos produtos`}</p>
                            <p className="text-gray-800 mb-4">{(formValues.categories || []).join(', ') || 'Categorias'}</p>
                            <p className="text-gray-800 mb-4">{formValues.about || 'Conte a história de seu estabelecimento'}</p>
                            <div className="w-full h-48 mt-2">
                                <img src="/maps.jpg" alt="Map placeholder" className="w-full h-full object-cover rounded-lg" />
                            </div>
                            <p className="text-gray-800 mt-2">{formValues.city && formValues.state ? `${formValues.city}, ${formValues.state}` : 'Localização'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditLocal