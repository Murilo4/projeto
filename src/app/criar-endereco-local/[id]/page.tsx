import Header from '@/app/header'
import { Footer } from '@/app/footer'
import CreateAddressLocal from './endereco-local'
export default function Login() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
        <CreateAddressLocal/>
        </div>
        <Footer/>
      </div>
    </>
  )
}