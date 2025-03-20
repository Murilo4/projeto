import Header from '@/app/header'
import { Footer } from "../footer";
import Help from './help'

export default function Home() {
  return (
    <>
      <div className="bg-background min-h-screen">
        <Header />
        <Help/>
        <Footer/>
      </div>
    </>
  )
}