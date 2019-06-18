import React from 'react';
import './JghxPannellum.scss';
import { Link } from 'react-router-dom';

const pannellum = window.pannellum;
var panorama;

class JghxPannellum extends React.Component {
    constructor(props) {
        super(props);
        this.JghxPannellumRequestAnimationFrameID = null;     //提供掛載/卸載requestAnimationFrame的ID
        this.doWithEachFrame = this.doWithEachFrame.bind(this);     //每一影格更新一次的函數bind(this)
        this.lastFrameRoom = null;     //上一禎的房間
        this.lastFramFloor = null;     //上一禎的樓層
        this.currentYaw = 180;      //小地圖視角 (供小地圖視角方向讀取；在每一影格更新時設定為最新值)
        this.state = {

            // 全景圖資訊
            currentRoom: 'LivingRoom',        // 目前的房間 (唯讀)
            currentFloor: 1,                  // 目前的樓層 (唯讀)

            // 小地圖
            smallMapSrc: require('../../images/Jghx/Pannellum/1f.png'),    //小地圖圖片檔
            smallMapPointDirectionCompensate: 0,                           //小地圖視角補償角度
            pointDirectionTransform: {                                     //小地圖視角的css
                transform: "translate(-50%, -50%) rotate(" + this.currentYaw + "deg)",
            }

        }
    }

    componentDidMount() {
        // handleHotSpotClick = function () {
        //     console.log("success");
        // };
        this.initPanorama();    // 初始化全景圖
        if (this.JghxPannellumRequestAnimationFrameID === null) {
            this.JghxPannellumRequestAnimationFrameID = window.requestAnimationFrame(this.doWithEachFrame);
        }
    }
    componentWillUnmount() {
        if (this.JghxPannellumRequestAnimationFrameID !== null) {
            window.cancelAnimationFrame(this.JghxPannellumRequestAnimationFrameID);
            this.JghxPannellumRequestAnimationFrameID = null;
        }
    }

    // 每一影格更新一次
    doWithEachFrame() {
        // 重複循環此函數
        this.JghxPannellumRequestAnimationFrameID = requestAnimationFrame(this.doWithEachFrame);

        // 更新小地圖視角方向
        // 取得目前視角方向存在變數currentYaw，並確保為正數且四捨五入
        // 之後加上補償角度後設定進state的小地圖視角圖示css中
        this.currentYaw = Math.round(panorama.getYaw() + 180);
        let afterFixCurrentYaw = this.currentYaw + this.state.smallMapPointDirectionCompensate;
        this.setState({
            pointDirectionTransform: {
                transform: "translate(-50%, -50%) rotate(" + afterFixCurrentYaw + "deg)",
            }
        })

        // 更換state中的目前樓層資訊
        this.getCurrentFloorThenSetToState();
        // 更換state中的目前房間資訊
        this.getCurrentRoomThenSetToState();
        // 檢驗房間是否發生更換，若有就會執行以下程式的內容
        this.handleRoomChange();
        this.handleFloorChange();

        // 暫存目前的房間和樓層，方便下一禎比對是否發生變化
        this.lastFrameRoom = this.state.currentRoom;
        this.lastFramFloor = this.state.currentFloor;
    }

    // 如果發生房間更換時觸發
    // 觸發: 更新小地圖視角補償角度
    handleRoomChange() {
        if (this.state.currentRoom !== this.lastFrameRoom) {
            console.log('room is changed');
        }
    }

    // 如果發生房間更換時觸發
    // 觸發: 更新小地圖圖檔
    handleFloorChange() {
        if (this.state.currentFloor !== this.lastFramFloor) {
            switch (this.state.currentFloor) {
                case 1:
                    this.setState({
                        smallMapSrc: require('../../images/Jghx/Pannellum/1f.png'),
                    })
                    break;
                case 2:
                    this.setState({
                        smallMapSrc: require('../../images/Jghx/Pannellum/2f.png'),
                    })
                    break;
                case 3:
                    this.setState({
                        smallMapSrc: require('../../images/Jghx/Pannellum/3f.png'),
                    })
                    break;
                default:
                    break;
            }
        }
    }

    // 更換state中的目前樓層資訊
    getCurrentFloorThenSetToState() {

        // 透過讀取目前房間為何，計算目前所在的樓層
        let currentFloor;
        switch (panorama.getScene().toString()) {
            // 一楼客厅
            case "LivingRoom":
                currentFloor = 1;
                break;
            // 一楼厕所
            case "FirstFloorBathRoom":
                currentFloor = 1;
                break;
            // 一楼餐厅
            case "DiningRoom":
                currentFloor = 1;
                break;
            // 一楼厨房
            case "Kitchen":
                currentFloor = 1;
                break;
            // 二楼次卧
            case "SecondFloorSecondBedRoom":
                currentFloor = 2;
                break;
            // 二楼主卫
            case "SecondFloorMainBathRoom":
                currentFloor = 2;
                break;
            // 二楼次卫
            case "SecondFloorSecondBathRoom":
                currentFloor = 2;
                break;
            // 二楼主卧
            case "SecondFloorMainBedRoom":
                currentFloor = 2;
                break;
            // 三楼厕所
            case "ThirdFloorBathRoom":
                currentFloor = 3;
                break;
            // 三楼主卧
            case "ThirdFloorMainBedRoom":
                currentFloor = 3;
                break;
            // 三楼书房
            case "ThirdFloorStudy":
                currentFloor = 3;
                break;
            // 三楼衣帽间
            case "ThridFloorCloadRoom":
                currentFloor = 3;
                break;
            default:
                break;
        }

        // 將目前所在樓層放入state中
        this.setState({
            currentFloor: currentFloor,
        }, () => console.log(this.state.currentFloor));

    }

    // 更換state中的目前房間資訊
    getCurrentRoomThenSetToState() {
        this.setState({
            currentRoom: panorama.getScene().toString(),
        }, () => console.log(this.state.currentRoom));
    }

    // 跳轉到特定全景圖
    changeActiveRoomTo(selectedRoom) {
        panorama.loadScene(selectedRoom);
    }

    // 跳轉到特定樓層
    changeFloorTo(selectedFloor) {
        switch (selectedFloor) {
            case 1:
                this.changeActiveRoomTo('LivingRoom');
                break;
            case 2:
                this.changeActiveRoomTo('SecondFloorMainBedRoom');
                break;
            case 3:
                this.changeActiveRoomTo('ThirdFloorMainBedRoom');
                break;
            default:
                break;
        }
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
            "hotSpotDebug": false,
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
                    "hfov": 100,
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

    // 點擊小地圖紅點觸發
    handleSmallMapIconClick(selectedRoom) {
        this.changeActiveRoomTo(selectedRoom);
    }

    render() {
        return (
            <div className="JghxPannellumContainer">

                {/*<button className="button1" onClick={() => this.handleButton1Click()}></button>*/}

                <div className="panorama" ref={self => this.panorama = self}></div>

                {/* 小地圖 */}
                <div className="smallMapContainer">
                    <div className="imgContainer">
                        <img src={(this.state.smallMapSrc)} alt="" />
                    </div>
                    {/* 小地圖紅點及視角 */}
                    <div className="pointContainer">
                        {/* 一樓紅點*4 */}
                        <div className={(this.state.currentFloor === 1) ? ("point LivingRoom") : ("point LivingRoom noDisplay")} onClick={() => this.handleSmallMapIconClick("LivingRoom")}></div> {/* 次臥 */}
                        <div className={(this.state.currentFloor === 1) ? ("point FirstFloorBathRoom") : ("point FirstFloorBathRoom noDisplay")} onClick={() => this.handleSmallMapIconClick("FirstFloorBathRoom")}></div> {/* 次臥 */}
                        <div className={(this.state.currentFloor === 1) ? ("point DiningRoom one") : ("point DiningRoom noDisplay")} onClick={() => this.handleSmallMapIconClick("DiningRoom")}></div> {/* 次臥 */}
                        <div className={(this.state.currentFloor === 1) ? ("point Kitchen") : ("point Kitchen noDisplay")} onClick={() => this.handleSmallMapIconClick("Kitchen")}></div> {/* 次臥 */}
                        {/* 二樓紅點*4 */}
                        <div className={(this.state.currentFloor === 2) ? ("point SecondFloorSecondBedRoom") : ("point SecondFloorSecondBedRoom noDisplay")} onClick={() => this.handleSmallMapIconClick("SecondFloorSecondBedRoom")}></div> {/* 次臥 */}
                        <div className={(this.state.currentFloor === 2) ? ("point SecondFloorMainBathRoom") : ("point SecondFloorMainBathRoom noDisplay")} onClick={() => this.handleSmallMapIconClick("SecondFloorMainBathRoom")}></div> {/* 次臥 */}
                        <div className={(this.state.currentFloor === 2) ? ("point SecondFloorSecondBathRoom") : ("point SecondFloorSecondBathRoom noDisplay")} onClick={() => this.handleSmallMapIconClick("SecondFloorSecondBathRoom")}></div> {/* 次臥 */}
                        <div className={(this.state.currentFloor === 2) ? ("point SecondFloorMainBedRoom") : ("point SecondFloorMainBedRoom noDisplay")} onClick={() => this.handleSmallMapIconClick("SecondFloorMainBedRoom")}></div> {/* 次臥 */}
                        {/* 三樓紅點*4 */}
                        <div className={(this.state.currentFloor === 3) ? ("point ThirdFloorBathRoom") : ("point ThirdFloorBathRoom noDisplay")} onClick={() => this.handleSmallMapIconClick("ThirdFloorBathRoom")}></div> {/* 次臥 */}
                        <div className={(this.state.currentFloor === 3) ? ("point ThirdFloorMainBedRoom") : ("point ThirdFloorMainBedRoom noDisplay")} onClick={() => this.handleSmallMapIconClick("ThirdFloorMainBedRoom")}></div> {/* 次臥 */}
                        <div className={(this.state.currentFloor === 3) ? ("point ThirdFloorStudy") : ("point ThirdFloorStudy noDisplay")} onClick={() => this.handleSmallMapIconClick("ThirdFloorStudy")}></div> {/* 次臥 */}
                        <div className={(this.state.currentFloor === 3) ? ("point ThridFloorCloadRoom") : ("point ThridFloorCloadRoom noDisplay")} onClick={() => this.handleSmallMapIconClick("ThridFloorCloadRoom")}></div> {/* 次臥 */}
                        {/* 紅點旋轉方向 */}
                        <div className={"pointDirection" + " " + this.state.currentRoom} style={this.state.pointDirectionTransform}></div>
                    </div>
                </div>

                {/* 樓層按鈕 */}
                <div className="floorMenuContainer">
                    {/* 三樓 */}
                    <div className="iconContainer thridFloor" onClick={() => this.changeFloorTo(3)}>
                        {/* 啟用狀態鈕 (為本樓層時顯示) */}
                        <img className={(this.state.currentFloor === 3) ? ("") : ("hidden")} src={require('../../images/Jghx/Pannellum/btn/down/3F.png')} alt="" />
                        {/* 非啟用狀態鈕 (非本樓層時顯示) */}
                        <img className={(this.state.currentFloor === 3) ? ("hidden") : ("")} src={require('../../images/Jghx/Pannellum/btn/up/3F.png')} alt="" />
                    </div>
                    {/* 二樓 */}
                    <div className="iconContainer secondFloor" onClick={() => this.changeFloorTo(2)}>
                        {/* 啟用狀態鈕 (為本樓層時顯示) */}
                        <img className={(this.state.currentFloor === 2) ? ("") : ("hidden")} src={require('../../images/Jghx/Pannellum/btn/down/2F.png')} alt="" />
                        {/* 非啟用狀態鈕 (非本樓層時顯示) */}
                        <img className={(this.state.currentFloor === 2) ? ("hidden") : ("")} src={require('../../images/Jghx/Pannellum/btn/up/2F.png')} alt="" />
                    </div>
                    {/* 一樓 */}
                    <div className="iconContainer firstFloor" onClick={() => this.changeFloorTo(1)}>
                        {/* 啟用狀態鈕 (為本樓層時顯示) */}
                        <img className={(this.state.currentFloor === 1) ? ("") : ("hidden")} src={require('../../images/Jghx/Pannellum/btn/down/1F.png')} alt="" />
                        {/* 非啟用狀態鈕 (非本樓層時顯示) */}
                        <img className={(this.state.currentFloor === 1) ? ("hidden") : ("")} src={require('../../images/Jghx/Pannellum/btn/up/1F.png')} alt="" />
                    </div>
                </div>

                {/* 返回鈕 */}
                <div className="backButtonContainer">
                    <Link to="/james/project-template-by-james/MountainMoon" className="backToMountainMoonButtonLink">
                        <img className="backToMountainMoonButton" src={require('../../images/Jghx/Pannellum/btn/Back.png')} alt="" />
                    </Link>
                </div>

            </div>
        )
    }
}

export default JghxPannellum;