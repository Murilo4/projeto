import Header from '@/app/header'
import { Footer } from '@/app/footer'
import LoginUser from './Login'

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