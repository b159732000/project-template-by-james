import React from 'react';
import './TestPlayground.scss';
import { connect } from 'react-redux';

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

        }
    }

    render() {
        return (
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
                            <div className="icon"></div>
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
                            <div className="fixedImage"></div>
                            <div className="fixedImage"></div>
                            <div className="fixedImage"></div>
                            <div className="movingImageContainer1">
                                <div className="movingImage"></div>
                            </div>
                            <div className="movingImageContainer2">
                                <div className="movingImage"></div>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="nextText">Next Project</div>
                            <div className="backToOverviewText">Back To Overview</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPlayground);
