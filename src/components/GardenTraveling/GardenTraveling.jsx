import React from 'react';
import './GardenTraveling.scss';

const pannellum = window.pannellum;
var panorama;

class GardenTraveling extends React.Component {
    componentDidMount() {
        this.initPanorama();    // 初始化全景圖
    }

    // 初始化全景圖
    initPanorama() {
        // Multiresolution
        panorama = pannellum.viewer(this.panorama, {
            "type": "multires",
            "multiRes": {
                // "basePath": "../../images/AerialView/pannellum/output",
                "basePath": process.env.PUBLIC_URL + "/pannellum/output",
                "path": "/%l/%s%y_%x",
                "fallbackPath": "/fallback/%s",
                "extension": "jpg",
                "tileResolution": 512,
                "maxLevel": 5,
                "cubeResolution": 5208
            }
        })
        
        // Tour
        // panorama = pannellum.viewer(this.panorama, {
        //     // "type": "equirectangular",
        //     // "panorama": require('../../images/AerialView/Pannellum/AreaMainPano.jpg'),
        //     // // "preview": "src",    //預覽圖
        //     "autoLoad": true,

        //     // 預設載入的scene
        //     "default": {
        //         "firstScene": "circle",
        //         "sceneFadeDuration": "1000",
        //     },
        //     // 所有scene
        //     "scenes": {
        //         // 第一個scene
        //         "circle": {
        //             "pitch": 0,
        //             "yaw": 0,
        //             "hfov": 110,
        //             "panorama": require('../../images/SampleRoom/Pannellum/AreaMainPano.jpg'),
        //             "hotSpots": [
        //                 {
        //                     "type": "scene",
        //                     "pitch": 10,
        //                     "yaw": 10,
        //                     "sceneId": "house",
        //                     "cssClass": "circleSceneHotspot1",
        //                 }
        //             ]
        //         },
        //         // 第二個scene
        //         "house": {
        //             "pitch": 0,
        //             "yaw": 0,
        //             "hfov": 110,
        //             "panorama": require('../../images/SampleRoom/Pannellum/AreaMainPano.jpg'),
        //             "hotSpots": [
        //                 {
        //                     "type": "scene",
        //                     "pitch": 20,
        //                     "yaw": 20,
        //                     "sceneId": "circle",
        //                 }
        //             ]
        //         }
        //     }
        // })
    }

    // 按鈕1點擊觸發
    handleButton1Click() {
        console.log(panorama.getYaw());
    }

    render() {
        return (
            <div className="GardenTravelingContainer">

                <button className="button1" onClick={() => this.handleButton1Click()}></button>

                <div className="panorama" ref={self => this.panorama = self}></div>
            </div>
        )
    }
}

export default GardenTraveling;