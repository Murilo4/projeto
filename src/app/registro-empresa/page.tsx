'use client'

import Header from '@/app/header'
import { Footer } from '@/app/footer'
import { CreateAccountPage } from '@/app/registro-empresa/registerForm'
import { RecoilRoot } from 'recoil';
import { Suspense } from 'react'


export default function RegisterUser() {
  return (
    <>
      <div className="bg-white min-h-screen">
      <Suspense fallback={<div>Carregando...</div>}>
      <Header />
        <RecoilRoot>
          <CreateAccountPage /> {/* Ensure this component is correctly used */}
        </RecoilRoot>
      </Suspense>
      <Footer />
    </div>
    </>
  )
}