import Header from '@/app/header'
import { Footer } from '@/app/footer'
import { CreateAccountPage } from '@/app/registro-empresa/registerForm'


export default function RegisterUser() {
  return (
    <>
      <div className="bg-white min-h-screen">
        <Header />
        <CreateAccountPage />
        <Footer/>
      </div>
    </>
  )
}