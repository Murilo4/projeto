import { Header } from './header'
import { HomeBody } from './body-home'
import { Footer } from './footer'

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