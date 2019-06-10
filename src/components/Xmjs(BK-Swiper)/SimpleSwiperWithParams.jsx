import React from 'react';
import Swiper from 'react-id-swiper';
import { Pagination, Navigation } from 'swiper/dist/js/swiper.esm'
import './SimpleSwiperWithParams.scss';

const SimpleSwiperWithParams = () => {
    const params = {
        modules: [Pagination, Navigation],
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            // nextEl: '.swiper-button-next',
            // prevEl: '.swiper-button-prev'
        },
        spaceBetween: 30
    }

    return (
        <Swiper {...params}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </Swiper>
    )
}

export default SimpleSwiperWithParams;