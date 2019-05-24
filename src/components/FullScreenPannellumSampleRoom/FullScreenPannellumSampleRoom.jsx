import React from 'react';
import './FullScreenPannellumSampleRoom.scss';
import { connect } from 'react-redux';
import { setInitYaw, setInitPitch, updateCurrentPano, updateCurrentPanoImg, closeFullScreenPano, openFullScreenPano } from '../../actions/actions.js';
import PannellumSampleRoom from '../PannellumSampleRoom/PannellumSampleRoom.jsx';
import { Pannellum, PannellumVideo } from 'pannellum-react';
import SampleRoomPano1 from '../../images/SampleRoom/Pannellum/SampleRoomPano1.jpg';
import SampleRoomPano2 from '../../images/SampleRoom/Pannellum/SampleRoomPano2.jpg';

function mapStateToProps(state) {
    return {
        initYaw: state.pannellumSampleRoomReducers.initYaw,
        initPitch: state.pannellumSampleRoomReducers.initPitch,
        currentYaw: state.pannellumSampleRoomReducers.currentYaw,
        currentPitch: state.pannellumSampleRoomReducers.currentPitch,
        currentPano: state.pannellumSampleRoomReducers.currentPano,
        currentPanoImg: state.pannellumSampleRoomReducers.currentPanoImg,
        fullScreenPanoIsShowing: state.pannellumSampleRoomReducers.fullScreenPanoIsShowing,
    }
}

class FullScreenPannellumSampleRoom extends React.Component {

    // 本頁的方法與store內的方法連結
    setInitYaw = (yaw) => {
        this.props.setInitYaw(yaw);
    }
    setInitPitch = (pitch) => {
        this.props.setInitPitch(pitch);
    }
    updateCurrentPano = (currentPano) => {
        this.props.updateCurrentPano(currentPano);
    }
    updateCurrentPanoImg = (currentPanoImg) => {
        this.props.updateCurrentPanoImg(currentPanoImg);
    }
    closeFullScreenPano = () => {
        this.props.closeFullScreenPano();
    }
    openFullScreenPano = () => {
        this.props.openFullScreenPano();
    }

    constructor(props) {
        super(props);
        this.state = {
            mountPannellumSampleRoom: false,
        }
    }

    componentDidUpdate(prevProps) {
        // 監聽全螢幕的顯示狀態，是否變更，若是則執行以下函數
        if (prevProps.fullScreenPanoIsShowing !== this.props.fullScreenPanoIsShowing) {
            console.log("redux-store is changed");
            // 如果從全螢幕->隱藏，延遲兩秒移除DOM PannellumSampleRoom
            // 如果從隱藏->全螢幕，馬上掛載DOM PannellumSampleRoom
            if (this.props.fullScreenPanoIsShowing === false) {
                setTimeout(() => {
                    this.setState({
                        mountPannellumSampleRoom: false,
                    })
                }, 2000);
            } else {
                this.setState({
                    mountPannellumSampleRoom: true,
                })
            }
        };
    }

    handleCloseContainerClick() {
        this.closeFullScreenPano();
    }

    render() {
        return (
            // <div className="fullScreenPannellumSampleRoom active">
            <div className={(this.props.fullScreenPanoIsShowing) ? ("fullScreenPannellumSampleRoom active") : ("fullScreenPannellumSampleRoom")}>

                <div className="closeContainer" onClick={() => this.handleCloseContainerClick()}>
                    <div>Close</div>
                </div>

                {/* 搭配componentDidMount，使全景圖在全螢幕隱藏後兩秒才卸載 */}
                {(this.state.mountPannellumSampleRoom) ? ((
                    <Pannellum
                    width="100%"
                    height="100%"
                    // image={this.state.currentPanoImg}
                    image={SampleRoomPano1}
                    pitch={10}
                    yaw={-95 /* 起始水平視角位置 */}
                    pitch={10 /* 起始垂直視角位置 */}
                    hfov={80 /* 起始視角縮放 */}
                    maxHfov={90}
                    minHfov={60}
                    haov={360 /* 圖片水平寬度 */}
                    vaov={180 /* 圖片垂直寬度 */}
                    compass={false}
                    showZoomCtrl={false}
                    showFullscreenCtrl={false}
                    autoLoad
                    showControls={false}
                    autoRotate={-3}
                    showFullscreenCtrl={true}
                    ref={self => this.Pannellum = self}
                    onTouchend={this.handlePannellumTouchEnd}
                >
                </Pannellum>
                )) : (null)}

            </div>
        )
    }
}

const mapDispatchToProps = {
    setInitYaw, setInitPitch, updateCurrentPano, updateCurrentPanoImg, closeFullScreenPano, openFullScreenPano
}

export default connect(mapStateToProps, mapDispatchToProps)(FullScreenPannellumSampleRoom);