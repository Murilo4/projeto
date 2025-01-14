'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'universal-cookie'

const ConfirmEmail = () => {
  const [loading, setLoading] = useState(true)
  const [codeSent, setCodeSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [resendTimer, setResendTimer] = useState(0)
  const router = useRouter()
  const cookies = new Cookies()

  useEffect(() => {
    const token = cookies.get('token')
    const email = localStorage.getItem('userEmail')

    if (!token || !email) {
      toast.error('Token ou email não encontrado.')
      router.push('/')
      return
    }

    const validateToken = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
        const response = await fetch(`${apiUrl}/validate-token/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (!response.ok || !data.success) {
          toast.warning('Token inválido. Gerando um novo token...')
          await generateNewToken(email)
        } else {
          toast.success('Email confirmado com sucesso!')
          await sendVerificationCode(email)
          setCodeSent(true)
          setLoading(false)
        }
      } catch (error) {
        console.error('Erro ao validar o token:', error)
        toast.error('Erro ao validar o token. Tente novamente mais tarde.')
        router.push('/')
      }
    }

    const generateNewToken = async (email: string) => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
        const response = await fetch(`${apiUrl}/generate-token/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })

        const data = await response.json()

        if (!response.ok || !data.success) {
          toast.error('Erro ao gerar um novo token. Tente novamente mais tarde.')
          router.push('/')
          return
        }

        cookies.set('token', data.token)
        toast.success('Novo token gerado. Por favor, verifique seu email.')
        router.push('/registro/confirmar-email')
      } catch (error) {
        console.error('Erro ao gerar um novo token:', error)
        toast.error('Erro ao gerar um novo token. Tente novamente mais tarde.')
        router.push('/')
      }
    }

    const sendVerificationCode = async (email: string) => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
        const response = await fetch(`${apiUrl}/verify-email-code/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })

        const data = await response.json()

        if (!response.ok || !data.success) {
          toast.error('Erro ao enviar o código de verificação. Tente novamente mais tarde.')
          return
        }

        toast.success('Código de verificação enviado para seu email.')
      } catch (error) {
        console.error('Erro ao enviar o código de verificação:', error)
        toast.error('Erro ao enviar o código de verificação. Tente novamente mais tarde.')
      }
    }

    validateToken()
  }, [router, cookies])

  const handleCodeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const email = localStorage.getItem('userEmail')

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/verify-code/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: verificationCode }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        toast.error('Código de verificação inválido. Tente novamente.')
        return
      }

      toast.success('Código de verificação confirmado com sucesso!')
      router.push('/login')
    } catch (error) {
      console.error('Erro ao verificar o código:', error)
      toast.error('Erro ao verificar o código. Tente novamente mais tarde.')
    }
  }

  const handleResendCode = async () => {
    const email = localStorage.getItem('userEmail')

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/send-verification-code/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        toast.error('Erro ao reenviar o código de verificação. Tente novamente mais tarde.')
        return
      }

      toast.success('Código de verificação reenviado para seu email.')
      setResendTimer(60)
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev === 1) {
            clearInterval(timer)
          }
          return prev - 1
        })
      }, 1000)
    } catch (error) {
      console.error('Erro ao reenviar o código de verificação:', error)
      toast.error('Erro ao reenviar o código de verificação. Tente novamente mais tarde.')
    }
  }

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        {codeSent ? (
          <form onSubmit={handleCodeSubmit} className="space-y-6">
            <h1 className="text-2xl font-semibold text-center">Insira o código de verificação</h1>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Código de 6 dígitos"
              required
              className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-2xl font-semibold hover:bg-blue-600 transition"
            >
              Verificar Código
            </button>
            <button
              type="button"
              onClick={handleResendCode}
              disabled={resendTimer > 0}
              className="w-full bg-gray-300 text-gray-700 py-3 px-4 rounded-2xl font-semibold hover:bg-gray-400 transition"
            >
              {resendTimer > 0 ? `Reenviar código em ${resendTimer}s` : 'Reenviar Código'}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h1 className="text-xl font-semibold mb-4">Email confirmado com sucesso!</h1>
            <p className="text-gray-600">Um código de verificação foi enviado para o seu email.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConfirmEmail
