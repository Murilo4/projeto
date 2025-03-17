import Header from '@/app/header'
import { Footer } from '@/app/footer'
import Locais from "./locais"
export default function Login() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
        <Locais/>
        </div>
        <Footer/>
      </div>
    </>
  )
}