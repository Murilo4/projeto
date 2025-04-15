import { Footer } from '@/app/footer'
import CreateLocal from './editar'
export default function Login() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
        <CreateLocal/>
        </div>
        <Footer/>
      </div>
    </>
  )
}