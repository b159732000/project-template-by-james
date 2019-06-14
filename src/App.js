import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar.jsx';
import { LogoIntroduction } from './components/LogoIntroduction/LogoIntroduction.jsx';
import Qwzs from './components/Qwzs/Qwzs.jsx';
import HouseModel3D from './components/HouseModel3D/HouseModel3D.jsx';
import TestPlayground from './components/TestPlayground/TestPlayground.jsx';
import { connect } from 'react-redux';
import { openMenu, closeMenu } from './actions/actions.js'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Traffic from './components/Traffic/Traffic.jsx';
import LoadingPage from './components/LoadingPage/LoadingPage.jsx';
import GardenTraveling from './components/GardenTraveling/GardenTraveling.jsx';
import AerialView from './components/AerialView/AerialView.jsx';
import FullpageVideoPlayer from './components/FullpageVideoPlayer/FullpageVideoPlayer.jsx';
import Xmjs from './components/Xmjs/Xmjs.jsx';
import Jghx from './components/Jghx/Jghx.jsx';
import MountainMoon from './components/MountainMoon/MountainMoon.jsx';
import MountainRiver from './components/MountainRiver/MountainRiver.jsx';
import JghxBuilding from './components/JghxBuilding/JghxBuilding.jsx';
import ImageSequence from './components/ImageSequence/ImageSequence.jsx';
import JghxPannellum from './components/JghxPannellum/JghxPannellum.jsx';
// import ReactTransitionGroup from 'react-addons-transition-group'

// 將接收到的state(包含在store內)放為本頁的state
function mapStateToProps(state) {
  // 將所有state傳入 <- 不能這樣傳，會不起作用
  // return state

  // 只傳入state中指定的值
  return {
    menuIsOpen: state.openCloseMenuReducers.menuIsOpen, //Boolean, 表示Menu開啟與否
  }
}


// function App() {
class App extends React.Component {

  // 本頁的方法與store內的方法連結 -> 開關Menu
  closeMenu = () => {
    this.props.closeMenu();
  }
  openMenu = () => {
    this.props.openMenu();
  }

  // 點擊Menu Icon時，如果Menu是打開的，就把Menu關上，反之亦然
  handleMenuIconClick(forceCloseOrOpen) {
    switch (forceCloseOrOpen) {
      case "Close":
        this.closeMenu();
        break;
      case "Open":
        this.openMenu();
        break;
      case null:
        if (this.props.menuIsOpen) {
          this.closeMenu();
        } else {
          this.openMenu();
        }
        break;
      default:
        if (this.props.menuIsOpen) {
          this.closeMenu();
        } else {
          this.openMenu();
        }
        break;
    }

  }

  render() {
    return (
      <div className="App">

        {/* Menu出現時，覆蓋底層的灰色 */}
        <div className={"blackCover" + ((this.props.menuIsOpen) ? " menuIsActive" : "")}></div>

        <BrowserRouter>   {/* BrowserRouter底下的每一個Route，都會有match,location,history三個props */}
          <Route path="/james/project-template-by-james/" exact component={LoadingPage}></Route>
          <Route render={({ location }) => (
            <div className="mainRouteContainer">

              {/* Menu Icon & Logo */}
              <div className="fixedThing">
                <div className={"menuIcon" + ((this.props.menuIsOpen) ? " menuIsActive" : "")} onClick={() => this.handleMenuIconClick()}>
                  <div className="hamburger"></div>
                </div>
                <Link to="/james/project-template-by-james" onClick={() => this.handleMenuIconClick("Close")}>
                  <div className={"logo" + ((this.props.menuIsOpen) ? " menuIsActive" : "")}>Hua.run</div>
                </Link>
              </div>

              <NavigationBar></NavigationBar>
              <TransitionGroup>
                {/*<ReactTransitionGroup key={location.key} location={location}>*/}
                <CSSTransition
                  key={location.key}
                  in={true}
                  // 在進入時，產生class-enter，且在瞬間同層加上class-enter-active，在指定時間後被class-enter-done代替。
                  // 在離開時，class-enter-done被class-exit代替，在瞬間加上class-exit-active代替，在指定時間後被刪除
                  // timeout={{ enter: 2000, exit: 600 }}
                  // timeout={{ enter: 10000, exit: 10000 }}
                  timeout={{ enter: 3000, exit: 2000 }}
                  appear={true}
                  classNames={"componentChangeCSSTransition"}
                >
                  {/*<ReactTransitionGroup component="div">{}</ReactTransitionGroup>*/}
                  {/*<Switch component={ReactTransitionGroup}>   Switch是一渲染到指定Route，立即停止繼續渲染其他Route */}
                  <Switch location={location}>  {/* Switch是一渲染到指定Route，立即停止繼續渲染其他Route */}
                    {/*<Route path="/Xmjs" exact children={()=>{return(<ReactTransitionGroup component="div"><Xmjs></Xmjs></ReactTransitionGroup>)}}></Route>
                  <Route path="/Qwzs" exact children={()=>{return(<ReactTransitionGroup component="div"><Qwzs></Qwzs></ReactTransitionGroup>)}}></Route>*/}
                    <Route path="/james/project-template-by-james/LogoIntroduction" component={LogoIntroduction}></Route>
                    <Route path="/james/project-template-by-james/Xmjs" component={Xmjs}></Route>
                    <Route path="/james/project-template-by-james/Traffic" component={Traffic}></Route>
                    <Route path="/james/project-template-by-james/Qwzs" component={Qwzs}></Route> {/*Qwzs包含3D模型(HouseModel3D)*/}
                    <Route path="/james/project-template-by-james/TestPlayground" component={TestPlayground}></Route>
                    <Route path="/james/project-template-by-james/GardenTraveling" component={GardenTraveling}></Route>
                    <Route path="/james/project-template-by-james/AerialView" component={AerialView}></Route>
                    <Route path="/james/project-template-by-james/FullpageVideoPlayer" component={FullpageVideoPlayer}></Route>
                    <Route path="/james/project-template-by-james/Jghx" component={Jghx}></Route>
                    <Route path="/james/project-template-by-james/MountainMoon" component={MountainMoon}></Route>
                    <Route path="/james/project-template-by-james/MountainRiver" component={MountainRiver}></Route>
                    <Route path="/james/project-template-by-james/JghxBuilding" component={JghxBuilding}></Route>
                    <Route path="/james/project-template-by-james/JghxPannellum" component={JghxPannellum}></Route>
                  </Switch>
                </CSSTransition>
                {/*</ReactTransitionGroup>*/}
              </TransitionGroup>
            </div>
          )} />
        </BrowserRouter>

      </div>
    );
  }
}

const mapDispatchToProps = {
  openMenu,
  closeMenu
}

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);