import {Swiper, SwiperProps} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


interface SliderProps{
    settings: SwiperProps
    children: React.ReactNode
}
export default function Slider({settings, children}: SliderProps){
    return <Swiper modules={[Pagination]}{...settings}>{children}</Swiper>
}