/* eslint-disable no-useless-concat */
import React from 'react';
import './TestPlayground.scss';
import { connect } from 'react-redux';
import ScrollPercentage from 'react-scroll-percentage';

// 將Store的值存在this.props中
function mapStateToProps(state) {
    return {

    }
}

// 準備將reducer的方法與外部連結，搭配connect
const mapDispatchToProps = {
    // updateChoiceListX,
}

class TestPlayground extends React.Component {

    // 在此將reducer的方法與本頁的方法連結
    // updateChoiceListX = (choiceListX) => {
    //     this.props.updateChoiceListX(choiceListX);
    // }

    constructor(props) {
        super(props)
        this.state = {
            movingImage1Style: {},
            movingImage2Style: { transform: "scale(1.9)" + " rotate(-16deg)" },
            fixedImage1IsInViewPort: false,
            fixedImage2IsInViewPort: false,
            fixedImage3IsInViewPort: false,
            nextTextIsInViewPort: false,
            backToOverviewTextIsInViewPort: false,
        }
    }

    componentDidMount() {
        document.addEventListener('scroll', this.onScrollActive);
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this.onScrollActive);
    }

    onScrollActive = () => {
        this.changeFixedImage3ShowsOnScroll();
    }

    // 用以下這個來管控fixedImage3是否該顯示
    // 偵測Image3是否在viewport內
    changeFixedImage3ShowsOnScroll() {
        let viewportHeight = document.body.getBoundingClientRect().height;
        let fixedImage3 = this.refs.fixedImage3;
        let fixedImage2 = this.refs.fixedImage2;
        let fixedImage1 = this.refs.fixedImage1;
        let nextText = this.refs.nextText;
        let backToOverviewText = this.refs.backToOverviewText;
        // console.log(fixedImage3.getBoundingClientRect());

        // 偵測最上面的固定式照片是否進入視窗
        if (fixedImage3.getBoundingClientRect().y <= viewportHeight && this.state.fixedImage3IsInViewPort === false && fixedImage3.getBoundingClientRect().y >= 0) {
            this.setState({ fixedImage3IsInViewPort: true })
        } else if (fixedImage3.getBoundingClientRect().y > viewportHeight && this.state.fixedImage3IsInViewPort === true) {
            this.setState({ fixedImage3IsInViewPort: false })
        }
        // 偵測最上面第二張固定式照片是否進入視窗
        if (fixedImage2.getBoundingClientRect().y <= viewportHeight && this.state.fixedImage2IsInViewPort === false && fixedImage2.getBoundingClientRect().y >= 0) {
            this.setState({ fixedImage2IsInViewPort: true })
        } else if (fixedImage2.getBoundingClientRect().y > viewportHeight && this.state.fixedImage2IsInViewPort === true) {
            this.setState({ fixedImage2IsInViewPort: false })
        }
        // 偵測最上面第三張固定式照片是否進入視窗
        if (fixedImage1.getBoundingClientRect().y <= viewportHeight && this.state.fixedImage1IsInViewPort === false && fixedImage1.getBoundingClientRect().y >= 0) {
            this.setState({ fixedImage1IsInViewPort: true })
        } else if (fixedImage1.getBoundingClientRect().y > viewportHeight && this.state.fixedImage1IsInViewPort === true) {
            this.setState({ fixedImage1IsInViewPort: false })
        }
        // 偵測最下面文字(Next Project)是否進入視窗
        if (nextText.getBoundingClientRect().y <= viewportHeight && this.state.nextTextIsInViewPort === false && nextText.getBoundingClientRect().y >= 0) {
            this.setState({ nextTextIsInViewPort: true })
        } else if (nextText.getBoundingClientRect().y > viewportHeight && this.state.nextTextIsInViewPort === true) {
            this.setState({ nextTextIsInViewPort: false })
        }
        // 偵測最下面文字(Back To Overview)是否進入視窗
        if (backToOverviewText.getBoundingClientRect().y <= viewportHeight && this.state.backToOverviewTextIsInViewPort === false && backToOverviewText.getBoundingClientRect().y >= 0) {
            this.setState({ backToOverviewTextIsInViewPort: true })
        } else if (backToOverviewText.getBoundingClientRect().y > viewportHeight && this.state.backToOverviewTextIsInViewPort === true) {
            this.setState({ backToOverviewTextIsInViewPort: false })
        }
        // console.log("success");
        // console.log(document.body.getBoundingClientRect().height);
        // console.log(this.state.fixedImage3IsInViewPort);
    }

    changeMovingImage1StyleOnScroll(percentage, inView) {
        let scalePercentage = 1.7 + -percentage * 0.58;
        let rotatePercentage = 23 - percentage * 28;
        this.setState({
            movingImage1Style: { transform: "scale(" + scalePercentage + ")" + " rotate(" + rotatePercentage + "deg)" }
        })
    }
    changeMovingImage2StyleOnScroll(percentage, inView) {
        let scalePercentage = 1.9 - percentage * 1.475;
        let rotatePercentage = -16 + percentage * 30;
        if (rotatePercentage >= 0) { rotatePercentage = 0 };
        this.setState({
            movingImage2Style: { transform: "scale(" + scalePercentage + ")" + " rotate(" + rotatePercentage + "deg)" }
        })
    }

    render() {
        return (
            <ScrollPercentage>
                <div className="TestPlaygroundContainer">

                    {/* 用這個來定義所有內容離螢幕的左右邊距 */}
                    <div className="mainContent">
                        <div className="pager">
                            <div className="pageNumber">
                                <div className="currentPage">01</div>
                                <div className="slash">/</div>
                                <div className="totalPages">15</div>
                            </div>
                            <div className="arrow fas fa-arrow-right"></div>
                        </div>

                        <div className="contentContainer">
                            <div className="videoContainer"></div>
                            <div className="title">Dating Around</div>
                            <div className="topIntroText">
                                <div>Netflick Dating Show</div>
                                <div>Design &amp; VFX, Editing, Finishing</div>
                                <div>2019</div>
                            </div>
                            <div className="watchProjectBarContainer">
                                <div className="icon">
                                    <svg width="100%" height="100%" viewBox="0 0 600 600" version='1.1' xmlns="http://www.w3.org/2000/svg">
                                        {/*<rect id="A" x="0" y="0" fill="#FF6CC4" stroke="#C30D23" stroke-width="3" width="100" height="100" />*/}
                                        <path d="M366.11,305.67l-86.27-49.78a5.32,5.32,0,0,0-8,4.61v99.64a5.32,5.32,0,0,0,8,4.61L366.11,315A5.39,5.39,0,0,0,366.11,305.67Z" fill="#D92040" stroke="#D92040"></path>
                                        <circle id="B" cx="300" cy="300" fill="none" stroke="#D92040" strokeWidth="20" r="280" />
                                    </svg>
                                </div>
                                <div className="watchProjectText">Watch Full Project</div>
                            </div>
                            <div className="mainIntroTextContainer">
                                <div className="mainIntroText">In each episode of flirtations and fails, one real-life single navigates five blind dates. The mission: Find one match worthy of a second date. Burnish Creative designed the opening titles along with editing and finishing this enticing Netflix hit. </div>
                                <div className="madeByContainer">

                                    <div className="madeBy">
                                        <div className="madeByTitle">Lead Designer</div>
                                        <div className="madeByPerson">Maddie Wagg</div>
                                    </div>

                                    <div className="madeBy">
                                        <div className="madeByTitle">Production Co</div>
                                        <div className="madeByPerson">Crown Broadway Productions</div>
                                    </div>

                                    <div className="madeBy">
                                        <div className="madeByTitle">Distributed On</div>
                                        <div className="madeByPerson">Netflix</div>
                                    </div>

                                </div>
                            </div>
                            <div className="imagesContainer">
                                <div className={"fixedImage fixedImage1" + ((this.state.fixedImage1IsInViewPort) ? (" active") : (""))} ref="fixedImage1">
                                    <img src={require('../../images/Taiwan_01.jpg')} alt="" />
                                </div>
                                <div className={"fixedImage fixedImage2" + ((this.state.fixedImage2IsInViewPort) ? (" active") : (""))} ref="fixedImage2">
                                    <img src={require('../../images/Taiwan_03.jpg')} alt="" />
                                </div>
                                <div className={"fixedImage fixedImage3" + ((this.state.fixedImage3IsInViewPort) ? (" active") : (""))} ref="fixedImage3">
                                    {/*<div className="fixedImage fixedImage3">*/}
                                    <ScrollPercentage className="scrollPercentageContainer">
                                        <img src={require('../../images/Taiwan_05.jpg')} alt="" />
                                    </ScrollPercentage>
                                </div>
                                <div className="movingImageContainer1" ref="movingImage1">
                                    <ScrollPercentage className="scrollPercentageContainer" onChange={(percentage, inView) => this.changeMovingImage1StyleOnScroll(percentage, inView)}>
                                        <div className="movingImage">
                                            <img src={require('../../images/Taiwan_02.jpg')} alt="" style={this.state.movingImage1Style} />
                                        </div>
                                    </ScrollPercentage>
                                </div>
                                <div className="movingImageContainer2" ref="movingImage2">
                                    <ScrollPercentage className="scrollPercentageContainer" onChange={(percentage, inView) => this.changeMovingImage2StyleOnScroll(percentage, inView)}>
                                        <div className="movingImage">
                                            <img src={require('../../images/Taiwan_04.jpg')} alt="" style={this.state.movingImage2Style} />
                                        </div>
                                    </ScrollPercentage>
                                </div>
                            </div>
                            <div className="bottom">
                                <div className={"nextText" + ((this.state.nextTextIsInViewPort) ? (" active") : (""))} ref="nextText">Next Project</div>
                                <div className={"backToOverviewText" + ((this.state.backToOverviewTextIsInViewPort) ? (" active") : (""))} ref="backToOverviewText">Back To Overview</div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollPercentage>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPlayground);