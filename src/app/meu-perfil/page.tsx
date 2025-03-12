import Header from '@/app/header'
import { Footer } from '@/app/footer'
import UserAccount from "./perfil"
export default function Login() {
  return (
    <>
      <div className="bg-white min-h-screen">
        <Header />
        <UserAccount/>
        <Footer/>
      </div>
    </>
  )
}