import Header from '@/app/header'
import { Footer } from '@/app/footer'
import LoginUser from './login-with-email'

export default function Login() {
  return (
    <>
      <div className="bg-white min-h-screen">
        <Header />
        <LoginUser />
        <Footer/>
      </div>
    </>
  )
}