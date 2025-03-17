'use client'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { userEmailAtom } from '@/states/atoms/userData'
import { useSetRecoilState } from 'recoil'
import Cookies from 'universal-cookie'
import registerEnterprise from '@/schemas/registerEnterprise'
import { FormRegisterCNPJErrors, FormRegisterCNPJValues, InputName } from '@/types/registercnpj'

const initialValues: FormRegisterCNPJValues = {
  username: '',
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
  cnpj: '',
  phone: '',
}

const initialErrors: FormRegisterCNPJErrors = {
  username: [],
  email: [],
  confirmEmail: [],
  password: [],
  confirmPassword: [],
  cnpj: [],
  phone: [],
}

export const CreateAccountPage: React.FC = () => {
  const [formValues, setFormValues] = useState<FormRegisterCNPJValues>(initialValues)
  const [formErrors, setFormErrors] = useState<FormRegisterCNPJErrors>(initialErrors)
  const [loader, setLoader] = useState<boolean>(false)

  const router = useRouter()
  const cookies = new Cookies()
  const setEmail = useSetRecoilState(userEmailAtom)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    // Limpar erros
    if (formErrors[name as InputName].length > 0)
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: [],
      }))

    if (name === 'username') {
      const formattedValue = value
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: formattedValue,
      }))
    } else if (name === 'email' || name === 'confirmEmail') {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value.toLowerCase(),
      }))
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }))
    }
  }

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoader(true)

    const validation = registerEnterprise.safeParse(formValues)

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

        const response = await fetch(`${apiUrl}/create/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
          setEmail(formValues.email) // Atualiza o estado global do email
          // Save email to local storage
          localStorage.setItem('userEmail', formValues.email)
          // Save JWT token to cookies
          cookies.set('token', data.token)
          router.push('/confirmacao-email')
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
      <div className="flex h-screen">
        {/* Metade Esquerda (Azul) */}
        <div className="w-1/2 bg-principal-blue text-white flex flex-col justify-center p-8">
          <h2 className="text-2xl font-bold mb-4">Que bom que você deseja Fazer parte da Contur!</h2>
          <p className="text-sm mb-6">
            Vamos realizar o seu cadastro rapidamente para que você possa desfrutar de tudo que podemos oferecer!
          </p>
          <p className="text-sm mb-6">
            Caso já tenha uma conta e deseja utilizá-la, você pode realizar o login através deste botão:
          </p>
          <a href="/login" target="_blank">
            <button className="bg-white text-black py-3 px-4 rounded-3xl font-bold hover:bg-gray-200 transition">
              Realizar login
            </button>
          </a>
        </div>

        {/* Metade Direita (Branca) */}
        <div className="w-1/2 bg-gray-100 flex flex-col justify-center p-8">
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            {/* Razão Social */}
            <input
              type="text"
              name="username"
              placeholder="Razão social"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            {formErrors.username.length > 0 && <p className="text-red text-sm">{formErrors.username[0]}</p>}

            {/* Campo Email */}
            <input
              type="email"
              name="email"
              placeholder="Email para contato"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            {formErrors.email.length > 0 && <p className="text-red text-sm">{formErrors.email[0]}</p>}

            {/* Confirmar Email */}
            <input
              type="email"
              name="confirmEmail"
              placeholder="Confirme o Email"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            {formErrors.confirmEmail?.length > 0 && <p className="text-red text-sm">{formErrors.confirmEmail[0]}</p>}

            {/* Campo CNPJ */}
            <input
              type="text"
              name="cnpj"
              placeholder="CNPJ"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            {formErrors.cnpj.length > 0 && <p className="text-red text-sm">{formErrors.cnpj[0]}</p>}
            <input
              type="number"
              name="phone"
              placeholder="Telefone"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            {formErrors.phone.length > 0 && <p className="text-red text-sm">{formErrors.phone[0]}</p>}
            {/* Campo Senha */}
            <input
              type="password"
              name="password"
              placeholder="Senha"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            {formErrors.password.length > 0 && <p className="text-red text-sm">{formErrors.password[0]}</p>}

            {/* Confirmar Senha */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirme a senha"
              className="w-full border border-gray-400 focus:scale-105 rounded-2xl placeholder:text-black p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            {formErrors.confirmPassword?.length > 0 && <p className="text-red text-sm">{formErrors.confirmPassword[0]}</p>}

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