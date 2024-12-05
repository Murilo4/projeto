'use client'
import React from 'react';
import Slider from "@/components/Slider";
import { SwiperProps, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import { ButtonDefault } from '@/components/ButtonDefault';

const data = [
    {
        image: ['/mainPhotos/franca2.png', '/mainPhotos/pracamatriz1.png', '/mainPhotos/franca_02.jpg', '/mainPhotos/estacaomogiana.png'],
        title: 'Cidade de Franca',
        text: 'Franca é um município brasileiro no interior do estado de São Paulo. Possui uma área de 605,679 km², e sua população estimada em 2024 era de 364.331 habitantes, sendo o 20.º município mais populoso do estado.É conhecida em todo Brasil como a "Capital Nacional do Calçado" e a "Capital Nacional do Basquete',
        local: 'Franca'
    },
    {
        image: ['/mainPhotos/rifaina1.png', '/mainPhotos/rifaina2.png', '/mainPhotos/rifaina3.png'],
        title: 'Rifaina',
        text: 'Rifaina é uma pequena cidade localizada no interior de São Paulo, conhecida por suas belezas naturais e tranquilidade. Situada a cerca de 50 km de Franca, a cidade é famosa pela sua proximidade com o Rio Grande, que oferece opções de lazer ao ar livre, como pesca, passeios de barco e banhos nas águas do rio.A cidade é também um destino turístico popular para quem busca um ambiente mais sossegado, ideal para descanso e para a prática de esportes náuticos. Rifaina tem uma atmosfera pacata, com uma população acolhedora e várias opções de restaurantes típicos e pousadas que atraem os turistas.',
        local: 'Rifaina'
    },
];

export const Descover = () => {
    const settings: SwiperProps = {
        spaceBetween: 10,
        slidesPerView: 1,
        autoplay: {
          delay: 20000,
          disableOnInteraction: false,
        },
      }
    const settingImage: SwiperProps = {
        spaceBetween: 10,
        slidesPerView: 1,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        
    }

    return (
        <section className="mx-auto mt-40 mb-10 max-w-1440px px-2 bg-background">
            <Slider settings={settings}>
                {data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex items-center">
                            <div className="w-2/3 h-718px">
                                <Slider settings={settingImage}>
                                    {item.image.map((img, imgIndex) => (
                                        <SwiperSlide key={imgIndex}>
                                            <img
                                                src={img}
                                                alt={`Slide ${imgIndex + 1} de ${item.title}`}
                                                className="rounded-lg object-cover"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Slider>
                            </div>
                            <div className="w-1/2 pl-8 flex flex-col justify-start space-y-4">
                                <h2 className="text-2xl font-bold">{item.title}</h2>
                                <p className="text-xl">{item.text}</p>
                                <ButtonDefault
                                    text={`Conheça mais sobre ${item.local}`}
                                    type="link"
                                    link={`/cities/?search=${item.local}`}
                                ></ButtonDefault>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Slider>
</section>
    );
};

export default Descover;