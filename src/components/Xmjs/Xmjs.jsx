import React from 'react';
import './Xmjs.scss';
import SimpleSwiperWithParams from './SimpleSwiperWithParams.jsx';




class Xmjs extends React.Component {


    render() {
        return (
            <div className="XmjsContainer">

                <SimpleSwiperWithParams></SimpleSwiperWithParams>

            </div>
        )
    }
}

export default Xmjs;