import Header from '@/app/header'
import { Footer } from '@/app/footer'
import LoginWithEmail from './login'

export default function RegisterUser() {

  return (
    <>
      <div className="bg-white min-h-screen">
        <Header/>
        <LoginWithEmail />
        <Footer/>
      </div>
    </>
  )
}