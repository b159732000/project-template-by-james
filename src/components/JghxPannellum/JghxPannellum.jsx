import React from 'react';
import './JghxPannellum.scss';

const pannellum = window.pannellum;
var panorama;

class JghxPannellum extends React.Component {
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

    // 創建tooltip (即hotspot上的文字)
    createHotspotTooltip(hotSpotDiv, args) {
        hotSpotDiv.classList.add('custom-tooltip');
        var span = document.createElement('span');
        span.innerHTML = args;
        hotSpotDiv.appendChild(span);
        span.style.width = span.scrollWidth - 20 + 'px';
        span.style.marginLeft = -(span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + 'px';
        span.style.marginTop = -span.scrollHeight - 12 + 'px';
    }

    // 初始化全景圖
    initPanorama() {
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
                "firstScene": "LivingRoom",
                "sceneFadeDuration": "2000",
            },
            // 所有scene
            "scenes": {
                // 一楼客厅
                "LivingRoom": {
                    "type": "multires",
                    "pitch": 0,
                    "yaw": 0,
                    "hfov": 120,
                    // 全景圖來源路徑
                    "multiRes": {
                        "basePath": process.env.PUBLIC_URL + "/pannellum/LivingRoom",
                        "path": "/%l/%s%y_%x",
                        "fallbackPath": "/fallback/%s",
                        "extension": "jpg",
                        "tileResolution": 512,
                        "maxLevel": 4,
                        "cubeResolution": 3176
                    },
                    "hotSpots": [
                        // 客廳通往一樓廁所
                        {
                            "type": "scene",
                            "pitch": -9,
                            "yaw": -117,
                            "sceneId": "FirstFloorBathRoom", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "厕所",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "厕所"
                        },
                        // 客廳通往一樓餐廳
                        {
                            "type": "scene",
                            "pitch": -9,
                            "yaw": -60,
                            "sceneId": "DiningRoom",
                            "cssClass": "circleSceneHotspot1",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "餐厅"
                        },
                        // 客廳通往二楼主卧
                        {
                            "type": "scene",
                            "pitch": -9,
                            "yaw": -96,
                            "sceneId": "SecondFloorMainBedRoom",
                            "cssClass": "circleSceneHotspot1",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "二楼主卧"
                        },
                    ],
                },
                // 一楼厕所
                "FirstFloorBathRoom": {
                    "type": "multires",
                    "pitch": 0,
                    "yaw": -136,
                    "hfov": 90,

                    // 全景圖來源路徑
                    "multiRes": {
                        "basePath": process.env.PUBLIC_URL + "/pannellum/FirstFloorBathRoom",
                        "path": "/%l/%s%y_%x",
                        "fallbackPath": "/fallback/%s",
                        "extension": "jpg",
                        "tileResolution": 512,
                        "maxLevel": 4,
                        "cubeResolution": 3176
                    },
                    "hotSpots": [
                        // 一樓廁所往客厅
                        {
                            "type": "scene",
                            "pitch": -29,
                            "yaw": 73,
                            "sceneId": "LivingRoom", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "客厅",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "客厅"
                        },
                    ],
                },
                // 一楼餐厅
                "DiningRoom": {
                    "type": "multires",
                    "pitch": -10,
                    "yaw": -177,
                    "hfov": 90,
                    // 全景圖來源路徑
                    "multiRes": {
                        "basePath": process.env.PUBLIC_URL + "/pannellum/DiningRoom",
                        "path": "/%l/%s%y_%x",
                        "fallbackPath": "/fallback/%s",
                        "extension": "jpg",
                        "tileResolution": 512,
                        "maxLevel": 4,
                        "cubeResolution": 3176
                    },
                    "hotSpots": [
                        // 一樓餐厅往客厅
                        {
                            "type": "scene",
                            "pitch": -17,
                            "yaw": 158,
                            "sceneId": "LivingRoom", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "客厅",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "客厅"
                        },
                        // 一楼餐厅到一楼厨房
                        {
                            "type": "scene",
                            "pitch": -19,
                            "yaw": -0,
                            "sceneId": "Kitchen",
                            "cssClass": "circleSceneHotspot1",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "厨房"
                        },
                    ],
                },
                // 一楼厨房
                "Kitchen": {
                    "type": "multires",
                    "pitch": 0,
                    "yaw": -180,
                    "hfov": 90,

                    // 全景圖來源路徑
                    "multiRes": {
                        "basePath": process.env.PUBLIC_URL + "/pannellum/Kitchen",
                        "path": "/%l/%s%y_%x",
                        "fallbackPath": "/fallback/%s",
                        "extension": "jpg",
                        "tileResolution": 512,
                        "maxLevel": 4,
                        "cubeResolution": 3176
                    },
                    "hotSpots": [
                        // 一樓厨房往餐厅
                        {
                            "type": "scene",
                            "pitch": -16,
                            "yaw": -180,
                            "sceneId": "DiningRoom", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "餐厅",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "餐厅"
                        },
                    ],
                },
                // 二楼次卧
                "SecondFloorSecondBedRoom": {
                    "type": "multires",
                    "pitch": -8,
                    "yaw": 136,
                    "hfov": 108,
                    // 全景圖來源路徑
                    "multiRes": {
                        "basePath": process.env.PUBLIC_URL + "/pannellum/SecondFloorSecondBedRoom",
                        "path": "/%l/%s%y_%x",
                        "fallbackPath": "/fallback/%s",
                        "extension": "jpg",
                        "tileResolution": 512,
                        "maxLevel": 4,
                        "cubeResolution": 3176
                    },
                    "hotSpots": [
                        // 二楼次卧往二楼主卧
                        {
                            "type": "scene",
                            "pitch": -11,
                            "yaw": -66,
                            "sceneId": "SecondFloorMainBedRoom", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "主卧",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "主卧"
                        },
                        // 二楼次卧往二楼次卫
                        {
                            "type": "scene",
                            "pitch": -9,
                            "yaw": -132,
                            "sceneId": "SecondFloorSecondBathRoom", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "次卫",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "次卫"
                        },
                    ],
                },
                // 二楼主卫
                "SecondFloorMainBathRoom": {
                    "type": "multires",
                    "pitch": -10,
                    "yaw": -177,
                    "hfov": 90,
                    // 全景圖來源路徑
                    "multiRes": {
                        "basePath": process.env.PUBLIC_URL + "/pannellum/SecondFloorMainBathRoom",
                        "path": "/%l/%s%y_%x",
                        "fallbackPath": "/fallback/%s",
                        "extension": "jpg",
                        "tileResolution": 512,
                        "maxLevel": 4,
                        "cubeResolution": 3176
                    },
                    "hotSpots": [
                        // 一樓廁所往客厅
                        {
                            "type": "scene",
                            "pitch": -17,
                            "yaw": 158,
                            "sceneId": "LivingRoom", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "客厅",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "客厅"
                        },
                    ],
                },
                // 二楼次卫
                "SecondFloorSecondBathRoom": {
                    "type": "multires",
                    "pitch": 0,
                    "yaw": -90,
                    "hfov": 120,

                    // 全景圖來源路徑
                    "multiRes": {
                        "basePath": process.env.PUBLIC_URL + "/pannellum/SecondFloorSecondBathRoom",
                        "path": "/%l/%s%y_%x",
                        "fallbackPath": "/fallback/%s",
                        "extension": "jpg",
                        "tileResolution": 512,
                        "maxLevel": 4,
                        "cubeResolution": 3176
                    },
                    "hotSpots": [
                        // 二楼次卫往次卧
                        {
                            "type": "scene",
                            "pitch": -13,
                            "yaw": 150,
                            "sceneId": "SecondFloorSecondBedRoom", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "二楼次卧",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "二楼次卧"
                        },
                        // 二楼次卫往主卧
                        {
                            "type": "scene",
                            "pitch": -13,
                            "yaw": 134,
                            "sceneId": "SecondFloorMainBedRoom", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "二楼主卧",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "二楼主卧"
                        },
                    ],
                },
                // 二楼主卧
                "SecondFloorMainBedRoom": {
                    "type": "multires",
                    "pitch": -10,
                    "yaw": -177,
                    "hfov": 90,
                    // 全景圖來源路徑
                    "multiRes": {
                        "basePath": process.env.PUBLIC_URL + "/pannellum/SecondFloorMainBedRoom",
                        "path": "/%l/%s%y_%x",
                        "fallbackPath": "/fallback/%s",
                        "extension": "jpg",
                        "tileResolution": 512,
                        "maxLevel": 4,
                        "cubeResolution": 3176
                    },
                    "hotSpots": [
                        // 二楼主卧往主卫
                        {
                            "type": "scene",
                            "pitch": -14,
                            "yaw": 26,
                            "sceneId": "SecondFloorMainBathRoom", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "主卫",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "主卫"
                        },
                        // 二楼主卧往次卧
                        {
                            "type": "scene",
                            "pitch": -9,
                            "yaw": 152,
                            "sceneId": "SecondFloorSecondBedRoom", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "二楼次卧",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "二楼次卧"
                        },
                        // 二楼主卧往次卫
                        {
                            "type": "scene",
                            "pitch": -10,
                            "yaw": 162,
                            "sceneId": "SecondFloorSecondBathRoom", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "二楼次卫",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "二楼次卫"
                        },
                        // 二楼主卧往三楼主卧
                        {
                            "type": "scene",
                            "pitch": -10,
                            "yaw": 168,
                            "sceneId": "ThirdFloorMainBedRoom", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "三楼主卧",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "三楼主卧"
                        },
                    ],
                },
                // 三楼厕所
                "ThirdFloorBathRoom": {
                    "type": "multires",
                    "pitch": 0,
                    "yaw": 45,
                    "hfov": 120,

                    // 全景圖來源路徑
                    "multiRes": {
                        "basePath": process.env.PUBLIC_URL + "/pannellum/ThirdFloorBathRoom",
                        "path": "/%l/%s%y_%x",
                        "fallbackPath": "/fallback/%s",
                        "extension": "jpg",
                        "tileResolution": 512,
                        "maxLevel": 4,
                        "cubeResolution": 3176
                    },
                    "hotSpots": [
                        // 三楼主卫到衣帽间
                        {
                            "type": "scene",
                            "pitch": -17,
                            "yaw": -180,
                            "sceneId": "ThridFloorCloadRoom", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "衣帽间",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "衣帽间"
                        },
                    ],
                },
                // 三楼主卧
                "ThirdFloorMainBedRoom": {
                    "type": "multires",
                    "pitch": -8,
                    "yaw": -119,
                    "hfov": 90,

                    // 全景圖來源路徑
                    "multiRes": {
                        "basePath": process.env.PUBLIC_URL + "/pannellum/ThirdFloorMainBedRoom",
                        "path": "/%l/%s%y_%x",
                        "fallbackPath": "/fallback/%s",
                        "extension": "jpg",
                        "tileResolution": 512,
                        "maxLevel": 4,
                        "cubeResolution": 3176
                    },
                    "hotSpots": [
                        // 三楼主卧往三楼书房
                        {
                            "type": "scene",
                            "pitch": -13,
                            "yaw": -64,
                            "sceneId": "ThirdFloorStudy", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "三楼书房",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "三楼书房"
                        },
                        // 三楼主卧往三楼衣帽间
                        {
                            "type": "scene",
                            "pitch": -13,
                            "yaw": -74,
                            "sceneId": "ThridFloorCloadRoom", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "三楼衣帽间",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "三楼衣帽间"
                        },
                    ],
                },
                // 三楼书房
                "ThirdFloorStudy": {
                    "type": "multires",
                    "pitch": -16,
                    "yaw": 31,
                    "hfov": 90,

                    // 全景圖來源路徑
                    "multiRes": {
                        "basePath": process.env.PUBLIC_URL + "/pannellum/ThirdFloorStudy",
                        "path": "/%l/%s%y_%x",
                        "fallbackPath": "/fallback/%s",
                        "extension": "jpg",
                        "tileResolution": 512,
                        "maxLevel": 4,
                        "cubeResolution": 3176
                    },
                    "hotSpots": [
                        // 三楼书房往主卧
                        {
                            "type": "scene",
                            "pitch": -15,
                            "yaw": -5,
                            "sceneId": "ThirdFloorMainBedRoom", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "主卧",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "主卧"
                        },
                        // 三楼书房往衣帽间
                        {
                            "type": "scene",
                            "pitch": -15,
                            "yaw": 4,
                            "sceneId": "ThridFloorCloadRoom", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "衣帽间",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "衣帽间"
                        },
                    ],
                },
                // 三楼衣帽间
                "ThridFloorCloadRoom": {
                    "type": "multires",
                    "pitch": 0,
                    "yaw": -90,
                    "hfov": 120,

                    // 全景圖來源路徑
                    "multiRes": {
                        "basePath": process.env.PUBLIC_URL + "/pannellum/ThridFloorCloadRoom",
                        "path": "/%l/%s%y_%x",
                        "fallbackPath": "/fallback/%s",
                        "extension": "jpg",
                        "tileResolution": 512,
                        "maxLevel": 4,
                        "cubeResolution": 3176
                    },
                    "hotSpots": [
                        // 三楼衣帽间往三楼书房
                        {
                            "type": "scene",
                            "pitch": -17,
                            "yaw": 158,
                            "sceneId": "ThirdFloorStudy", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "三楼书房",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "三楼书房"
                        },
                        // 三楼衣帽间往三楼主卧
                        {
                            "type": "scene",
                            "pitch": -17,
                            "yaw": -158,
                            "sceneId": "ThirdFloorMainBedRoom", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "三楼主卧",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "三楼主卧"
                        },
                        // 三楼衣帽间往三楼主卫
                        {
                            "type": "scene",
                            "pitch": -17,
                            "yaw": 0,
                            "sceneId": "ThirdFloorBathRoom", //通往下一个全景图
                            "cssClass": "circleSceneHotspot1",
                            "text": "三楼主卫",
                            "clickHandlerFunc": function () { console.log("success") },    //滑鼠點擊時觸發，觸控不觸發
                            "createTooltipFunc": this.createHotspotTooltip,
                            "createTooltipArgs": "三楼主卫"
                        },
                    ],
                },
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
            <div className="JghxPannellumContainer">

                {/*<button className="button1" onClick={() => this.handleButton1Click()}></button>*/}

                <div className="panorama" ref={self => this.panorama = self}></div>
            </div>
        )
    }
}

export default JghxPannellum;