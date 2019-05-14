import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar.jsx';
import { Xmjs } from './components/Xmjs/index.js';
import Qwzs from './components/Qwzs/Qwzs.jsx';
import TestPlayground from './components/TestPlayground/TestPlayground.jsx';
import { connect } from 'react-redux';
import { openMenu, closeMenu } from './actions/actions.js'
import { TransitionGroup, CSSTransition } from "react-transition-group";
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
  handleMenuIconClick() {
    if (this.props.menuIsOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  render() {
    return (
      <div className="App">

        {/* Menu出現時，覆蓋底層的灰色 */}
        <div className={"blackCover" + ((this.props.menuIsOpen) ? " menuIsActive" : "")}></div>

        {/* Menu Icon & Logo */}
        <div className="fixedThing">
          <div className={"menuIcon" + ((this.props.menuIsOpen) ? " menuIsActive" : "")} onClick={() => this.handleMenuIconClick()}>
            <div className="hamburger"></div>
          </div>
          <div className={"logo" + ((this.props.menuIsOpen) ? " menuIsActive" : "")}>Cui.hu</div>
        </div>


        <BrowserRouter>   {/* BrowserRouter底下的每一個Route，都會有match,location,history三個props */}
          <Route render={({ location }) => (
            <div className="mainRouteContainer">
              <NavigationBar></NavigationBar>
              <TransitionGroup>
              {/*<ReactTransitionGroup key={location.key} location={location}>*/}
                <CSSTransition
                    key={location.key}
                    in={true}
                    // 在進入時，產生class-enter，且在瞬間同層加上class-enter-active，在指定時間後被class-enter-done代替。
                    // 在離開時，class-enter-done被class-exit代替，在瞬間加上class-exit-active代替，在指定時間後被刪除
                    // timeout={{ enter: 2000, exit: 600 }}
                    timeout={{ enter: 3000, exit: 2000 }}
                    classNames={"componentChangeCSSTransition"}
                >
                {/*<ReactTransitionGroup component="div">{}</ReactTransitionGroup>*/}
                {/*<Switch component={ReactTransitionGroup}>   Switch是一渲染到指定Route，立即停止繼續渲染其他Route */}
                <Switch location={location}>  {/* Switch是一渲染到指定Route，立即停止繼續渲染其他Route */}
                  {/*<Route path="/Xmjs" exact children={()=>{return(<ReactTransitionGroup component="div"><Xmjs></Xmjs></ReactTransitionGroup>)}}></Route>
                  <Route path="/Qwzs" exact children={()=>{return(<ReactTransitionGroup component="div"><Qwzs></Qwzs></ReactTransitionGroup>)}}></Route>*/}
                  <Route path="/Xmjs" exact component={Xmjs}></Route>
                  <Route path="/Qwzs" exact component={Qwzs}></Route>
                  <Route path="/TestPlayground" exact component={TestPlayground}></Route>
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
