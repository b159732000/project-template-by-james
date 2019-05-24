import React from 'react';
import './PannellumSampleRoom.scss';
import { Pannellum, PannellumVideo } from 'pannellum-react';
import { connect } from 'react-redux';
import SampleRoomPano1 from '../../images/SampleRoom/Pannellum/SampleRoomPano1.jpg';
import SampleRoomPano2 from '../../images/SampleRoom/Pannellum/SampleRoomPano2.jpg';
import { setInitYaw, setInitPitch, updateCurrentPano, updateCurrentPanoImg, closeFullScreenPano, openFullScreenPano } from '../../actions/actions.js';

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


class PannellumSampleRoom extends React.Component {

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
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.handlePannellumTouchEnd = this.handlePannellumTouchEnd.bind(this);
        this.state = {

        }
    }
    componentDidMount() {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('touchmove', this.onTouchMove);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('touchmove', this.onTouchMove);
    }
    onMouseMove() {
        this.updatePointDirectionRotate();
    }
    onTouchMove() {
        this.updatePointDirectionRotate();
    }
    updatePointDirectionRotate() {
        let currentPointDirectionRotate = this.Pannellum.panorama.getYaw() + 180;
        // console.log(currentPointDirectionRotate);
        // this.setState({
        //     pointDirectionTransform: {
        //         transform: "translate(-50%, -50%) rotate(" + currentPointDirectionRotate + "deg)",
        //     }
        // });
        // console.log(this.Pannellum.panorama.getYaw());
        // console.log(this.Pannellum.panorama.getPitch());
    }
    handlePannellumTouchEnd() {
        console.log('touchEnd');
        // this.Pannellum.panorama.toggleFullscreen();
    }

    handleFullScreenIconContainerClick() {
        if (this.props.fullScreenPanoIsShowing) {
            this.closeFullScreenPano();
        } else {
            this.openFullScreenPano();
        }
        console.log("touch success");
    }

    render() {
        return (
            <div className="PannellumSampleRoom">
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
                    // onTouchend={this.handlePannellumTouchEnd}
                >
                </Pannellum>


                <div className={"fullScreenIconContainer"} onClick={()=>this.handleFullScreenIconContainerClick()}>
                    <i className="fas fa-compress"></i>
                </div>


            </div>
        )
    }
}

const mapDispatchToProps = {
    setInitYaw, setInitPitch, updateCurrentPano, updateCurrentPanoImg, closeFullScreenPano, openFullScreenPano
}

export default connect(mapStateToProps, mapDispatchToProps)(PannellumSampleRoom);