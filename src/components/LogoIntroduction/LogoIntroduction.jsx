import React from 'react';
import './LogoIntroduction.scss';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';

class LogoIntroduction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPageIndex: 1,    //目前所在頁數
            bgImgUrl: require('../../images/Traffic/bg1.jpg'),
            bgImgIsChanging: false,
            currentShowingArea: "West",     //第二頁中，顯示的中國地圖地區
            activatingMenu: "HuaRuinCenter",     //第三頁中，已選取的menu
            currentActiveCircle: {
                shopping: false,
                health: false,
                finance: false,
                energy: false,
                city: false,
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
        // 如果手指的X軸位移>50，且還沒有換頁，則檢查手指是往下或網上滑動，然後按方向加減頁數pageIndex
        if (Math.abs(event.touches[0].screenX - this.state.thisTimeTouch.startX) >= 50 && this.state.thisTimeTouch.pageIsChanged === false) {
            if (event.touches[0].screenX - this.state.thisTimeTouch.startX < 0) {  //換下一頁
                let pageNumber = (this.state.currentPageIndex + 1);
                if (pageNumber === 5) {   //若超過第4頁，就從第一頁開始
                    pageNumber = 1;
                }
                this.changePageTo(pageNumber);
            } else if (event.touches[0].screenX - this.state.thisTimeTouch.startX > 0) {  //換上一頁
                let pageNumber = (this.state.currentPageIndex - 1);
                if (pageNumber === 0) {   //若小於第一頁，就從第4頁開始
                    pageNumber = 4;
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

    // 決定小圓圈(覆蓋層)的顯示隱藏
    changeCoverCircleHidden(selectedCircle) {
        switch (selectedCircle) {
            case "shopping":
                this.setState({
                    currentActiveCircle: {
                        ...this.state.currentActiveCircle,
                        shopping: !this.state.currentActiveCircle.shopping,
                    }
                }, () => console.log(this.state.currentActiveCircle))
                break;
            case "health":
                this.setState({
                    currentActiveCircle: {
                        ...this.state.currentActiveCircle,
                        health: !this.state.currentActiveCircle.health,
                    }
                })
                break;
            case "finance":
                this.setState({
                    currentActiveCircle: {
                        ...this.state.currentActiveCircle,
                        finance: !this.state.currentActiveCircle.finance,
                    }
                })
                break;
            case "energy":
                this.setState({
                    currentActiveCircle: {
                        ...this.state.currentActiveCircle,
                        energy: !this.state.currentActiveCircle.energy,
                    }
                })
                break;
            case "city":
                this.setState({
                    currentActiveCircle: {
                        ...this.state.currentActiveCircle,
                        city: !this.state.currentActiveCircle.city,
                    }
                })
                break;
            default:
                break;
        }
    }

    // 決定第二頁中國地圖顯示的區域
    changeChinaMapShowingArea(selectedArea) {
        switch (selectedArea) {
            case "West":
                this.setState({
                    currentShowingArea: selectedArea,
                })
                break;
            case "North":
                this.setState({
                    currentShowingArea: selectedArea,
                })
                break;
            case "EastNorth":
                this.setState({
                    currentShowingArea: selectedArea,
                })
                break;
            case "East":
                this.setState({
                    currentShowingArea: selectedArea,
                })
                break;
            case "Center":
                this.setState({
                    currentShowingArea: selectedArea,
                })
                break;
            case "South":
                this.setState({
                    currentShowingArea: selectedArea,
                })
                break;
            default:
                break;
        }
    }

    // 第三頁按鈕選取時觸發
    handleThirdPageMenuClick(selectedMenuIcon) {

        // 更換觸發狀態
        // 如果選取的按鈕是已經觸發的，就改為非點選狀態；
        // 如果選取的按鈕是還沒觸發的，就改為點選狀態
        if (this.state.activatingMenu === selectedMenuIcon) {
            this.setState({
                activatingMenu: "none"
            })
        } else {
            this.setState({
                activatingMenu: selectedMenuIcon
            })
        }

    }

    render() {
        return (
            <div className="logoIntroContainer" onTouchMove={(event) => this.handleTouchScroll(event)} onTouchStart={(event) => this.handleTouchStart(event)} onTouchEnd={() => this.handleTouchEnd()}>

                {/*<div className="bgImg" style={{backgroundImage: "url(" + this.state.bgImgUrl + ")"}}></div>*/}
                <TransitionGroup>
                    <CSSTransition
                        in={true}
                        appear={true}   //是否要在第一次掛載TransitionGroup時做動畫
                        timeout={{ enter: 3000, exit: 3000 }}
                        classNames="changeBgImgTransition"
                    // key={this.state.bgImgUrl}
                    >
                        <div className="CSSTransitionContainer">

                            {/* <div className="bgImg" style={{ backgroundImage: "url(" + this.state.bgImgUrl + ")" }}></div> */}

                            {/* 品牌介紹第一頁 */}
                            <div className={(this.state.currentPageIndex === 1) ? ("logoInstruction logoInstruction1") : ("logoInstruction logoInstruction1 noDisplay")}>
                                <div className="innerContainer" ref={self => this.Page2InnerContainer = self}>

                                    {/* 螢幕上半文字 */}
                                    <div className="upperText">
                                        <img src={require('../../images/LogoIntroduction/1/btn/text.png')} alt="" />
                                    </div>

                                    {/* 螢幕下半圓圈icon*4 */}
                                    <div className="bottomCirclesPositioner">
                                        <div className="bottomCirclesContainer">
                                            {/* 中心骨架圓圈 */}
                                            <img className="mainCenterImg" src={require('../../images/LogoIntroduction/1/btn/center.png')} alt="" />
                                            {/* 旁邊的小圓圈 */}
                                            <div className="childCircles">
                                                <img src={require('../../images/LogoIntroduction/1/btn/up/shopping.png')} alt="" onClick={() => this.changeCoverCircleHidden("shopping")} /> {/* 大消費 */}
                                                <img src={require('../../images/LogoIntroduction/1/btn/up/health.png')} alt="" onClick={() => this.changeCoverCircleHidden("health")} /> {/* 大健康 */}
                                                <img src={require('../../images/LogoIntroduction/1/btn/up/finance.png')} alt="" onClick={() => this.changeCoverCircleHidden("finance")} /> {/* 科技與金融 */}
                                                <img src={require('../../images/LogoIntroduction/1/btn/up/energy.png')} alt="" onClick={() => this.changeCoverCircleHidden("energy")} /> {/* 能源服務 */}
                                                <img src={require('../../images/LogoIntroduction/1/btn/up/city.png')} alt="" onClick={() => this.changeCoverCircleHidden("city")} /> {/* 城市建設與運營 */}
                                            </div>
                                            {/* 覆蓋小圓圈的小圓圈 */}
                                            <div className="childCirclesCover">
                                                <img className={(this.state.currentActiveCircle.shopping === true) ? ("") : ("hidden")} src={require('../../images/LogoIntroduction/1/btn/down/shopping.png')} alt="" onClick={() => this.changeCoverCircleHidden("shopping")} /> {/* 大消費 */}
                                                <img className={(this.state.currentActiveCircle.health === true) ? ("") : ("hidden")} src={require('../../images/LogoIntroduction/1/btn/down/health.png')} alt="" onClick={() => this.changeCoverCircleHidden("health")} /> {/* 大健康 */}
                                                <img className={(this.state.currentActiveCircle.finance === true) ? ("") : ("hidden")} src={require('../../images/LogoIntroduction/1/btn/down/finance.png')} alt="" onClick={() => this.changeCoverCircleHidden("finance")} /> {/* 科技與金融 */}
                                                <img className={(this.state.currentActiveCircle.energy === true) ? ("") : ("hidden")} src={require('../../images/LogoIntroduction/1/btn/down/energy.png')} alt="" onClick={() => this.changeCoverCircleHidden("energy")} /> {/* 能源服務 */}
                                                <img className={(this.state.currentActiveCircle.city === true) ? ("") : ("hidden")} src={require('../../images/LogoIntroduction/1/btn/down/city.png')} alt="" onClick={() => this.changeCoverCircleHidden("city")} /> {/* 城市建設與運營 */}
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>

                            {/* 品牌介紹第二頁 */}
                            <div className={(this.state.currentPageIndex === 2) ? ("logoInstruction logoInstruction2") : ("logoInstruction logoInstruction2 noDisplay")}>
                                <div className="innerContainer" ref={self => this.Page2InnerContainer = self}>
                                    {/* 頂部文字 */}
                                    <div className="upperTextContainer">
                                        <img src={require('../../images/LogoIntroduction/2/text.png')} alt="" />
                                    </div>

                                    {/* 中間地圖 */}
                                    {/* 定位用容器 */}
                                    <div className="middleMapPositioner">
                                        {/* 地圖及覆蓋圖層 */}
                                        <div className="middleMapGroup">
                                            {/* 背景中國地圖 */}
                                            <img className="chinaMap" src={require('../../images/LogoIntroduction/2/area/ChinaMap2.png')} alt="" />

                                            {/* 華西大區覆蓋圖層 */}
                                            <img className={(this.state.currentShowingArea === "West") ? ("cover West") : ("cover West hidden")} src={require('../../images/LogoIntroduction/2/area/West.png')} alt="" />
                                            {/* 華北大區覆蓋圖層 */}
                                            <img className={(this.state.currentShowingArea === "North") ? ("cover North") : ("cover North hidden")} src={require('../../images/LogoIntroduction/2/area/North.png')} alt="" />
                                            {/* 東北大區覆蓋圖層 */}
                                            <img className={(this.state.currentShowingArea === "EastNorth") ? ("cover EastNorth") : ("cover EastNorth hidden")} src={require('../../images/LogoIntroduction/2/area/EastNorth.png')} alt="" />
                                            {/* 華東大區覆蓋圖層 */}
                                            <img className={(this.state.currentShowingArea === "East") ? ("cover East") : ("cover East hidden")} src={require('../../images/LogoIntroduction/2/area/East.png')} alt="" />
                                            {/* 華中大區覆蓋圖層 */}
                                            <img className={(this.state.currentShowingArea === "Center") ? ("cover Center") : ("cover Center hidden")} src={require('../../images/LogoIntroduction/2/area/Center.png')} alt="" />
                                            {/* 華南大區覆蓋圖層 */}
                                            <img className={(this.state.currentShowingArea === "South") ? ("cover South") : ("cover South hidden")} src={require('../../images/LogoIntroduction/2/area/South.png')} alt="" />

                                            {/* 地名 */}
                                            <img className="cover name" src={require('../../images/LogoIntroduction/2/area/Name.png')} alt="" />
                                        </div>
                                    </div>

                                    {/* 底部的六個按鈕 */}
                                    <div className="bottomButtonContainer">
                                        {/* <button class="btn btn-green btn-border-o">Emerald</button>
                                        <button class="btn btn-blue btn-border-o">Peter River</button>
                                        <button class="btn btn-purple btn-border-o">Amethyst</button>
                                        <button class="btn btn-navy btn-border-o">Wet Asphalt</button>
                                        <button class="btn btn-orange btn-border-o">Carrot</button>
                                        <button class="btn btn-red btn-border-o">Alizarin</button> */}
                                        <div className="upper">
                                            {/* 華西大區 */}
                                            <img className="button one" onClick={() => this.changeChinaMapShowingArea("West")} src={require('../../images/LogoIntroduction/2/btn/1.png')} alt="" />
                                            {/* 華北大區 */}
                                            <img className="button two" onClick={() => this.changeChinaMapShowingArea("North")} src={require('../../images/LogoIntroduction/2/btn/2.png')} alt="" />
                                            {/* 東北大區 */}
                                            <img className="button three" onClick={() => this.changeChinaMapShowingArea("EastNorth")} src={require('../../images/LogoIntroduction/2/btn/3.png')} alt="" />
                                        </div>
                                        <div className="bottom">
                                            {/* 華東大區 */}
                                            <img className="button four" onClick={() => this.changeChinaMapShowingArea("East")} src={require('../../images/LogoIntroduction/2/btn/4.png')} alt="" />
                                            {/* 華中大區 */}
                                            <img className="button five" onClick={() => this.changeChinaMapShowingArea("Center")} src={require('../../images/LogoIntroduction/2/btn/5.png')} alt="" />
                                            {/* 華南大區 */}
                                            <img className="button six" onClick={() => this.changeChinaMapShowingArea("South")} src={require('../../images/LogoIntroduction/2/btn/6.png')} alt="" />

                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 品牌介紹第三頁 */}
                            <div className={(this.state.currentPageIndex === 3) ? ("logoInstruction logoInstruction3") : ("logoInstruction logoInstruction3 noDisplay")}>
                                <div className="innerContainer" ref={self => this.Page2InnerContainer = self}>
                                    {/* 頂部文字 */}
                                    <div className="upperTextContainer">
                                        <img src={require('../../images/LogoIntroduction/3/text.png')} alt="" />
                                    </div>

                                    {/* 中間地圖 */}
                                    {/* 定位用容器 */}
                                    <div className="middleMapPositioner">
                                        <div className="middleMapContainer">
                                            {/* 背景圖 */}
                                            <img className="bg" src={require('../../images/LogoIntroduction/3/GrayMap.png')} alt="" />
                                            {/* 黃點 */}
                                            <div className="yellowPoint"></div>
                                            {/* 地名 */}
                                            <img className="name" src={require('../../images/LogoIntroduction/3/Name.png')} alt="" />
                                            {/* 虛線圓圈 */}
                                            <div className="circle"></div>
                                            {/* 大圓文字 */}
                                            <div className="bigCircleTextContainer">
                                                <svg viewBox="0 0 100 100">
                                                    <path d="M 0,50 a 50,50 0 1,1 0,1 z" id="circle" />
                                                    <text>
                                                        <textPath xlinkHref="#circle" fill="rgb(255, 164, 79)">粤港澳大湾区城市群</textPath>
                                                    </text>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 底部的三個按鈕及標題 */}
                                    <div className="bottomButtonContainer">
                                        <div className="logo"><img className="name" src={require('../../images/LogoIntroduction/3/ButtonTitle.png')} alt="" /></div>
                                        <div className="button button1">
                                            <img className="name" onClick={() => this.handleThirdPageMenuClick("HuaRuinCenter")} src={(this.state.activatingMenu === "HuaRuinCenter") ? (require('../../images/LogoIntroduction/3/btn/down/HuaRuinCenter.png')) : (require('../../images/LogoIntroduction/3/btn/up/HuaRuinCenter.png'))} alt="" />
                                            {/* 點按鈕顯現的圖片 */}
                                            {(this.state.activatingMenu === "HuaRuinCenter") ? (
                                                <div className="detailContainer">
                                                    <img src={require('../../images/LogoIntroduction/3/Center.png')} alt="" />
                                                </div>
                                            ) : (null)}
                                            {/* <div className="detailContainer">
                                                <img src={require('../../images/LogoIntroduction/3/Center.png')} alt=""/>
                                            </div> */}
                                        </div>
                                        <div className="button button2">
                                            <img className="name" onClick={() => this.handleThirdPageMenuClick("HuaRuinCheng")} src={(this.state.activatingMenu === "HuaRuinCheng") ? (require('../../images/LogoIntroduction/3/btn/down/HuaRuinCheng.png')) : (require('../../images/LogoIntroduction/3/btn/up/HuaRuinCheng.png'))} alt="" />
                                            {/* 點按鈕顯現的圖片 */}
                                            {(this.state.activatingMenu === "HuaRuinCheng") ? (
                                                <div className="detailContainer">
                                                    <img src={require('../../images/LogoIntroduction/3/Town.png')} alt="" />
                                                </div>
                                            ) : (null)}
                                        </div>
                                        <div className="button button3">
                                            <img className="name" onClick={() => this.handleThirdPageMenuClick("HuaRuinShenZhungWan")} src={(this.state.activatingMenu === "HuaRuinShenZhungWan") ? (require('../../images/LogoIntroduction/3/btn/down/HuaRuinShenZhungWan.png')) : (require('../../images/LogoIntroduction/3/btn/up/HuaRuinShenZhungWan.png'))} alt="" />
                                            {/* 點按鈕顯現的圖片 */}
                                            {(this.state.activatingMenu === "HuaRuinShenZhungWan") ? (
                                                <div className="detailContainer">
                                                    <img src={require('../../images/LogoIntroduction/3/Bay.png')} alt="" />
                                                </div>
                                            ) : (null)}
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* 品牌介紹第三頁 */}
                            <div className={(this.state.currentPageIndex === 4) ? ("logoInstruction logoInstruction4") : ("logoInstruction logoInstruction4 noDisplay")}>
                                <div className="innerContainer" ref={self => this.Page2InnerContainer = self}>
                                    <img src={require('../../images/LogoIntroduction/4.png')} alt="" />
                                </div>
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
                            {/* <div className="pageNumberContainer">
            <div className="number">01</div>
          </div> */}
                            <div className="pageName">
                                <div className="text">华润集团</div>
                            </div>
                            <div className="pageIndicator"></div>
                        </li>

                        <li className={(this.state.currentPageIndex === 2) ? ("active") : ("")} onClick={() => this.handlePagerClick(2)}>
                            {/* <div className="pageNumberContainer">
            <div className="number">02</div>
          </div> */}
                            <div className="pageName">
                                <div className="text">华润置地</div>
                            </div>
                            <div className="pageIndicator"></div>
                        </li>

                        <li className={(this.state.currentPageIndex === 3) ? ("active") : ("")} onClick={() => this.handlePagerClick(3)}>
                            {/* <div className="pageNumberContainer">
            <div className="number">03</div>
          </div> */}
                            <div className="pageName">
                                <div className="text">华润华南</div>
                            </div>
                            <div className="pageIndicator"></div>
                        </li>

                        <li className={(this.state.currentPageIndex === 4) ? ("active") : ("")} onClick={() => this.handlePagerClick(4)}>
                            {/* <div className="pageNumberContainer">
            <div className="number">04</div>
          </div> */}
                            <div className="pageName">
                                <div className="text">华润东莞</div>
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


                {/* <div className="pager">
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
                 */}
            </div>
        )
    }
}

export { LogoIntroduction };