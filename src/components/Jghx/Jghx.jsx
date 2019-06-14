import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeSelectedSecondHouseStyle } from '../../actions/actions.js';
import './Jghx.scss';

// 將接收到的state(包含在store內)放為本頁的state
function mapStateToProps(state) {
    return {
        jghxSelectedSecondHouseStyle: state.jghxReducers.jghxSelectedSecondHouseStyle,  //表示此次選擇的子戶型 (MountainMoon, MountainRiver, A, B, C)
    }
}

class Jghx extends React.Component {

    changeSelectedSecondHouseStyle = (selectedSecondHouseStyle) => {
        this.props.changeSelectedSecondHouseStyle(selectedSecondHouseStyle);
    }

    constructor(props) {
        super(props);
        this.state = {
            topTextPositionerClassName: "MountainMoon ",     ///更換頂部說明文字 (更改className)
            currentHouseStyle: "Villa",     //別墅or高樓 (Villa, Building)
            currentSecondHouseStyle: "MountainMoon",     //山月院、山河院、A、B、C (MountainMoon, MountainRiver, A, B, C)
            linkToDirection: "/james/project-template-by-james/MountainMoon",  //點擊畫面中間圖片時LinkTo的路徑，依照currentSecondHouseStyle決定，預設導航到山月院
        }
    }

    // 上排Menu點擊觸發
    handleHouseStyleClick(selectedHouseStyle) {
        this.changeHouseStyle(selectedHouseStyle);
    }

    // 下排Menu點擊觸發
    handleSecondHouseStyleClick(selectedSecondHouseStyle) {
        this.changeSecondHouseStyle(selectedSecondHouseStyle);
    }

    // 更換別墅or高樓 (state.currentHouseStyle)
    changeHouseStyle(selectedHouseStyle) {
        // 如果發生更換別墅或高樓，則將子戶型切換到預設(山月院、A)
        if (selectedHouseStyle !== this.state.currentHouseStyle) {
            switch (selectedHouseStyle) {
                case "Villa":
                    this.setState({
                        currentHouseStyle: selectedHouseStyle
                    }, () => this.changeSecondHouseStyle("MountainMoon"));
                    break;
                case "Building":
                    this.setState({
                        currentHouseStyle: selectedHouseStyle
                    }, () => this.changeSecondHouseStyle("A"));
                    break;
                default:
                    break;
            }
        }

        // 更換成選取的別墅、高樓
        this.setState({
            currentHouseStyle: selectedHouseStyle
        })
    }

    // 更換山月院、山河院、A、B、C (state.currentSecondHouseStyle)，同時更新別墅or高樓 (Villa, Building)，並更新redux-store此次選取的子戶型
    changeSecondHouseStyle(selectedSecondHouseStyle) {
        switch (selectedSecondHouseStyle) {
            case "MountainMoon":
                this.setState({
                    currentSecondHouseStyle: "MountainMoon",
                    currentHouseStyle: "Villa"
                }, () => this.handleSedondHouseStyleChange());
                break;
            case "MountainRiver":
                this.setState({
                    currentSecondHouseStyle: "MountainRiver",
                    currentHouseStyle: "Villa"
                }, () => this.handleSedondHouseStyleChange());
                break;
            case "A":
                this.setState({
                    currentSecondHouseStyle: "A",
                    currentHouseStyle: "Building"
                }, () => this.handleSedondHouseStyleChange());
                break;
            case "B":
                this.setState({
                    currentSecondHouseStyle: "B",
                    currentHouseStyle: "Building"
                }, () => this.handleSedondHouseStyleChange());
                break;
            case "C":
                this.setState({
                    currentSecondHouseStyle: "C",
                    currentHouseStyle: "Building"
                }, () => this.handleSedondHouseStyleChange());
                break;
            default:
                break;
        }
        // 更新store
        this.changeSelectedSecondHouseStyle(selectedSecondHouseStyle);
    }

    //當子Menu(螢幕底部)選取項目改變時觸發
    handleSedondHouseStyleChange() {
        this.changeUpperText();     //更換頂部說明文字
        this.updateMiddleMapLinkToDirection();     //更新中間地圖點擊時，LinkTo的路徑
    }

    //更換頂部說明文字
    changeUpperText() {
        switch (this.state.currentSecondHouseStyle) {
            case "MountainMoon":
                this.setState({
                    topTextPositionerClassName: "MountainMoon"
                })
                break;
            case "MountainRiver":
                this.setState({
                    topTextPositionerClassName: "MountainRiver"
                })
                break;
            case "A":
                this.setState({
                    topTextPositionerClassName: "A"
                })
                break;
            case "B":
                this.setState({
                    topTextPositionerClassName: "B"
                })
                break;
            case "C":
                this.setState({
                    topTextPositionerClassName: "C"
                })
                break;
            default:
                break;
        }
    }

    // 更新中間地圖點擊時，LinkTo的路徑
    updateMiddleMapLinkToDirection() {
        switch (this.state.currentSecondHouseStyle) {
            case "MountainMoon":
                this.setState({
                    linkToDirection: "/james/project-template-by-james/MountainMoon"
                })
                break;
            case "MountainRiver":
                this.setState({
                    linkToDirection: "/james/project-template-by-james/MountainRiver"
                })
                break;
            case "A":
                this.setState({
                    linkToDirection: "/james/project-template-by-james/JghxBuilding"
                })
                break;
            case "B":
                this.setState({
                    linkToDirection: "/james/project-template-by-james/JghxBuilding"
                })
                break;
            case "C":
                this.setState({
                    linkToDirection: "/james/project-template-by-james/JghxBuilding"
                })
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className="JghxContainer">

                {/* 內容容器，定義上方及左右側邊距 */}
                <div className="innerContainer">

                    {/* 頂部文字定位容器 */}
                    <div className={"topTextPositioner " + this.state.topTextPositionerClassName} ref={self => this.topTextPositioner = self}></div>

                    {/* 中間圖片定位容器 */}
                    <Link to={this.state.linkToDirection} className="middleMapPositioner">
                        {/* 地圖容器 */}
                        <div className="mapSelf">
                            {/* 背景圖 */}
                            <img className="middleMapBg" src={require('../../images/Jghx/LocationMap.png')} alt="" />
                            {/* 手指標示 */}
                            <img className="fingerImg" src={require('../../images/Jghx/Finger.png')} alt=""/>
                            {/* 覆蓋的圖層山月院 */}
                            <img className={(this.state.currentSecondHouseStyle === "MountainMoon") ? ("locationCover MountainMoonMapCover") : ("locationCover MountainMoonMapCover hidden")} src={require('../../images/Jghx/MapCover/MountainMoonMapCover.png')} alt="" />
                            {/* <img className="locationCover MountainMoonMapCover" src={require('../../images/Jghx/MapCover/MountainMoonMapCover.png')} alt="" /> */}
                            {/* 覆蓋的圖層山河院 */}
                            <img className={(this.state.currentSecondHouseStyle === "MountainRiver") ? ("locationCover MountainRiverMapCover") : ("locationCover MountainRiverMapCover hidden")} src={require('../../images/Jghx/MapCover/MountainRiverMapCover.png')} alt="" />
                            {/* 覆蓋的圖層A */}
                            <img className={(this.state.currentSecondHouseStyle === "A") ? ("locationCover BuildingAMapCover") : ("locationCover BuildingAMapCover hidden")} src={require('../../images/Jghx/MapCover/BuildingAMapCover.png')} alt="" />
                            {/* 覆蓋的圖層B */}
                            <img className={(this.state.currentSecondHouseStyle === "B") ? ("locationCover BuildingBMapCover") : ("locationCover BuildingBMapCover hidden")} src={require('../../images/Jghx/MapCover/BuildingBMapCover.png')} alt="" />
                            {/* 覆蓋的圖層C */}
                            <img className={(this.state.currentSecondHouseStyle === "C") ? ("locationCover BuildingCMapCover") : ("locationCover BuildingCMapCover hidden")} src={require('../../images/Jghx/MapCover/BuildingCMapCover.png')} alt="" />
                        </div>
                    </Link>

                    {/* 底部按鈕定位容器 (於頁面的垂直位置) */}
                    <div className="bottomButtonPositioner">

                        {/* 上排按鈕容器 (設為Flex,用來水平置中按鈕) */}
                        <div className="upper">

                            {/* 按鈕組 */}
                            <div className="buttonGroup">
                                <div className="btn Left" onClick={() => this.handleHouseStyleClick("Villa")}>
                                    <img className={(this.state.currentHouseStyle === "Villa") ? ("btnBg") : ("btnBg notActive")} src={require('../../images/Jghx/btn/ValleyAndHigh/DownLeft.png')} alt="" />
                                    <img className="btnText" src={require('../../images/Jghx/btn/ValleyAndHigh/Villa.png')} alt="" />
                                </div>
                                <div className="btn Right" onClick={() => this.handleHouseStyleClick("Building")}>
                                    <img className={(this.state.currentHouseStyle === "Building") ? ("btnBg") : ("btnBg notActive")} src={require('../../images/Jghx/btn/ValleyAndHigh/DownRight.png')} alt="" />
                                    <img className="btnText" src={require('../../images/Jghx/btn/ValleyAndHigh/Building.png')} alt="" />
                                </div>
                            </div>

                        </div>

                        {/* 下排按鈕 */}
                        <div className="bottom">

                            {/* <div className="left"> */}
                            <div className={(this.state.currentHouseStyle === "Villa") ? ("left") : ("left hidden")}>
                                {/* 按鈕組 */}
                                <div className="buttonGroup groupLeft">
                                    {/* 山月院 */}
                                    <div to="/james/project-template-by-james/MountainMoon" className="btn Left" onClick={() => this.handleSecondHouseStyleClick("MountainMoon")}>
                                        <img className={(this.state.currentSecondHouseStyle === "MountainMoon") ? ("btnBg") : ("btnBg notActive")} src={require('../../images/Jghx/btn/Villa/DownLeft.png')} alt="" />
                                        <img className="btnText" src={require('../../images/Jghx/btn/Villa/MountainMoon.png')} alt="" />
                                    </div>
                                    {/* 山河院 */}
                                    <div to="/james/project-template-by-james/MountainRiver" className="btn Right" onClick={() => this.handleSecondHouseStyleClick("MountainRiver")}>
                                        <img className={(this.state.currentSecondHouseStyle === "MountainRiver") ? ("btnBg") : ("btnBg notActive")} src={require('../../images/Jghx/btn/Villa/DownRight.png')} alt="" />
                                        <img className="btnText" src={require('../../images/Jghx/btn/Villa/MountainRiver.png')} alt="" />
                                    </div>
                                </div>
                            </div>

                            {/* <div className="right"> */}
                            <div className={(this.state.currentHouseStyle === "Building") ? ("right") : ("right hidden")}>
                                {/* 按鈕組 */}
                                <div className="buttonGroup groupRight">
                                    {/* A */}
                                    <div to="/james/project-template-by-james/JghxBuilding" className="btn Left" onClick={() => this.handleSecondHouseStyleClick("A")}>
                                        <img className={(this.state.currentSecondHouseStyle === "A") ? ("btnBg") : ("btnBg notActive")} src={require('../../images/Jghx/btn/Building/DownLeft.png')} alt="" />
                                        <img className="btnText" src={require('../../images/Jghx/btn/Building/A.png')} alt="" />
                                    </div>
                                    {/* B */}
                                    <div to="/james/project-template-by-james/JghxBuilding" className="btn Center" onClick={() => this.handleSecondHouseStyleClick("B")}>
                                        <img className={(this.state.currentSecondHouseStyle === "B") ? ("btnBg") : ("btnBg notActive")} src={require('../../images/Jghx/btn/Building/DownCenter.png')} alt="" />
                                        <img className="btnText" src={require('../../images/Jghx/btn/Building/B.png')} alt="" />
                                    </div>
                                    {/* C */}
                                    <div to="/james/project-template-by-james/JghxBuilding" className="btn Right" onClick={() => this.handleSecondHouseStyleClick("C")}>
                                        <img className={(this.state.currentSecondHouseStyle === "C") ? ("btnBg") : ("btnBg notActive")} src={require('../../images/Jghx/btn/Building/DownRight.png')} alt="" />
                                        <img className="btnText" src={require('../../images/Jghx/btn/Building/C.png')} alt="" />
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

const mapDispatchToProps = {
    changeSelectedSecondHouseStyle,
}

export default connect(mapStateToProps, mapDispatchToProps)(Jghx);