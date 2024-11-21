
import { ButtonDefault } from "@/components/ButtonDefault"
import Image from "next/image"

export const Header = () => {
  return (
    <section className="mx-auto mt-3 max-w-1440px px-2 flex bg-white items-center">
      <div className="inline-flex justify-start">
        <div className="flex items-center">
          <Image
            src="/contur.png"
            width={180}
            height={100}
            alt="logo"
          />
        </div>
      </div>

      {/* Botões Centralizados */}
      <div className="flex flex-1 justify-center space-x-6">
        <ButtonDefault
          text="Novidades ⭣"
          type="link"
          style="outDark"
          link="/novidades"
          radius="rounded-xl"
          paddingx="px-6"
          paddingy="py-4"
        />
        <ButtonDefault
          text="Meus ganhos"
          type="link"
          style="outDark"
          link="/meus-ganhos"
          radius="rounded-xl"
          paddingx="px-6"
          paddingy="py-4"
        />
        <ButtonDefault
          text="Ajuda"
          type="link"
          style="outDark"
          link="/ajuda"
          radius="rounded-xl"
          paddingx="px-8"
          paddingy="py-4"
        />
      </div>

      {/* Botão "Minha conta" Alinhado à Direita */}
      <div className="flex justify-end">
        <ButtonDefault
          text="Minha conta"
          type="link"
          style="outDark"
          link="/minha-conta"
          radius="rounded-xl"
          paddingx="px-6"
          paddingy="py-4"
        />
      </div>
  </section>
  );
}
