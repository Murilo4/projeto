'use client'
import { ButtonDefault } from "@/components/ButtonDefault"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Search = () => {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const router = useRouter();

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Impede o comportamento padrão do formulário
        if (searchTerm.trim()) { // Verifica se o termo de pesquisa não está vazio
            router.push(`/results?search=${encodeURIComponent(searchTerm)}`);
        }
    };

  return (
    <section className="mx-auto mt-6 max-w-1440px px-2 bg-white min-h-screen">
      <div className="relative w-full h-656px">
        <img
          src="/background.jpg"
          alt="Imagem 1"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
        />
        <div className="relative pb-10 flex flex-col items-center justify-end h-full">
          <ButtonDefault
            text="Saiba mais"
            type="link"
            style="light"
            link="/saiba-mais"
            radius="rounded-xl"
            paddingx="px-6"
            paddingy="py-4"
            shadow
          />
        </div>
      </div>

      <div className="w-full mt-5 flex flex-col items-center">
      <form onSubmit={handleSearch} className="relative w-full max-w-md lg:max-w-2xl xl:max-w-3xl h-12 mt-12 flex items-center">
        <div className="relative w-full max-w-md lg:max-w-2xl xl:max-w-3xl h-12 mt-12 flex items-center">
          <img
            src="/lupa.png"
            alt="Ícone de busca"
            className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 lg:w-8 lg:h-8"
          />
          
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Procure por locais aqui..."
            className="pl-12 lg:pl-20 w-full h-12 lg:h-14 rounded-3xl border-opacity-70 lg:border-4 border-blue-thirth text-black placeholder-gray-500 shadow-very-clean shadow-blue-thirth focus:outline-none"
          />
          <button type="submit" className="bg-blue-500 text-black p-2 ml-2">Buscar</button>
        </div>
        </form>
      </div>
    </section>
  );
}

export default Search