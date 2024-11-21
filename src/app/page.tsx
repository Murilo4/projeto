import Header from '@/components/header'
import { HomeBody } from '../components/body-home'
import { Footer } from '../components/footer'

export default function Home() {
  return (
    <>
      <div className="bg-white min-h-screen">
        <Header />
        <HomeBody/>
        <Footer/>
      </div>
    </>
  )
}