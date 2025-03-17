'use client'

// import Header from '@/app/header'
import { Footer } from '@/app/footer'
import { RegisterFormSection } from '@/app/registro-consumidor/registerForm'
import { Suspense } from 'react'
import { RecoilRoot } from 'recoil';
import Header from '@/app/header'

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <Suspense fallback={<div>Carregando...</div>}>
      <Header />
        <RecoilRoot>
          <RegisterFormSection /> {/* Ensure this component is correctly used */}
        </RecoilRoot>
      </Suspense>
      <Footer />
    </div>
  )
}