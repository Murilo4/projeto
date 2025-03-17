'use client'

import { useSearchParams } from 'next/navigation';
import { Footer } from '@/app/footer';
import CreateNewAddress from "@/app/create-address/CreateAddress"
import Header from '@/app/header';


export default function Page() {
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  return (
    <div className="bg-white min-h-screen">
        <Header />
        <CreateNewAddress />
        <Footer />
    </div>
  );
}