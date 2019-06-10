import React from 'react';
import './Traffic.scss';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PinchZoomPan from 'react-responsive-pinch-zoom-pan';
import TrafficThree from '../TrafficThree/TrafficThree.jsx';

class Traffic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageIndex: 3,
      bgImgUrl: require('../../images/Traffic/bg1.jpg'),
      currentPageNumber: 3,
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

  componentDidMount() {
    setTimeout(() => {
      // this.Page2InnerContainer.scrollTo(500, 0);
    }, 1000);
  }

  // 換頁程式碼 START --------
  handlePagerClick(pageNumber) {
    this.changePageTo(pageNumber);
    // this.changeBgImgUrl();
  }
  changePageTo(pageNumber) {
    this.setState({
      currentPageIndex: pageNumber,
      currentPageNumber: pageNumber,
    }, () => setTimeout(() => this.changeBgImgUrl(), 0));
  }
  changeBgImgUrl() {
    switch (this.state.currentPageIndex) {
      case 1:
        this.setState({
          bgImgUrl: require('../../images/Traffic/bg1.jpg'),
        });
        break;
      case 2:
        this.setState({
          bgImgUrl: require('../../images/Traffic/bg2.jpg'),
        });
        break;
      case 3:
        this.setState({
          bgImgUrl: require('../../images/Traffic/bg3.jpg'),
        });
        break;
      case 4:
        this.setState({
          bgImgUrl: require('../../images/Traffic/bg4.jpg'),
        });
        break;
      case 5:
        this.setState({
          bgImgUrl: require('../../images/Traffic/bg5.jpg'),
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
        if (pageNumber === 4) {   //若超過第三頁，就從第一頁開始
          pageNumber = 1;
        }
        this.changePageTo(pageNumber);
      } else if (event.touches[0].screenY - this.state.thisTimeTouch.startY > 0) {  //換上一頁
        let pageNumber = (this.state.currentPageIndex - 1);
        if (pageNumber === 0) {   //若小於第一頁，就從第三頁開始
          pageNumber = 3;
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
      // <div className="TrafficContainer" onTouchMove={(event) => this.handleTouchScroll(event)} onTouchStart={(event) => this.handleTouchStart(event)} onTouchEnd={() => this.handleTouchEnd()}>
      <div className="TrafficContainer">
        {/*<div className="bgImg" style={{backgroundImage: "url(" + this.state.bgImgUrl + ")"}}></div>*/}
        <TransitionGroup>
          <CSSTransition
            in={true}
            appear={true}   //是否要在第一次掛載TransitionGroup時做動畫
            timeout={{ enter: 3000, exit: 3000 }}
            classNames="changeBgImgTransition"
            key={this.state.bgImgUrl}
          >
            {/* <div className="bgImg" style={{ backgroundImage: "url(" + this.state.bgImgUrl + ")" }}></div> */}
            <div>
              {/* <div className="traffic traffic1"></div> */}

              <div className={(this.state.currentPageNumber === 1) ? ("traffic traffic1") : ("traffic traffic1 noDisplay")}>
                <div style={{ width: "100%", height: '100%' }}>
                  <PinchZoomPan zoomButtons={false}>
                      <img alt='Test Image' src='http://picsum.photos/750/750' />
                      {/* <TrafficThree></TrafficThree> */}
                  </PinchZoomPan>
                </div>
              </div>

              <div className={(this.state.currentPageNumber === 2) ? ("traffic traffic2") : ("traffic traffic2 noDisplay")}>
                    <div className="innerContainer" ref={self => this.Page2InnerContainer = self}>
                      <img className="bg" src={require('../../images/Traffic/SecondLevel/bg.jpg')} alt="" />

                      {/* 大圓 */}
                      <div className="bigLakeAreaStroke"></div>

                      {/* 大圓文字 */}
                      <div class="bigCircleTextContainer">
                        <svg viewBox="0 0 100 100">
                          <path d="M 0,50 a 50,50 0 1,1 0,1 z" id="circle" />
                          <text>
                            <textPath xlinkHref="#circle" fill="rgb(255, 164, 79)">粤港澳大湾区</textPath>
                          </text>
                        </svg>
                      </div>

                      {/* 小圓 */}
                      <div className="oneHourAreaStroke"></div>

                      {/* 小圓文字 */}
                      <div class="smallCircleTextContainer">
                        <svg viewBox="0 0 100 100">
                          <path d="M 0,50 a 50,50 0 1,1 0,1 z" id="circle" />
                          <text>
                            <textPath xlinkHref="#circle" fill="rgb(255, 229, 79)">1小时交通圈</textPath>
                          </text>
                        </svg>
                      </div>

                      <img className="DongGuang" src={require('../../images/Traffic/SecondLevel/Area/DongGuang.png')} alt="" />
                      <img className="MainArea" src={require('../../images/Traffic/SecondLevel/Area/MainArea.png')} alt="" />
                      <img className="Railway" src={require('../../images/Traffic/SecondLevel/Highway/Railway.png')} alt="" />
                      <img className="dot dot1" src={require('../../images/Traffic/SecondLevel/dot.png')} alt=""></img>
                      <img className="dot dot2" src={require('../../images/Traffic/SecondLevel/dot.png')} alt=""></img>
                      <img className="logo" src={require('../../images/Traffic/SecondLevel/LOGO.png')} alt=""></img>
                      <img className="location GuangZhou" src={require('../../images/Traffic/SecondLevel/Area/GuangZhou.png')} alt=""></img>
                      <img className="location HongKong" src={require('../../images/Traffic/SecondLevel/Area/HongKong.png')} alt=""></img>
                      <img className="location HuiZhou" src={require('../../images/Traffic/SecondLevel/Area/HuiZhou.png')} alt=""></img>
                      <img className="location Macao" src={require('../../images/Traffic/SecondLevel/Area/Macao.png')} alt=""></img>
                      <img className="location ShenZheng" src={require('../../images/Traffic/SecondLevel/Area/ShenZheng.png')} alt=""></img>
                      <img className="location ZhuHai" src={require('../../images/Traffic/SecondLevel/Area/ZhuHai.png')} alt=""></img>
                      {/* 大灣區生投控生態城 */}
                      {/* <img className="EnvironmentTown" src={require('../../images/Traffic/SecondLevel/EnvironmentTown.png')} alt=""></img> */}
                      {/* 贛深高速 */}
                      <img className="HighWayText" src={require('../../images/Traffic/SecondLevel/Highway/HighWayText.png')} alt=""></img>
                      {/* 深圳北 */}
                      <img className="ShenZhenBei" src={require('../../images/Traffic/SecondLevel/Highway/ShenZhenBei.png')} alt=""></img>
                      {/* 塘廈站 */}
                      <img className="TangXia" src={require('../../images/Traffic/SecondLevel/Highway/TangXia.png')} alt=""></img>
                    </div>
              </div>

              <div className={(this.state.currentPageNumber === 3) ? ("traffic traffic3") : ("traffic traffic3 noDisplay")}>
                <div className="innerContainer" ref={self => this.Page2InnerContainer = self}>
                  <img className="bg" src={require('../../images/Traffic/ThirdLevel/bg.jpg')} alt="" />
                </div>
                {/* <div style={{ width: "100%", height: '100%' }}>
                  <PinchZoomPan zoomButtons={false} maxScale={10} minScale={0.5}>
                    <div style={{ display: "inline-block", border: "1px solid Orange" }}>
                      <img alt='Test Image' src='http://picsum.photos/750/750' />
                    </div>
                  </PinchZoomPan>
                </div> */}
              </div>

            </div>
          </CSSTransition>
        </TransitionGroup>

        {/* <div
          id="boardCanvas"
          ref={mount => {
            this.mount = mount;
          }}
        /> */}
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
      </div >
    );
  }
}
export default Traffic;