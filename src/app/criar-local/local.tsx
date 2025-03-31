'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import { FormRegisterPlaceErrors, FormRegisterPlaceValues } from '@/types/registerPlace'
import registerPlace from '@/schemas/registerPlace'
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

interface LocalData {
  placeName: string;
  description: string;
  photo: string;
  city: string;
  state: string;
  type: string[];
  locationX: string;
  locationY: string;
  workStart: string;
  workStop: string;
  about: string;
  category: string[];
}

const initialValues: FormRegisterPlaceValues = {
  placeName: '',
  description: '',
  photo: '',
  city: '',
  state: '',
  type: '',
  locationX: '',
  locationY: '',
  workStart: '',
  workStop: '',
  about: '',
  categories: '',
  enterprese: '',
}

const initialErrors: FormRegisterPlaceErrors = {
  placeName: [],
  description: [],
  photo: [],
  city: [],
  state: [],
  type: [],
  locationX: [],
  locationY: [],
  workStart: [],
  workStop: [],
  about: [],
  categories: [],
  enterprese: [],
}

const CreateLocal: React.FC = () => {
  const cookies = useMemo(() => new Cookies(), [])
  const [loader, setLoader] = useState<boolean>(false)
  const [categoriesData, setCategoriesData] = useState<categories[]>([])
  const [typeData, setTypeData] = useState<LocalType[]>([])
  const router = useRouter()
  const [formValues, setFormValues] = useState<FormRegisterPlaceValues>(initialValues)
  const [formErrors, setFormErrors] = useState<FormRegisterPlaceErrors>(initialErrors)
  const [photos, setPhotos] = useState<File[]>([])
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])

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
    fetchCategoriesData()
    fetchTypesData()
  }, [fetchCategoriesData, fetchTypesData])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      if (name === 'categories') {
        setFormValues((prevValues) => {
          const currentCategories = prevValues.categories.split(',').filter(Boolean);
          return {
            ...prevValues,
            categories: checked
              ? [...currentCategories, value].join(',')
              : currentCategories.filter((cat) => cat !== value).join(',')
          };
        });
      } else if (name === 'tipos') {
        setFormValues((prevValues) => {
          const currentTypes = prevValues.type.split(',').filter(Boolean);
          return {
            ...prevValues,
            type: checked
              ? [...currentTypes, value].join(',')
              : currentTypes.filter((type) => type !== value).join(',')
          };
        });
      }
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files)
      setPhotos((prevPhotos) => prevPhotos.concat(filesArray))
      const previewUrls = filesArray.map((file) => URL.createObjectURL(file))
      setPhotoPreviews((prevPreviews) => prevPreviews.concat(previewUrls))
    }
  }

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoader(true);

    const validation = registerPlace.safeParse(formValues);

    if (!validation.success) {
      console.log('Validation errors:', validation.error.formErrors.fieldErrors);
      setFormErrors({
        ...initialErrors,
        ...validation.error.formErrors.fieldErrors,
      });
      Object.values(validation.error.formErrors.fieldErrors).forEach((errorArray) => {
        errorArray.forEach((error) => {
          toast.error(error);
        });
      });
      setLoader(false);
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

      // Prepare the FormData
      const formData = new FormData();
      formData.append('placeName', formValues.placeName);
      formData.append('description', formValues.description);
      formData.append('city', formValues.city);
      formData.append('state', formValues.state);
      formData.append('workStart', formValues.workStart);
      formData.append('workStop', formValues.workStop);
      formData.append('about', formValues.about);

      // Adiciona categorias como um array
      const selectedCategories = formValues.categories.split(',').filter(Boolean);
      selectedCategories.forEach((category) => {
        formData.append('categories[]', category); // Envia como array
      });

      // Adiciona tipos como um array
      const selectedTypes = formValues.type.split(',').filter(Boolean);
      selectedTypes.forEach((type) => {
        formData.append('tipos[]', type); // Envia como array
      });

      // Adiciona fotos
      photos.forEach((photo) => {
        formData.append('photos', photo);
      });
      console.log(formData)
      const response = await fetch(`${apiUrl}/create-place/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cookies.get('access')}`,
        },
        body: formData, // Envia o FormData
      });

      const data = await response.json();

      if (response.status === 429) {
        toast.error('Muitas requisições. Tente novamente mais tarde.');
        setLoader(false);
        return;
      }

      if (data.success) {
        toast.success(data.message);
        router.push(`/criar-endereco-local/${data.placeId}`);
      } else {
        console.log('API error:', data.message, data.errors);
        toast.warning(data.message);
      }
    } catch (error) {
      console.error('API request error:', error);
      toast.error('Erro ao enviar a requisição. Tente novamente mais tarde.');
    }

    setLoader(false);
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
            />
            {formErrors.placeName.length > 0 && <p className="text-red-500 text-sm">{formErrors.placeName[0]}</p>}

            <input
              type="text"
              name="description"
              placeholder="Uma breve descrição do estabelecimento"
              className="w-full border border-gray-300 focus:scale-105 rounded-2xl placeholder:text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
              onChange={handleInputChange}
            />
            {formErrors.description.length > 0 && <p className="text-red-500 text-sm">{formErrors.description[0]}</p>}

            <input
              type="text"
              name="workStart"
              placeholder="Horário de início de funcionamento"
              className="w-full border border-gray-300 focus:scale-105 rounded-2xl placeholder:text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
              onChange={handleInputChange}
            />
            {formErrors.workStart.length > 0 && <p className="text-red-500 text-sm">{formErrors.workStart[0]}</p>}
            <input
              type="text"
              name="workStop"
              placeholder="Horário de encerramento de funcionamento"
              className="w-full border border-gray-300 focus:scale-105 rounded-2xl placeholder:text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
              onChange={handleInputChange}
            />
            {formErrors.workStop.length > 0 && <p className="text-red-500 text-sm">{formErrors.workStop[0]}</p>}

            <input
              type="text"
              name="about"
              placeholder="Conte a história de seu estabelecimento"
              className="w-full border border-gray-300 focus:scale-105 rounded-2xl placeholder:text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
              onChange={handleInputChange}
            />
            {formErrors.about.length > 0 && <p className="text-red-500 text-sm">{formErrors.about[0]}</p>}

            <input
              type="text"
              name="city"
              placeholder="Qual cidade fica o seu estabelecimento?"
              className="w-full border border-gray-300 focus:scale-105 rounded-2xl placeholder:text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
              onChange={handleInputChange}
            />
            {formErrors.city?.length > 0 && <p className="text-red-500 text-sm">{formErrors.city[0]}</p>}

            <input
              type="text"
              name="state"
              placeholder="Qual estado fica o seu estabelecimento?"
              className="w-full border border-gray-300 focus:scale-105 rounded-2xl placeholder:text-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
              onChange={handleInputChange}
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
                  <img key={index} src={photo} alt={`Foto ${index + 1}`} className="w-24 h-24 object-cover rounded-lg mr-2 mb-2" />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 text-xl bg-blue text-white font-bold py-3 px-4 rounded-3xl hover:bg-blue-600 transition"
            >
              {loader ? 'Enviando...' : 'Criar'}
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
              <p className="text-gray-800 mb-4">{formValues.categories.split(',').filter(Boolean).join(', ') || 'Categorias'}</p>
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

export default CreateLocal