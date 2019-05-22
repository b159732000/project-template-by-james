import React from 'react';
import './Qwzs.scss';
import { connect } from 'react-redux';
import { updateChoiceListX, updateChoiceListY } from '../../actions/actions.js';
import { Link } from 'react-router-dom';

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
        }
    }


    // ---- 為了計算背景鏤空字的移動距離 START -----
    // --> 做了以下這些事情
    // 計算背景鏤空字可以移動的距離，透過以下方法
    //      計算螢幕寬度
    //      計算最初choiceList的螢幕位置xy
    // 計算choiceList捲動的距離百分比，透過以下方法
    //      當choiceList捲動時，讀取state中的最新的choiceList xy位置數值
    // 更新背景鏤空字的container在螢幕中的位置，透過以下方法
    //      鏤空字可移動距離*choiceList捲動百分比得出
    //      加入初始化時的偏移

    componentDidMount() {
        // console.log(this.refs.choiceListDOMNode);
        var choiceList = this.refs.choiceListDOMNode;
        var choiceListUl = this.refs.choiceListUlDOMNode;   //將choiceListUl清單DOM節點，存到變數choiceListUl中
        this.setState({
            choiceListX: choiceList.scrollLeft,
            choiceListY: choiceList.scrollHeight,
            choiceListUlWidth: choiceListUl.scrollWidth,
            choiceListUlContainerWidth: choiceListUl.offsetWidth,
            bgStrokeTextWidth: this.refs.BgStrokeTextDOMNode.offsetWidth,
        });
        this.updateWindowInnerWidth();    // 更新瀏覽器內可用寬度，並在更新完後計算背景簍空字可以移動的距離
        this.updateChoiceListX(choiceList.scrollLeft);
        this.updateChoiceListY(choiceList.scrollHeight);
    }

    // 當choiceList捲動時，更新state中的choiceList xy位置數值
    handleChoiceListScroll(event) {
        let element = event.target;
        this.updateChoiceListX(element.scrollLeft);
        this.updateChoiceListY(element.scrollHeight);
        this.setState({
            // with border: offsetWidth, without border: clientWidth, 所有內容物的總距離: scrollWidth
            choiceListX: element.scrollLeft,
            choiceListY: element.scrollHeight,
        });
        this.updateChoiceListScrollPercentage();    //更新choiceList捲動的距離百分比
        this.caculateBgTextContainerStyle();
    }

    // 計算choiceList捲動的距離百分比
    updateChoiceListScrollPercentage() {
        this.setState({
            choiceListScrollPercentage: this.state.choiceListX / (this.state.choiceListUlWidth - this.state.choiceListUlContainerWidth),
        })
        // console.log("choiceList已經捲動" + this.state.choiceListScrollPercentage + "%");
    }

    // 更新瀏覽器內可用寬度
    // 並在更新完後，計算背景鏤空字可以移動的距離
    // 接著，更新背景鏤空字的container在螢幕中的位置
    updateWindowInnerWidth() {
        this.setState({
            windowInnerWidth: window.innerWidth,
        }, function () {
            this.caculateBgTextCouldMoveDistance()
        });
    }

    // 計算背景鏤空字可以移動的距離
    // 計算方式: 螢幕總寬度-簍空字寬度
    caculateBgTextCouldMoveDistance() {
        this.setState({
            bgStrokeTextMovableDistance: (this.state.windowInnerWidth - this.state.bgStrokeTextWidth),
        }, function () {
            // console.log("bgStrokeTextMovableDistance = " + this.state.bgStrokeTextMovableDistance);
            // console.log("success");
        })
    }

    // 更新背景鏤空字的container在螢幕中的位置
    // 透過鏤空字可移動距離*choiceList捲動百分比得出，並加入最初的偏移數字
    caculateBgTextContainerStyle() {
        // let offsetX = "50" + "%";
        let offsetX = (-this.state.windowInnerWidth * 0.025) + 1.3 * this.state.bgStrokeTextMovableDistance * this.state.choiceListScrollPercentage + "px";
        this.setState({
            bgStrokeTextContainerStyleTransform: { transform: ("translate(" + offsetX + ", 0%)") },
        }, function () {
            // console.log(this.state.bgStrokeTextContainerStyleTransform)
        })
    }
    // ----- 為了計算背景簍空字的移動距離 END -----


    // ----- 換頁時，控制照片位移 START -----
    handleChoiceListSelect(event) {
        this.changeSelectedImageClass(event);
    }

    changeSelectedImageClass(event) {
        let selectedImgDiv = this.refs.imgDiv1;
        // console.log(window.location.pathname);
        console.log(event.currentTarget.pathname);
    }
    // ----- 換頁時，控制照片位移 END -----

    render() {
        return (
            <div className="QwzsContainer">

                {/* 背景鏤空字 */}
                <div className="bgStrokeTextContainer" style={this.state.bgStrokeTextContainerStyleTransform}>
                    <div className="bgStrokeText" ref="BgStrokeTextDOMNode">LOCATION</div>
                </div>

                {/* 四大灣區...等等共五個清單 */}
                <div className="choiceList" onScroll={(event) => this.handleChoiceListScroll(event)} ref="choiceListDOMNode">
                    <ul ref="choiceListUlDOMNode">

                        <li>
                            <div className="imgDiv" ref="imgDiv1">
                                <Link to='/james/project-template-by-james/TestPlayground' onClick={(event) => this.handleChoiceListSelect(event)}>
                                    <img src={require('../../images/DA_08-995x560.jpg')} alt="" />
                                </Link>
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

                        <li>
                            <div className="imgDiv">
                                <img src={require('../../images/MS_06-copy-995x560.jpg')} alt="" />
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

                        <li>
                            <div className="imgDiv">
                                <img src={require('../../images/AGT_S13_05-995x560.jpg')} alt="" />
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

                        <li>
                            <div className="imgDiv">
                                <img src={require('../../images/HEY_DJ_06-995x560.jpg')} alt="" />
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

                        <li>
                            <div className="imgDiv">
                                <img src={require('../../images/SW_06-995x560.jpg')} alt="" />
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