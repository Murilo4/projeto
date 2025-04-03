import Header from '@/app/header'
import { Footer } from "../footer";
import Help from './help'

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
        <Help/>
        </div>
        <Footer/>
      </div>
    </>
  )
}