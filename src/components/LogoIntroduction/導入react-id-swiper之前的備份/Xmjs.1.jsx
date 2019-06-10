import React from 'react';
import './Xmjs.scss';

const Swiper = window.Swiper;

class Xmjs extends React.Component {

    componentDidMount() {
        new Swiper(this.swiperID, {
            direction: 'vertical',
            pagination: {
                el: this.paginateID,
                // observer: true,
                type: 'bullets',
                clickable: true,
                loop: true,
                dynamicBullets: true,
                // preloadImages: false,
                // lazy:true,
            },
        });
    }

    render() {
        return (
            <div className="XmjsContainer">

                <div className="swiper-container" ref={self => this.swiperID = self} style={this.swiperContainerStyle}>
                    <div className="swiper-wrapper">
                        {/*<div data-background={require('../../images/xmjs/JS1.png')} className="swiper-slide swiper-lazy"></div>*/}
                        <div className="swiper-slide" ref={self => this.slide1 = self}></div>
                        <div className="swiper-slide"></div>
                        <div className="swiper-slide"></div>
                        <div className="swiper-slide"></div>
                        <div className="swiper-slide"></div>
                        <div className="swiper-slide"></div>
                    </div>
                    <div className="swiper-pagination" ref={self => this.paginateID = self}></div>
                </div>

            </div>
        )
    }
}

export { Xmjs };