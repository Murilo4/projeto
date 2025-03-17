import Header from '@/app/header'
import { Footer } from '@/app/footer'
import CreateLocal from './local'
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