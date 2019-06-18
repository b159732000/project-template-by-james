import React from 'react';
import './Traffic.scss';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PinchZoomPan from 'react-responsive-pinch-zoom-pan';
import TrafficThree from '../TrafficThree/TrafficThree.jsx';
import * as Scroll from 'react-scroll';

class Traffic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageIndex: 1,
      currentNearArea: 1,   //左側選單，生活、辦公、娛樂、商業、教育
      bgImgUrl: require('../../images/Traffic/bg1.jpg'),
      currentPageNumber: 1,
      bgImgIsChanging: false,
      greenCurrentShowing: {
        YellowCowPark: false,
        BigKing: false,
        God: false,
        Silver: false,
        Lake: false,
        River: false,
      },
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
    // setTimeout(() => {
    //   // this.Page2InnerContainer.scrollTo(500, 0);
    // }, 1000);
    this.moveDOMNodeToViewPortCenter();
  }

  // 換頁程式碼 START --------
  // 點選右側menu
  handlePagerClick(pageNumber) {
    this.changePageTo(pageNumber);
    // this.changeBgImgUrl();
  }
  // 換頁(state)，並執行換頁時執行的程式碼
  changePageTo(pageNumber) {
    this.setState({
      currentPageIndex: pageNumber,
      currentPageNumber: pageNumber,
    }, () => this.whenPageChange());
  }
  // 換頁時執行的程式碼 (換背景圖、捲動頁面到指定位置)
  whenPageChange() {
    setTimeout(() => this.changeBgImgUrl(), 0);
    // this.moveDOMNodeToViewPortCenter();
  }
  changeBgImgUrl() {
    switch (this.state.currentPageIndex) {
      case 1:
        this.setState({
          bgImgUrl: require('../../images/Traffic/bg1.jpg'),
        }, () => this.moveDOMNodeToViewPortCenter());
        break;
      case 2:
        this.setState({
          bgImgUrl: require('../../images/Traffic/bg2.jpg'),
        }, () => this.moveDOMNodeToViewPortCenter());
        break;
      case 3:
        this.setState({
          bgImgUrl: require('../../images/Traffic/bg3.jpg'),
        }, () => this.moveDOMNodeToViewPortCenter());
        break;
      case 4:
        this.setState({
          bgImgUrl: require('../../images/Traffic/bg4.jpg'),
        }, () => this.moveDOMNodeToViewPortCenter());
        break;
      case 5:
        this.setState({
          bgImgUrl: require('../../images/Traffic/bg5.jpg'),
        }, () => this.moveDOMNodeToViewPortCenter());
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

  // 左側選單點擊觸發
  handleLeftPagerClick(selectedNearAreaNumber) {
    this.setState({
      currentNearArea: selectedNearAreaNumber,
    });
  }

  // 綠樹圖標點擊後觸發
  handleGreenTreeClick(selectedGreenTreeIcon) {
    switch (selectedGreenTreeIcon) {
      case 'YellowCowPark':
        this.setState({
          greenCurrentShowing: {
            ...this.state.greenCurrentShowing,
            YellowCowPark: !this.state.greenCurrentShowing.YellowCowPark,
          }
        })
        break;
      case 'BigKing':
        this.setState({
          greenCurrentShowing: {
            ...this.state.greenCurrentShowing,
            BigKing: !this.state.greenCurrentShowing.BigKing,
          }
        })
        break;
      case 'God':
        this.setState({
          greenCurrentShowing: {
            ...this.state.greenCurrentShowing,
            God: !this.state.greenCurrentShowing.God,
          }
        })
        break;
      case 'Silver':
        this.setState({
          greenCurrentShowing: {
            ...this.state.greenCurrentShowing,
            Silver: !this.state.greenCurrentShowing.Silver,
          }
        })
        break;
      case 'Lake':
        this.setState({
          greenCurrentShowing: {
            ...this.state.greenCurrentShowing,
            Lake: !this.state.greenCurrentShowing.Lake,
          }
        })
        break;
      case 'River':
        this.setState({
          greenCurrentShowing: {
            ...this.state.greenCurrentShowing,
            River: !this.state.greenCurrentShowing.River,
          }
        })
        break;
      default:
        break;
    }
  }

  // 將指定DOMNode移動到畫面中央
  moveDOMNodeToViewPortCenter() {
    let thisPageWidth;
    // travelParkDOMNode  觀光公園標示
    // SanFranciscoDOMNode  舊金山標示
    // dot1DOMNode  塘廈站紅點
    switch (this.state.currentPageIndex) {
      case 1:
        if (this.firstTrafficBg.clientWidth === 0) {
          setTimeout(() => {
            thisPageWidth = this.firstTrafficBg.clientWidth;
            this.firstContainer.scrollTo(thisPageWidth * 0.35, 0);
          }, 500);
        } else {
          thisPageWidth = this.firstTrafficBg.clientWidth;
          this.firstContainer.scrollTo(thisPageWidth * 0.35, 0);
        }
        break;
      case 2:
        if (this.secondTrafficBg.clientWidth === 0) {
          setTimeout(() => {
            thisPageWidth = this.secondTrafficBg.clientWidth;
            this.secondContainer.scrollTo(thisPageWidth * 0.32, 0);
          }, 500);
        } else {
          thisPageWidth = this.secondTrafficBg.clientWidth;
          this.secondContainer.scrollTo(thisPageWidth * 0.32, 0);
        }
        // this.dot1DOMNode.scrollTo(centerX, centerY);
        break;
      case 3:
        if (this.thirdTrafficBg.clientWidth === 0) {
          setTimeout(() => {
            thisPageWidth = this.thirdTrafficBg.clientWidth;
            this.thirdContainer.scrollTo(thisPageWidth * 0.3, 0);
          }, 500);
        } else {
          thisPageWidth = this.thirdTrafficBg.clientWidth;
          this.thirdContainer.scrollTo(thisPageWidth * 0.3, 0);
        }
        // this.travelParkDOMNode.scrollTo(centerX, centerY);
        break;
      default:
        break;
    }
    // console.log(document.body.clientWidth);
    // console.log(document.body.clientHeight);
  }

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

              {/* 一級區位 */}
              <div ref={self => this.firstContainer = self} className={(this.state.currentPageNumber === 1) ? ("traffic traffic1") : ("traffic traffic1 noDisplay")}>
                <div className="container">
                  <img className='bg' ref={self => this.firstTrafficBg = self} src={require('../../images/Traffic/FirstLevel/bg.png')} />
                  <img className='SanFrancisco icon' ref={self => this.SanFranciscoDOMNode = self} src={require('../../images/Traffic/FirstLevel/SanFrancisco.png')} />
                  <img className='Tokyo icon' src={require('../../images/Traffic/FirstLevel/Tokyo.png')} />
                  <img className='HongKong icon' src={require('../../images/Traffic/FirstLevel/HongKong.png')} />
                  <img className='Point icon' src={require('../../images/Traffic/FirstLevel/Point.png')} />
                </div>
              </div>

              {/* 二級區位 */}
              <div ref={self => this.secondContainer = self} className={(this.state.currentPageNumber === 2) ? ("traffic traffic2") : ("traffic traffic2 noDisplay")}>
                <div className="innerContainer" ref={self => this.Page2InnerContainer = self}>
                  <img className="bg" ref={self => this.secondTrafficBg = self} src={require('../../images/Traffic/SecondLevel/bg.jpg')} alt="" />

                  {/* 大圓 */}
                  <div className="bigLakeAreaStroke"></div>

                  {/* 大圓文字 */}
                  <div className="bigCircleTextContainer">
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
                  <div className="smallCircleTextContainer">
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
                  {/* 塘廈站紅點 */}
                  <img className="dot dot1" ref={self => this.dot1DOMNode = self} src={require('../../images/Traffic/SecondLevel/dot.png')} alt=""></img>
                  {/* 深圳北紅點 */}
                  <img className="dot dot2" src={require('../../images/Traffic/SecondLevel/dot.png')} alt=""></img>
                  {/* 地名 */}
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

              {/* 三級區位 */}
              <div ref={self => this.thirdContainer = self} className={(this.state.currentPageNumber === 3) ? ("traffic traffic3") : ("traffic traffic3 noDisplay")}>
                <div className="innerContainer" ref={self => this.Page2InnerContainer = self}>
                  <img className="bg" ref={self => this.thirdTrafficBg = self} src={require('../../images/Traffic/ThirdLevel/bg.jpg')} alt="" />
                  <img className="projectLogo" src={require('../../images/Traffic/ThirdLevel/LOGO.png')} alt="" />

                  {/* 綠化標示 */}
                  <div className="greenContainer">

                    {/* 黃牛普森林公園容器 - 字 + 樹圖標 */}
                    <div className="YellowCowPark locationContainer">
                      {/* 字 */}
                      <img className={(this.state.greenCurrentShowing.YellowCowPark) ? ("text YellowCowText") : ("text YellowCowText noDisplay")} src={require('../../images/Traffic/ThirdLevel/TreeAndText/YellowCow/Text.png')} alt="" />
                      {/* 樹圖標 */}
                      <img onClick={() => this.handleGreenTreeClick('YellowCowPark')} className="treeIcon YellowCowIndicator" src={require('../../images/Traffic/ThirdLevel/TreeIcon.png')} alt="" />
                    </div>

                    {/* 大王容器 - 字 + 樹圖標 */}
                    <div className="BigKing locationContainer">
                      {/* 字 */}
                      <img className={(this.state.greenCurrentShowing.BigKing) ? ("text BigKingText") : ("text BigKingText noDisplay")} src={require('../../images/Traffic/ThirdLevel/TreeAndText/BigKing/Text.png')} alt="" />
                      {/* 樹圖標 */}
                      <img onClick={() => this.handleGreenTreeClick('BigKing')} className="treeIcon BigKingIndicator" src={require('../../images/Traffic/ThirdLevel/TreeIcon.png')} alt="" />
                    </div>

                    {/* 觀音容器 - 字 + 樹圖標 */}
                    <div className="God locationContainer">
                      {/* 字 */}
                      <img className={(this.state.greenCurrentShowing.God) ? ("text GodText") : ("text GodText noDisplay")} src={require('../../images/Traffic/ThirdLevel/TreeAndText/God/Text.png')} alt="" />
                      {/* 樹圖標 */}
                      <img onClick={() => this.handleGreenTreeClick('God')} className="treeIcon GodIndicator" src={require('../../images/Traffic/ThirdLevel/TreeIcon.png')} alt="" />
                    </div>

                    {/* 銀瓶容器 - 字 + 樹圖標 */}
                    <div className="Silver locationContainer">
                      {/* 字 */}
                      <img className={(this.state.greenCurrentShowing.Silver) ? ("text SilverText") : ("text SilverText noDisplay")} src={require('../../images/Traffic/ThirdLevel/TreeAndText/Silver/Text.png')} alt="" />
                      {/* 樹圖標 */}
                      <img onClick={() => this.handleGreenTreeClick('Silver')} className="treeIcon SilverIndicator" src={require('../../images/Traffic/ThirdLevel/TreeIcon.png')} alt="" />
                    </div>

                    {/* 碧湖容器 - 字 + 樹圖標 */}
                    <div className="Lake locationContainer">
                      {/* 字 */}
                      <img className={(this.state.greenCurrentShowing.Lake) ? ("text LakeText") : ("text LakeText noDisplay")} src={require('../../images/Traffic/ThirdLevel/TreeAndText/Lake/Text.png')} alt="" />
                      {/* 樹圖標 */}
                      <img onClick={() => this.handleGreenTreeClick('Lake')} className="treeIcon LakeIndicator" src={require('../../images/Traffic/ThirdLevel/TreeIcon.png')} alt="" />
                    </div>

                    {/* 清溪容器 - 字 + 樹圖標 */}
                    <div className="River locationContainer">
                      {/* 字 */}
                      <img className={(this.state.greenCurrentShowing.River) ? ("text RiverText") : ("text RiverText noDisplay")} src={require('../../images/Traffic/ThirdLevel/TreeAndText/River/Text.png')} alt="" />
                      {/* 樹圖標 */}
                      <img onClick={() => this.handleGreenTreeClick('River')} className="treeIcon RiverIndicator" src={require('../../images/Traffic/ThirdLevel/TreeIcon.png')} alt="" />
                    </div>


                  </div>

                  {/* 生活 */}
                  <div className={(this.state.currentNearArea === 1) ? ("lifeContainer") : ("lifeContainer noDisplay")}>
                    {/* 清溪醫院 */}
                    <img className="lakeHospital locationIcon" src={require('../../images/Traffic/ThirdLevel/Life/1.png')} alt="" />
                    {/* 清溪公園 */}
                    <img className="lakePark locationIcon" src={require('../../images/Traffic/ThirdLevel/Life/4.png')} alt="" />
                    {/* 農業銀行 */}
                    <img className="Bank locationIcon" src={require('../../images/Traffic/ThirdLevel/Life/2.png')} alt="" />
                    {/* 觀光公園 */}
                    <img className="travelPark locationIcon" ref={self => this.travelParkDOMNode = self} src={require('../../images/Traffic/ThirdLevel/Life/3.png')} alt="" />
                  </div>

                  {/* 政府 */}
                  <div className={(this.state.currentNearArea === 2) ? ("govermentContainer") : ("govermentContainer noDisplay")}>
                    {/* 清溪政府 */}
                    <img className="goverment locationIcon" src={require('../../images/Traffic/ThirdLevel/Goverment/1.png')} alt="" />
                    {/* 綜合服務中心 */}
                    <img className="center locationIcon" src={require('../../images/Traffic/ThirdLevel/Goverment/2.png')} alt="" />
                    {/* 公安局 */}
                    <img className="police locationIcon" src={require('../../images/Traffic/ThirdLevel/Goverment/3.png')} alt="" />
                    {/* 塘廈政府 */}
                    <img className="tangGoverment locationIcon" src={require('../../images/Traffic/ThirdLevel/Goverment/4.png')} alt="" />
                    {/* 鳳崗政府 */}
                    <img className="birdGoverment locationIcon" src={require('../../images/Traffic/ThirdLevel/Goverment/5.png')} alt="" />
                    {/* 電視台 */}
                    <img className="tv locationIcon" src={require('../../images/Traffic/ThirdLevel/Goverment/6.png')} alt="" />
                  </div>

                  {/* 娛樂 */}
                  <div className={(this.state.currentNearArea === 3) ? ("entertainmentContainer") : ("entertainmentContainer noDisplay")}>
                    {/* 銀利高爾夫 */}
                    <img className="silverGolf locationIcon" src={require('../../images/Traffic/ThirdLevel/Entertainment/1.png')} alt="" />
                    {/* 塘廈體育館 */}
                    <img className="gym locationIcon" src={require('../../images/Traffic/ThirdLevel/Entertainment/2.png')} alt="" />
                    {/* 觀瀾高爾夫 */}
                    <img className="seaWaveGolf locationIcon" src={require('../../images/Traffic/ThirdLevel/Entertainment/3.png')} alt="" />
                    {/* 生態體育公園 */}
                    <img className="gymPark locationIcon" src={require('../../images/Traffic/ThirdLevel/Entertainment/4.png')} alt="" />
                    {/* 文化廣場 */}
                    <img className="culture locationIcon" src={require('../../images/Traffic/ThirdLevel/Entertainment/5.png')} alt="" />
                  </div>

                  {/* 商業 */}
                  <div className={(this.state.currentNearArea === 4) ? ("businessContainer") : ("businessContainer noDisplay")}>
                    {/* 潤生百貨 */}
                    <img className="bornShoppingMall locationIcon" src={require('../../images/Traffic/ThirdLevel/Business/1.png')} alt="" />
                    {/* 商會大廈 */}
                    <img className="bussinessBuilding locationIcon" src={require('../../images/Traffic/ThirdLevel/Business/2.png')} alt="" />
                    {/* 昌明酒店 */}
                    <img className="hotel locationIcon" src={require('../../images/Traffic/ThirdLevel/Business/3.png')} alt="" />
                    {/* 嘉信廣場 */}
                    <img className="ciaXin locationIcon" src={require('../../images/Traffic/ThirdLevel/Business/4.png')} alt="" />
                    {/* 鹿湖商業中心 */}
                    <img className="bussinessCenter locationIcon" src={require('../../images/Traffic/ThirdLevel/Business/5.png')} alt="" />
                  </div>

                  {/* 教育 */}
                  <div className={(this.state.currentNearArea === 5) ? ("educationContainer") : ("educationContainer noDisplay")}>
                    {/* 晨光 */}
                    <img className="morningLight locationIcon" src={require('../../images/Traffic/ThirdLevel/Education/1.png')} alt="" />
                    {/* 華晨 */}
                    <img className="huaCheng locationIcon" src={require('../../images/Traffic/ThirdLevel/Education/2.png')} alt="" />
                    {/* 清溪中學 */}
                    <img className="junior locationIcon" src={require('../../images/Traffic/ThirdLevel/Education/3.png')} alt="" />
                    {/* 清溪小學 */}
                    <img className="elementary locationIcon" src={require('../../images/Traffic/ThirdLevel/Education/4.png')} alt="" />
                    {/* 師範 */}
                    <img className="teacher locationIcon" src={require('../../images/Traffic/ThirdLevel/Education/5.png')} alt="" />
                    {/* 初級 */}
                    <img className="basic locationIcon" src={require('../../images/Traffic/ThirdLevel/Education/6.png')} alt="" />
                  </div>

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

        {/* 右側選單 */}
        <div className="pager">
          <ul>

            <li className={(this.state.currentPageIndex === 1) ? ("active") : ("")} onClick={() => this.handlePagerClick(1)}>
              <div className="pageNumberContainer">
                <div className="number">01</div>
              </div>
              <div className="pageName">
                <div className="text">四大湾区</div>
              </div>
              <div className="pageIndicator"></div>
            </li>

            <li className={(this.state.currentPageIndex === 2) ? ("active") : ("")} onClick={() => this.handlePagerClick(2)}>
              <div className="pageNumberContainer">
                <div className="number">02</div>
              </div>
              <div className="pageName">
                <div className="text">交通枢纽</div>
              </div>
              <div className="pageIndicator"></div>
            </li>

            <li className={(this.state.currentPageIndex === 3) ? ("active") : ("")} onClick={() => this.handlePagerClick(3)}>
              <div className="pageNumberContainer">
                <div className="number">03</div>
              </div>
              <div className="pageName">
                <div className="text">周边区域</div>
              </div>
              <div className="pageIndicator"></div>
            </li>

            {/* <li className={(this.state.currentPageIndex === 4) ? ("active") : ("")} onClick={() => this.handlePagerClick(4)}>
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
                <div className="text">房屋本体</div>
              </div>
              <div className="pageIndicator"></div>
            </li> */}

          </ul>
        </div>

        {/* 左側選單 */}
        <div className={(this.state.currentPageIndex === 3) ? ("leftPager active") : ("leftPager")}>
          <ul>

            <li className={(this.state.currentNearArea === 1) ? ("active") : ("")} onClick={() => this.handleLeftPagerClick(1)}>
              <div className="pageIndicator"></div>
              <div className="pageName">
                <div className="text">生活</div>
              </div>
            </li>

            <li className={(this.state.currentNearArea === 2) ? ("active") : ("")} onClick={() => this.handleLeftPagerClick(2)}>
              <div className="pageIndicator"></div>
              <div className="pageName">
                <div className="text">办公</div>
              </div>
            </li>

            <li className={(this.state.currentNearArea === 3) ? ("active") : ("")} onClick={() => this.handleLeftPagerClick(3)}>
              <div className="pageIndicator"></div>
              <div className="pageName">
                <div className="text">娱乐</div>
              </div>
            </li>

            <li className={(this.state.currentNearArea === 4) ? ("active") : ("")} onClick={() => this.handleLeftPagerClick(4)}>
              <div className="pageIndicator"></div>
              <div className="pageName">
                <div className="text">商业</div>
              </div>
            </li>

            <li className={(this.state.currentNearArea === 5) ? ("active") : ("")} onClick={() => this.handleLeftPagerClick(5)}>
              <div className="pageIndicator"></div>
              <div className="pageName">
                <div className="text">教育</div>
              </div>
            </li>

            {/* <li className={(this.state.currentPageIndex === 4) ? ("active") : ("")} onClick={() => this.handlePagerClick(4)}>
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
                <div className="text">房屋本体</div>
              </div>
              <div className="pageIndicator"></div>
            </li> */}

          </ul>
        </div>

      </div >
    );
  }
}
export default Traffic;