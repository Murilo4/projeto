'use client'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { userEmailAtom } from '@/states/atoms/userData'
import { useSetRecoilState } from 'recoil'
import Cookies from 'universal-cookie'
import addressSchema from '@/schemas/registerAddress'
import { FormRegisterAddressErrors, FormRegisterAddressValues, InputName } from '@/types/newAddress'

const initialValues: FormRegisterAddressValues = {
    addressName: '',
    state: '',
    city: '', 
    street: '', 
    neighborhood: '', 
    addressType: '',  // Vai ser um valor de 'residencial' ou 'comercial'
    number: '',
    cep: '',
}

const initialErrors: FormRegisterAddressErrors = {
    addressName: [],
    state: [],
    city: [], 
    street: [], 
    neighborhood: [],
    addressType: [], // Para os erros do campo de tipo de endereço
    number: [],
    cep: [],
}

export const CreateNewAddress: React.FC = () => {
  const [formValues, setFormValues] = useState<FormRegisterAddressValues>(initialValues)
  const [formErrors, setFormErrors] = useState<FormRegisterAddressErrors>(initialErrors)
  const [loader, setLoader] = useState<boolean>(false)

  const router = useRouter()
  const cookies = new Cookies()
  const setEmail = useSetRecoilState(userEmailAtom)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target

    // Limpar erros
    if (formErrors[name as InputName].length > 0)
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: [],
      }))

    setFormValues((prevValues) => ({
      ...prevValues,
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
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
        console.log('API URL:', apiUrl)

        // JSON to be sent to the backend
        console.log('JSON to be sent:', JSON.stringify(formValues))

        const response = await fetch(`${apiUrl}/create-address/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.get('access')}`
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

  return (
    <>
      <ToastContainer />
      <div className="flex h-screen justify-center">
        {/* Metade Direita (Branca) */}
        <div className="w-1/2 bg-gray-100 flex flex-col justify-center p-8">
          <h2 className='text-xl underline mb-3 justify-center content-center flex'>Vamos agora adicionar o seu novo endereço</h2>
          <h2 className='text-xl mb-6'>Precisamos apenas que preencha alguns dados:</h2>
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="addressName"
              placeholder="Nome para o endereço"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            {formErrors.addressName.length > 0 && <p className="text-red text-sm">{formErrors.addressName[0]}</p>}

            <input
              type="text"
              name="cep"
              placeholder="CEP"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            {formErrors.cep.length > 0 && <p className="text-red text-sm">{formErrors.cep[0]}</p>}

            {/* Campo Rua */}
            <input
              type="text"
              name="street"
              placeholder="Rua"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            {formErrors.street.length > 0 && <p className="text-red text-sm">{formErrors.street[0]}</p>}

            {/* Campo Bairro */}
            <input
              type="text"
              name="neighborhood"
              placeholder="Bairro"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            {formErrors.neighborhood?.length > 0 && <p className="text-red text-sm">{formErrors.neighborhood[0]}</p>}

            {/* Campo Número */}
            <input
              type="text"
              name="number"
              placeholder="Número"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            {formErrors.number.length > 0 && <p className="text-red text-sm">{formErrors.number[0]}</p>}

            {/* Campo Cidade */}
            <input
              type="text"
              name="city"
              placeholder="Cidade"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            {formErrors.city.length > 0 && <p className="text-red text-sm">{formErrors.city[0]}</p>}

            {/* Campo Estado */}
            <input
              type="text"
              name="state"
              placeholder="Estado"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <option value="">Selecione o tipo de endereço</option>
              <option value="residencial">Residencial</option>
              <option value="comercial">Comercial</option>
            </select>
            {formErrors.addressType?.length > 0 && <p className="text-red text-sm">{formErrors.addressType[0]}</p>}

            <button
              type="submit"
              className="w-full mt-4 text-xl bg-principal-blue text-white font-bold py-3 px-4 rounded-3xl hover:bg-blue-600 transition"
            >
              {loader ? 'Enviando...' : 'Cadastrar'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateNewAddress
