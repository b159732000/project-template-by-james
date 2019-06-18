import React from 'react';
import './AerialView.scss';
import ImageSequenceAerialView from '../ImageSequenceAerialView/ImageSequenceAerialView.jsx';

class AerialView extends React.Component {
    render() {
        return (
            <div className="AerialViewContainer">

                {/* 背景圖 */}
                <img className="AerialViewBg" src={require('../../images/AerialView/AerialBg.png')} alt=""/>

                {/* GIF全景圖 */}
                <div className="AerialViewimageSequencePositioner">
                    <div className="AerialViewimageSequenceContainer">
                        <ImageSequenceAerialView></ImageSequenceAerialView>
                    </div>
                </div>

            </div>
        )
    }
}

export default AerialView;
