
import Header from '@/app/header'
import { Footer } from "@/app/footer";
import ResultsCitys from './cities';

export default function Home() {
  return (
    <>
      <div className="bg-background min-h-screen">
        <Header />
        <ResultsCitys />
        <Footer/>
      </div>
    </>
  )
}