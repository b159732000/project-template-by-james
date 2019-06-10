import React from 'react';
import './GardenTraveling.scss';

const pannellum = window.pannellum;
var panorama;

class GardenTraveling extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        // handleHotSpotClick = function () {
        //     console.log("success");
        // };
        this.initPanorama();    // 初始化全景圖
    }

    // 初始化全景圖
    initPanorama() {
        // Multiresolution
        // panorama = pannellum.viewer(this.panorama, {
        //     "type": "multires",
        //     "multiRes": {
        //         // "basePath": "../../images/AerialView/pannellum/output",
        //         "basePath": process.env.PUBLIC_URL + "/pannellum/output",
        //         "path": "/%l/%s%y_%x",
        //         "fallbackPath": "/fallback/%s",
        //         "extension": "jpg",
        //         "tileResolution": 512,
        //         "maxLevel": 5,
        //         "cubeResolution": 5208
        //     }
        // })

        // Tour + Multiresolution
        panorama = pannellum.viewer(this.panorama, {
            // "type": "equirectangular",
            // "panorama": require('../../images/AerialView/Pannellum/AreaMainPano.jpg'),
            // // "preview": "src",    //預覽圖
            "autoLoad": true,
            "showControls": false,
            "hotSpotDebug": true,
            // 預設載入的scene
            "default": {
                "firstScene": "circle",
                "sceneFadeDuration": "2000",
            },
            // 所有scene
            "scenes": {
                // 第一個scene
                "circle": {
                    "type": "multires",
                    "pitch": 0,
                    "yaw": 0,
                    "hfov": 60,
                    // "panorama": require('../../images/SampleRoom/Pannellum/AreaMainPano.jpg'),
                    "hotSpots": [
                        {
                            "type": "scene",
                            "pitch": 10,
                            "yaw": 10,
                            "sceneId": "house",
                            "cssClass": "circleSceneHotspot1",
                            // "createTooltipFunc": function() {console.log("success")},   //這個hotspot被渲染時觸發
                            "clickHandlerFunc": function() {console.log("success")},    //滑鼠點擊時觸發，觸控不觸發
                        }
                    ],
                    // 全景圖來源路徑
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
                },
                // 第二個scene
                "house": {
                    "type": "multires",
                    "pitch": 30,
                    "yaw": 30,
                    "hfov": 80,
                    "panorama": require('../../images/SampleRoom/Pannellum/AreaMainPano.jpg'),
                    "hotSpots": [
                        {
                            "type": "scene",
                            "pitch": 20,
                            "yaw": 20,
                            "sceneId": "circle",
                        }
                    ],
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
                }
            }
        })

        // // Listener, 當scene變換時觸發
        // pannellum.on('scenechange', function () {
        // })
    }

    // 按鈕1點擊觸發
    handleButton1Click() {
        console.log(panorama.getYaw());
    }



    render() {
        return (
            <div className="GardenTravelingContainer">

                {/*<button className="button1" onClick={() => this.handleButton1Click()}></button>*/}

                <div className="panorama" ref={self => this.panorama = self}></div>
            </div>
        )
    }
}

export default GardenTraveling;