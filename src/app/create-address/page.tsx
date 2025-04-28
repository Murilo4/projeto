'use client'
import { Footer } from '@/app/footer';
import CreateNewAddress from "@/app/create-address/CreateAddress"
import Header from '@/app/header';


export default function Page() {
  return (
    <div className="bg-white min-h-screen">
        <Header />
        <CreateNewAddress />
        <Footer />
    </div>
  );
}