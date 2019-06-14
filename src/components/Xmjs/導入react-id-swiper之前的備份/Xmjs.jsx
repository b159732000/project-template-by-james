import React from './node_modules/react';
import './Xmjs.scss';
import SimpleSwiperWithParams from '../SimpleSwiperWithParams.jsx/index.js';




class Xmjs extends React.Component {


    render() {
        return (
            <div className="XmjsContainer">

                <SimpleSwiperWithParams></SimpleSwiperWithParams>

            </div>
        )
    }
}

export { Xmjs };