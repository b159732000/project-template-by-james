import React from 'react';
import './LogoIntroduction.scss';
import { TransitionGroup, CSSTransition } from "react-transition-group";

class LogoIntroduction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPageIndex: 1,
            bgImgUrl: require('../../images/Traffic/bg1.jpg'),
            bgImgIsChanging: false,
            thisTimeTouch: {
                startX: null,
                startY: null,
                currentX: null,
                pageIsChanged: false,
            },
            lastTimeTouch: {
                EndX: null,
                EndY: null,
            }
        };
    }

    // 換頁程式碼 START --------
    handlePagerClick(pageNumber) {
        this.changePageTo(pageNumber);
        // this.changeBgImgUrl();
    }
    changePageTo(pageNumber) {
        this.setState({
            currentPageIndex: pageNumber,
        }, () => setTimeout(() => this.changeBgImgUrl(), 0));
    }
    changeBgImgUrl() {
        switch (this.state.currentPageIndex) {
            case 1:
                this.setState({
                    bgImgUrl: require('../../images/Traffic/bg1.jpg')
                });
                break;
            case 2:
                this.setState({
                    bgImgUrl: require('../../images/Traffic/bg2.jpg')
                });
                break;
            case 3:
                this.setState({
                    bgImgUrl: require('../../images/Traffic/bg3.jpg')
                });
                break;
            case 4:
                this.setState({
                    bgImgUrl: require('../../images/Traffic/bg4.jpg')
                });
                break;
            case 5:
                this.setState({
                    bgImgUrl: require('../../images/Traffic/bg5.jpg')
                });
                break;
            default:
                break;
        }
    }

    handleTouchScroll(event) {
        // 如果手指的Y軸位移>50，且還沒有換頁，則檢查手指是往下或網上滑動，然後按方向加減頁數pageIndex
        if (Math.abs(event.touches[0].screenY - this.state.thisTimeTouch.startY) >= 50 && this.state.thisTimeTouch.pageIsChanged === false) {
            if (event.touches[0].screenY - this.state.thisTimeTouch.startY < 0) {  //換下一頁
                let pageNumber = (this.state.currentPageIndex + 1);
                if (pageNumber === 6) {   //若超過第五頁，就從第一頁開始
                    pageNumber = 1;
                }
                this.changePageTo(pageNumber);
            } else if (event.touches[0].screenY - this.state.thisTimeTouch.startY > 0) {  //換上一頁
                let pageNumber = (this.state.currentPageIndex - 1);
                if (pageNumber === 0) {   //若小於第一頁，就從第五頁開始
                    pageNumber = 5;
                }
                this.changePageTo(pageNumber);
            }
            this.setState({
                thisTimeTouch: {
                    ...this.state.thisTimeTouch,
                    pageIsChanged: true,
                }
            })
        }
    }
    handleTouchStart(event) {
        this.setState({
            thisTimeTouch: {
                ...this.state.thisTimeTouch,
                startX: event.touches[0].screenX,
                startY: event.touches[0].screenY,
            }
        })
    }
    handleTouchEnd(event) {
        this.setState({
            thisTimeTouch: {
                ...this.state.thisTimeTouch,
                pageIsChanged: false,
            }
        })
    }
    // 換頁程式碼 END --------    

    render() {
        return (
            <div className="XmjsContainer" onTouchMove={(event) => this.handleTouchScroll(event)} onTouchStart={(event) => this.handleTouchStart(event)} onTouchEnd={() => this.handleTouchEnd()}>

                {/*<div className="bgImg" style={{backgroundImage: "url(" + this.state.bgImgUrl + ")"}}></div>*/}
                <TransitionGroup>
                    <CSSTransition
                        in={true}
                        appear={true}   //是否要在第一次掛載TransitionGroup時做動畫
                        timeout={{ enter: 3000, exit: 3000 }}
                        classNames="changeBgImgTransition"
                        key={this.state.bgImgUrl}
                    >
                        <div className="bgImg" style={{ backgroundImage: "url(" + this.state.bgImgUrl + ")" }}></div>
                    </CSSTransition>
                </TransitionGroup>

                <div
                    id="boardCanvas"
                    ref={mount => {
                        this.mount = mount;
                    }}
                />
                <div className="pager">
                    <ul>

                        <li className={(this.state.currentPageIndex === 1) ? ("active") : ("")} onClick={() => this.handlePagerClick(1)}>
                            <div className="pageNumberContainer">
                                <div className="number">01</div>
                            </div>
                            <div className="pageName">
                                <div className="text">四大灣區</div>
                            </div>
                            <div className="pageIndicator"></div>
                        </li>

                        <li className={(this.state.currentPageIndex === 2) ? ("active") : ("")} onClick={() => this.handlePagerClick(2)}>
                            <div className="pageNumberContainer">
                                <div className="number">02</div>
                            </div>
                            <div className="pageName">
                                <div className="text">交通樞紐</div>
                            </div>
                            <div className="pageIndicator"></div>
                        </li>

                        <li className={(this.state.currentPageIndex === 3) ? ("active") : ("")} onClick={() => this.handlePagerClick(3)}>
                            <div className="pageNumberContainer">
                                <div className="number">03</div>
                            </div>
                            <div className="pageName">
                                <div className="text">周邊區域</div>
                            </div>
                            <div className="pageIndicator"></div>
                        </li>

                        <li className={(this.state.currentPageIndex === 4) ? ("active") : ("")} onClick={() => this.handlePagerClick(4)}>
                            <div className="pageNumberContainer">
                                <div className="number">04</div>
                            </div>
                            <div className="pageName">
                                <div className="text">房屋配套</div>
                            </div>
                            <div className="pageIndicator"></div>
                        </li>

                        <li className={(this.state.currentPageIndex === 5) ? ("active") : ("")} onClick={() => this.handlePagerClick(5)}>
                            <div className="pageNumberContainer">
                                <div className="number">05</div>
                            </div>
                            <div className="pageName">
                                <div className="text">房屋本體</div>
                            </div>
                            <div className="pageIndicator"></div>
                        </li>

                    </ul>
                </div>
            </div>
        )
    }
}

export { LogoIntroduction };