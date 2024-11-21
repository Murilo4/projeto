import {Swiper, SwiperProps} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SliderProps{
    settings: SwiperProps
    children: React.ReactNode
}
export default function Slider({settings, children}: SliderProps){
    return <Swiper {...settings}>{children}</Swiper>
}