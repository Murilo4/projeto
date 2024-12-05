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
        image: ['/cidade2a.jpg', '/cidade2b.jpg', '/cidade2c.jpg'],
        title: 'Mais Benefícios',
        text: 'Another example of dummy text for the next slide...',
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