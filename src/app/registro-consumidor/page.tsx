import Header from '@/app/header'
import { Footer } from '@/app/footer'
import CreateAccountPage from './registerForm'


export default function Home() {
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