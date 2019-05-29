import React from 'react';
import './Qwzs.scss';
import { connect } from 'react-redux';
import { updateChoiceListX, updateChoiceListY } from '../../actions/actions.js';
import { Link } from 'react-router-dom';
import HouseModel3D from '../HouseModel3D/HouseModel3D.jsx';    // 小房子3D模型 (從Sketchfab來的)
import Parallax from 'parallax-js';

var parallaxScene1, parallaxScene2, parallaxScene3, parallaxScene4, parallaxScene5, parallaxInstance1, parallaxInstance2, parallaxInstance3, parallaxInstance4, parallaxInstance5;

// 用this.props讀取Store的值
function mapStateToProps(state) {
    return {
        choiceListX: state.bgStrokeTextPositionReducers.choiceListX,
        choiceListY: state.bgStrokeTextPositionReducers.choiceListY,
    }
}

class Qwzs extends React.Component {

    // componentDidAppear() {
    //     console.log('QwzsComponentDidAppear');
    // }
    // componentDidEnter() {
    //     console.log('TodoList componentDidEnter')
    // }
    // componentWillAppear(cb) {
    //     console.log('TodoList componentWillAppear')
    //     setTimeout(cb, 500)
    //   }
    //   componentDidAppear() {
    //     console.log('TodoList componentDidAppear')
    //   }
    //   componentWillEnter(cb) {
    //     console.log('TodoList componentWillEnter')
    //     setTimeout(cb, 500)
    //   }
    //   componentDidEnter() {
    //     console.log('TodoList componentDidEnter')
    //   }
    //   componentWillLeave(cb) {
    //     console.log('TodoList componentWillLeave')
    //     cb()
    //   }
    //   componentDidLeave() {
    //     console.log('TodoList componentDidLeave')
    //   }

    updateChoiceListX = (choiceListX) => {
        this.props.updateChoiceListX(choiceListX);
    }
    updateChoiceListY = (choiceListY) => {
        this.props.updateChoiceListY(choiceListY);
    }

    constructor(props) {
        super(props)
        // 用this.state讀取此State的值
        this.state = {
            choiceListX: null,     //choiceList超出預設位置左邊的距離 = choiceList往左捲動的距離
            choiceListY: null,     //choiceList距離頂部的距離
            choiceListUlWidth: null,   //choiceListUl內容物的總寬度
            choiceListUlContainerWidth: null,   //choiceListUl顯示在螢幕中的寬度 (= 用來計算不能算進捲動距離的寬度)
            choiceListScrollPercentage: null,   //choiceList捲動的距離百分比
            BgTextCouldMoveDistance: null,      //背景簍空字可以移動的距離
            windowInnerWidth: null,     //瀏覽器內頁面可用寬度 (扣掉瀏覽器工具列後實際可用)
            bgStrokeTextMovableDistance: null,      //背景鏤空字可移動距離
            bgStrokeTextWidth: null,   // 簍空字寬度
            bgStrokeTextContainerStyleTransform: { transform: "translate(-2.5vw, 0)" },
            listImgIsSelecting: 0,  //正在選取第幾個清單，0代表沒有選取的清單
        }
    }

    componentDidMount() {
        parallaxScene1 = this.refs.parallaxScene1;
        parallaxScene2 = this.refs.parallaxScene2;
        parallaxScene3 = this.refs.parallaxScene3;
        parallaxScene4 = this.refs.parallaxScene4;
        parallaxScene5 = this.refs.parallaxScene5;
        parallaxInstance1 = new Parallax(parallaxScene1, {
            relativeInput: true,
            hoverOnly: true,    //只有滑鼠滑過時才有特效，當有陀螺儀此選項不起作用
            frictionX: 0.8,
            frictionY: 0.8,
            scalarX: 20.4,   //移動的靈敏度
            scalarY: 20.4,   //移動的靈敏度
        });
        parallaxInstance2 = new Parallax(parallaxScene2, {
            relativeInput: true,
            hoverOnly: true,    //只有滑鼠滑過時才有特效，當有陀螺儀此選項不起作用
            frictionX: 0.9,
            frictionY: 0.9,
            scalarX: 20.4,   //移動的靈敏度
            scalarY: 20.4,   //移動的靈敏度
        });
        parallaxInstance3 = new Parallax(parallaxScene3, {
            relativeInput: true,
            hoverOnly: true,    //只有滑鼠滑過時才有特效，當有陀螺儀此選項不起作用
            frictionX: 0.9,
            frictionY: 0.9,
            scalarX: 20.4,   //移動的靈敏度
            scalarY: 20.4,   //移動的靈敏度
        });
        parallaxInstance4 = new Parallax(parallaxScene4, {
            relativeInput: true,
            hoverOnly: true,    //只有滑鼠滑過時才有特效，當有陀螺儀此選項不起作用
            frictionX: 0.9,
            frictionY: 0.9,
            scalarX: 20.4,   //移動的靈敏度
            scalarY: 20.4,   //移動的靈敏度
        });
        parallaxInstance5 = new Parallax(parallaxScene5, {
            relativeInput: true,
            hoverOnly: true,    //只有滑鼠滑過時才有特效，當有陀螺儀此選項不起作用
            frictionX: 0.9,
            frictionY: 0.9,
            scalarX: 20.4,   //移動的靈敏度
            scalarY: 20.4,   //移動的靈敏度
        });
        // console.log(this.refs.parallaxScene);
    }

    // // ---- 為了計算背景鏤空字的移動距離 START -----
    // // --> 做了以下這些事情
    // // 計算背景鏤空字可以移動的距離，透過以下方法
    // //      計算螢幕寬度
    // //      計算最初choiceList的螢幕位置xy
    // // 計算choiceList捲動的距離百分比，透過以下方法
    // //      當choiceList捲動時，讀取state中的最新的choiceList xy位置數值
    // // 更新背景鏤空字的container在螢幕中的位置，透過以下方法
    // //      鏤空字可移動距離*choiceList捲動百分比得出
    // //      加入初始化時的偏移

    // componentDidMount() {
    //     // console.log(this.refs.choiceListDOMNode);
    //     var choiceList = this.refs.choiceListDOMNode;
    //     var choiceListUl = this.refs.choiceListUlDOMNode;   //將choiceListUl清單DOM節點，存到變數choiceListUl中
    //     this.setState({
    //         choiceListX: choiceList.scrollLeft,
    //         choiceListY: choiceList.scrollHeight,
    //         choiceListUlWidth: choiceListUl.scrollWidth,
    //         choiceListUlContainerWidth: choiceListUl.offsetWidth,
    //         bgStrokeTextWidth: this.refs.BgStrokeTextDOMNode.offsetWidth,
    //     });
    //     this.updateWindowInnerWidth();    // 更新瀏覽器內可用寬度，並在更新完後計算背景簍空字可以移動的距離
    //     this.updateChoiceListX(choiceList.scrollLeft);
    //     this.updateChoiceListY(choiceList.scrollHeight);
    // }

    // // 當choiceList捲動時，更新state中的choiceList xy位置數值
    // handleChoiceListScroll(event) {
    //     let element = event.target;
    //     this.updateChoiceListX(element.scrollLeft);
    //     this.updateChoiceListY(element.scrollHeight);
    //     this.setState({
    //         // with border: offsetWidth, without border: clientWidth, 所有內容物的總距離: scrollWidth
    //         choiceListX: element.scrollLeft,
    //         choiceListY: element.scrollHeight,
    //     });
    //     this.updateChoiceListScrollPercentage();    //更新choiceList捲動的距離百分比
    //     this.caculateBgTextContainerStyle();
    // }

    // // 計算choiceList捲動的距離百分比
    // updateChoiceListScrollPercentage() {
    //     this.setState({
    //         choiceListScrollPercentage: this.state.choiceListX / (this.state.choiceListUlWidth - this.state.choiceListUlContainerWidth),
    //     })
    //     // console.log("choiceList已經捲動" + this.state.choiceListScrollPercentage + "%");
    // }

    // // 更新瀏覽器內可用寬度
    // // 並在更新完後，計算背景鏤空字可以移動的距離
    // // 接著，更新背景鏤空字的container在螢幕中的位置
    // updateWindowInnerWidth() {
    //     this.setState({
    //         windowInnerWidth: window.innerWidth,
    //     }, function () {
    //         this.caculateBgTextCouldMoveDistance()
    //     });
    // }

    // // 計算背景鏤空字可以移動的距離
    // // 計算方式: 螢幕總寬度-簍空字寬度
    // caculateBgTextCouldMoveDistance() {
    //     this.setState({
    //         bgStrokeTextMovableDistance: (this.state.windowInnerWidth - this.state.bgStrokeTextWidth),
    //     }, function () {
    //         // console.log("bgStrokeTextMovableDistance = " + this.state.bgStrokeTextMovableDistance);
    //         // console.log("success");
    //     })
    // }

    // // 更新背景鏤空字的container在螢幕中的位置
    // // 透過鏤空字可移動距離*choiceList捲動百分比得出，並加入最初的偏移數字
    // caculateBgTextContainerStyle() {
    //     // let offsetX = "50" + "%";
    //     let offsetX = (-this.state.windowInnerWidth * 0.025) + 1.3 * this.state.bgStrokeTextMovableDistance * this.state.choiceListScrollPercentage + "px";
    //     this.setState({
    //         bgStrokeTextContainerStyleTransform: { transform: ("translate(" + offsetX + ", 0%)") },
    //     }, function () {
    //         // console.log(this.state.bgStrokeTextContainerStyleTransform)
    //     })
    // }
    // // ----- 為了計算背景簍空字的移動距離 END -----


    // // ----- 換頁時，控制照片位移 START -----
    // handleChoiceListSelect(event) {
    //     this.changeSelectedImageClass(event);
    // }

    // changeSelectedImageClass(event) {
    //     let selectedImgDiv = this.refs.imgDiv1;
    //     // console.log(window.location.pathname);
    //     console.log(event.currentTarget.pathname);
    // }
    // // ----- 換頁時，控制照片位移 END -----


    // ----- 點圖片產生選單、圖片放大且模糊 START -----
    handleImgClick(selectedIndex) {
        if (this.state.listImgIsSelecting !== 0) {
            this.setState({
                listImgIsSelecting: 0,
            })
        } else {
            this.setState({
                listImgIsSelecting: selectedIndex,
            })
        }
    }
    // ----- 點圖片產生選單、圖片放大且模糊 END -----


    render() {
        return (
            <div className="QwzsContainer">

                {/* 3D模型 */}
                <div className="threeDModelContainer">
                    <HouseModel3D></HouseModel3D>
                </div>

                {/* 背景鏤空字 */}
                {/*<div className="bgStrokeTextContainer" style={this.state.bgStrokeTextContainerStyleTransform}>
                    <div className="bgStrokeText" ref="BgStrokeTextDOMNode">LOCATION</div>
                </div>*/}

                {/* 四大灣區...等等共五個清單 */}
                {/*<div className="choiceList" onScroll={(event) => this.handleChoiceListScroll(event)} ref="choiceListDOMNode">*/}
                <div className="choiceList" ref="choiceListDOMNode">
                    <ul ref="choiceListUlDOMNode">

                        <li className={(this.state.listImgIsSelecting === 1) ? ("active") : ("")}>
                            <div className="imgDiv" ref="imgDiv1" onClick={() => this.handleImgClick(1)}>
                                <div ref="parallaxScene1" className="parallaxScene">
                                    <div data-depth="0.2" className="img" alt="" />
                                </div>
                                <div className="cover"></div>
                                <div className="icons">
                                    <i className="fas fa-home"></i>
                                    <i className="fas fa-object-ungroup"></i>
                                    <i className="fas fa-ruler-combined"></i>
                                </div>
                            </div>
                            <div className="content">
                                <div className="title">四大灣區</div>
                                <div className="instruction">
                                    <div>Lorem Ipsum dummy</div>
                                    <div>Text of the printing industry.</div>
                                    <div>2019</div>
                                </div>
                                <div className="bottom">
                                    <div className="currentPage">01</div>
                                    <div className="slash">/</div>
                                    <div className="totalPages">15</div>
                                </div>
                            </div>
                        </li>

                        <li className={(this.state.listImgIsSelecting === 2) ? ("active") : ("")}>
                            <div className="imgDiv" onClick={() => this.handleImgClick(2)}>
                                {/* <img src={require('../../images/MS_06-copy-995x560.jpg')} alt="" /> */}
                                <div ref="parallaxScene2" className="parallaxScene">
                                    <div data-depth="0.2" className="img" alt="" />
                                </div>
                                <div className="cover"></div>
                                <div className="icons">
                                    <i className="fas fa-home"></i>
                                    <i className="fas fa-object-ungroup"></i>
                                    <i className="fas fa-ruler-combined"></i>
                                </div>
                            </div>
                            <div className="content">
                                <div className="title">四大灣區</div>
                                <div className="instruction">
                                    <div>Lorem Ipsum dummy</div>
                                    <div>Text of the printing industry.</div>
                                    <div>2019</div>
                                </div>
                                <div className="bottom">
                                    <div className="currentPage">01</div>
                                    <div className="slash">/</div>
                                    <div className="totalPages">15</div>
                                </div>
                            </div>
                        </li>

                        <li className={(this.state.listImgIsSelecting === 3) ? ("active") : ("")}>
                            <div className="imgDiv" onClick={() => this.handleImgClick(3)}>
                                {/* <img src={require('../../images/AGT_S13_05-995x560.jpg')} alt="" /> */}
                                <div ref="parallaxScene3" className="parallaxScene">
                                    <div data-depth="0.2" className="img" alt="" />
                                </div>
                                <div className="cover"></div>
                                <div className="icons">
                                    <i className="fas fa-home"></i>
                                    <i className="fas fa-object-ungroup"></i>
                                    <i className="fas fa-ruler-combined"></i>
                                </div>
                            </div>
                            <div className="content">
                                <div className="title">四大灣區</div>
                                <div className="instruction">
                                    <div>Lorem Ipsum dummy</div>
                                    <div>Text of the printing industry.</div>
                                    <div>2019</div>
                                </div>
                                <div className="bottom">
                                    <div className="currentPage">01</div>
                                    <div className="slash">/</div>
                                    <div className="totalPages">15</div>
                                </div>
                            </div>
                        </li>

                        <li className={(this.state.listImgIsSelecting === 4) ? ("active") : ("")}>
                            <div className="imgDiv" onClick={() => this.handleImgClick(4)}>
                                {/* <img src={require('../../images/HEY_DJ_06-995x560.jpg')} alt="" /> */}
                                <div ref="parallaxScene4" className="parallaxScene">
                                    <div data-depth="0.2" className="img" alt="" />
                                </div>
                                <div className="cover"></div>
                                <div className="icons">
                                    <i className="fas fa-home"></i>
                                    <i className="fas fa-object-ungroup"></i>
                                    <i className="fas fa-ruler-combined"></i>
                                </div>
                            </div>
                            <div className="content">
                                <div className="title">四大灣區</div>
                                <div className="instruction">
                                    <div>Lorem Ipsum dummy</div>
                                    <div>Text of the printing industry.</div>
                                    <div>2019</div>
                                </div>
                                <div className="bottom">
                                    <div className="currentPage">01</div>
                                    <div className="slash">/</div>
                                    <div className="totalPages">15</div>
                                </div>
                            </div>
                        </li>

                        <li className={(this.state.listImgIsSelecting === 5) ? ("active") : ("")}>
                            <div className="imgDiv" onClick={() => this.handleImgClick(5)}>
                                {/* <img src={require('../../images/SW_06-995x560.jpg')} alt="" /> */}
                                <div ref="parallaxScene5" className="parallaxScene">
                                    <div data-depth="0.2" className="img" alt="" />
                                </div>
                                <div className="cover"></div>
                                <div className="icons">
                                    <i className="fas fa-home"></i>
                                    <i className="fas fa-object-ungroup"></i>
                                    <i className="fas fa-ruler-combined"></i>
                                </div>
                            </div>
                            <div className="content">
                                <div className="title">四大灣區</div>
                                <div className="instruction">
                                    <div>Lorem Ipsum dummy</div>
                                    <div>Text of the printing industry.</div>
                                    <div>2019</div>
                                </div>
                                <div className="bottom">
                                    <div className="currentPage">01</div>
                                    <div className="slash">/</div>
                                    <div className="totalPages">15</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
}

const mapDispatchToProps = {
    updateChoiceListX,
    updateChoiceListY,
}

// export { Qwzs };
export default connect(mapStateToProps, mapDispatchToProps)(Qwzs);