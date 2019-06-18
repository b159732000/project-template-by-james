import React from 'react';
import Plyr from 'plyr';    // 參考網址 - https://www.npmjs.com/package/plyr
import '../../lib/Plyr/plyr.css';
import './GardenTravelingFullpageVideoPlayer.scss';
import { TubeBufferGeometry } from 'three';

var player;

class GardenTravelingFullpageVideoPlayer extends React.Component {
    componentDidMount() {
        player = new Plyr(this.player, {
            autoplay: true,
            controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
            fullscreen:{ enabled: true, fallback: true, iosNative: true }
        });
        player.on('loadeddata', ()=>this.afterPlayerLoad());    // player第一個影格載入完成時觸發
    }

    // player第一個影格載入完成時觸發
    afterPlayerLoad() {
        // player.pause();  //可以正常使用
        // player.fullscreen.enter();   //fullscreen必須要再fullscreen按鈕被渲染之後才能正確觸發
        // player.fullscreen.active;  //這是getter,詳細getter、setter請查閱API
    }

    render() {
        return (
            <div className="GardenTravelingFullpageVideoPlayerContainer">
                <div className="videoContaienr">
                    <video src={require('../../images/View_From_A_Blue_Moon_Trailer-1080p.mp4')} ref={self => this.player = self}></video>
                </div>
            </div>
        )
    }
}

export default GardenTravelingFullpageVideoPlayer;