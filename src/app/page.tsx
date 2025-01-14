
import Header from '@/app/header'
import { Footer } from './footer'
import Search from './search'
import Sliders from './sliders'
import Partners from './parcerias'
import Descover from './descover'
import Sliders2 from './sliders2'

export default function Home() {
  return (
    <>
      <div className="bg-background min-h-screen">
        <Header />
        <Search />
        <Sliders />
        <Partners />
        <Descover />
        <Sliders2 />
        <Footer/>
      </div>
    </>
  )
}