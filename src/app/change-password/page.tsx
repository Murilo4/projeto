import Header from '@/app/header'
import { Footer } from '@/app/footer'
import ChangePassword from "@/app/change-password/changePassword"

export default function Login() {
  return (
    <>
      <div className="bg-white min-h-screen">
        <Header />
        <ChangePassword />
        <Footer/>
      </div>
    </>
  )
}