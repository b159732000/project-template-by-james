import React from 'react';
import Swiper from 'react-id-swiper';
import { Pagination, Navigation } from 'swiper/dist/js/swiper.esm'
import './SimpleSwiperWithParams.scss';

const SimpleSwiperWithParams = () => {
    const params = {
        modules: [Pagination, Navigation],
        // preloadImages: false,
        lazy: true,
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
            {/* <img
                alt="img"
                src={"https://images.unsplash.com/photo-1560193649-fd85946a1774?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"}
                className="swiper-lazy"
            />
            <img
                alt="img"
                data-src="http://lorempixel.com/1600/1200/nature/3/"
                // data-src="http://lorempixel.com/1600/1200/nature/2/"
                className="swiper-lazy"
            />
            <img
                alt="img"
                data-src="http://lorempixel.com/1600/1200/nature/3/"
                className="swiper-lazy"
            />
            <img
                alt="img"
                data-src="http://lorempixel.com/1600/1200/nature/4/"
                className="swiper-lazy"
            /> */}
            {/* <div>
                <img data-src={require('../../images/Xmjs/1.jpg')} className="swiper-lazy"></img>
            </div>
            <div>
                <img data-src="http://lorempixel.com/1600/1200/nature/1/" className="swiper-lazy"></img>
            </div> */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
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