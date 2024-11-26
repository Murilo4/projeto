
import Header from '@/app/header'
import { Footer } from './footer'
import Search from './search'
import Sliders from './sliders'

export default function Home() {
  return (
    <>
      <div className="bg-white min-h-screen">
        <Header />
        <Search />
        <Sliders />
        <Footer/>
      </div>
    </>
  )
}