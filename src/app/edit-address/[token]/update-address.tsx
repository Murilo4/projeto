'use client'

import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation' // Usar useParams para acessar os parâmetros da URL
import Cookies from 'universal-cookie'
import addressSchema from '@/schemas/registerAddress'
import { FormRegisterAddressErrors, FormRegisterAddressValues, InputName } from '@/types/newAddress'

const initialErrors: FormRegisterAddressErrors = {
    addressName: [],
    state: [],
    city: [],
    street: [],
    neighborhood: [],
    addressType: [],
    number: [],
    cep: [],
}

const UpdateAddress: React.FC = () => {
  const [formValues, setFormValues] = useState<FormRegisterAddressValues | null>(null)
  const [formErrors, setFormErrors] = useState<FormRegisterAddressErrors>(initialErrors)
  const [loader, setLoader] = useState<boolean>(false)

  const router = useRouter()

  // Usar useParams para pegar o token diretamente da URL
  const { token } = useParams() // Acesso ao parâmetro token

  const tokenStr = token as string

  useEffect(() => {
    if (!tokenStr) {
      toast.error("Token inválido ou não fornecido.")
      return
    }

    const fetchAddress = async () => {
      try {
        const cookies = new Cookies();
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/get-address/${tokenStr}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.get('access')}`
          },
          mode: 'cors'
        });

        const data = await response.json()

        if (data.success) {
          setFormValues(data.address)  // Preenche o formulário com os dados do endereço
        } else {
          toast.error('Erro ao buscar o endereço. Verifique se o token é válido.')
        }
      } catch (error) {
        console.error('Erro ao buscar o endereço:', error)
        toast.error('Erro ao buscar o endereço.')
      }
    }

    fetchAddress()
  }, [tokenStr])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target

    // Limpar erros
    if (formErrors[name as InputName].length > 0)
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: [],
      }))

    setFormValues((prevValues) => ({
      ...prevValues!,
      [name]: value,
    }))
  }

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
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
    } else {
      try {
        const cookies = new Cookies();
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

        const response = await fetch(`${apiUrl}/update-address/${tokenStr}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.get('access')}` // Usando o token JWT para autenticação
          },
          body: JSON.stringify(formValues),
        })

        const data = await response.json()

        console.log('API response:', data)

        if (response.status === 429) {
          toast.error('Muitas requisições. Tente novamente mais tarde.')
          setLoader(false)
          return
        }
        if (response.status === 401){
          router.push('/meu-perfil')
        }
        if (data.success) {
          toast.success(data.message)
          router.push('/meu-perfil')
        } else {
          console.log('API error:', data.message, data.errors)
          toast.warning(data.message)
        }
      } catch (error) {
        console.error('API request error:', error)
        toast.error('Erro ao enviar a requisição. Tente novamente mais tarde.')
      }
    }
    setLoader(false)
  }

  if (!formValues) {
    return (
      <div className="flex h-screen justify-center items-center">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <>
      <ToastContainer />
      <div className="flex h-screen justify-center">
        {/* Metade Direita (Branca) */}
        <div className="w-1/2 bg-gray-100 flex flex-col justify-center p-8">
          <h2 className='text-xl underline mb-3 justify-center content-center flex'>Editar seu endereço</h2>
          <h2 className='text-xl mb-6'>Atualize os dados conforme necessário:</h2>
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="addressName"
              placeholder="Nome para o endereço"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formValues.addressName}
              onChange={handleInputChange}
            />
            {formErrors.addressName.length > 0 && <p className="text-red text-sm">{formErrors.addressName[0]}</p>}

            <input
              type="text"
              name="cep"
              placeholder="CEP"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formValues.cep}
              onChange={handleInputChange}
            />
            {formErrors.cep.length > 0 && <p className="text-red text-sm">{formErrors.cep[0]}</p>}

            {/* Campo Rua */}
            <input
              type="text"
              name="street"
              placeholder="Rua"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formValues.street}
              onChange={handleInputChange}
            />
            {formErrors.street.length > 0 && <p className="text-red text-sm">{formErrors.street[0]}</p>}

            {/* Campo Bairro */}
            <input
              type="text"
              name="neighborhood"
              placeholder="Bairro"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formValues.neighborhood}
              onChange={handleInputChange}
            />
            {formErrors.neighborhood?.length > 0 && <p className="text-red text-sm">{formErrors.neighborhood[0]}</p>}

            {/* Campo Número */}
            <input
              type="text"
              name="number"
              placeholder="Número"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formValues.number}
              onChange={handleInputChange}
            />
            {formErrors.number.length > 0 && <p className="text-red text-sm">{formErrors.number[0]}</p>}

            {/* Campo Cidade */}
            <input
              type="text"
              name="city"
              placeholder="Cidade"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formValues.city}
              onChange={handleInputChange}
            />
            {formErrors.city.length > 0 && <p className="text-red text-sm">{formErrors.city[0]}</p>}

            {/* Campo Estado */}
            <input
              type="text"
              name="state"
              placeholder="Estado"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formValues.state}
              onChange={handleInputChange}
            />
            {formErrors.state.length > 0 && <p className="text-red text-sm">{formErrors.state[0]}</p>}

            {/* Campo Tipo de Endereço */}
            <select
              name="addressType"
              value={formValues.addressType}
              onChange={handleInputChange}
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="residencial">Residencial</option>
              <option value="comercial">Comercial</option>
            </select>
            {formErrors.addressType?.length > 0 && <p className="text-red text-sm">{formErrors.addressType[0]}</p>}

            <button
              type="submit"
              className="w-full mt-4 text-xl bg-principal-blue text-white font-bold py-3 px-4 rounded-3xl hover:bg-blue-600 transition"
            >
              {loader ? 'Enviando...' : 'Atualizar'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateAddress
