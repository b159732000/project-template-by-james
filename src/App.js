import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar.jsx';
import { Xmjs } from './components/Xmjs/index.js';
import { Qwzs } from './components/Qwzs/index.js';
import { connect } from 'react-redux';
import { openMenu, closeMenu } from './actions/actions.js'


// 將接收到的state(包含在store內)放為本頁的state
function mapStateToProps(state) {
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

        <div className={"blackCover" + ((this.props.menuIsOpen) ? " menuIsActive" : "")}></div>

        {/* Menu Icon & Logo */}
        <div className="fixedThing">
          <div className={"menuIcon" + ((this.props.menuIsOpen) ? " menuIsActive" : "")} onClick={() => this.handleMenuIconClick()}>
            <div className="hamburger"></div>
          </div>
          <div className={"logo" + ((this.props.menuIsOpen) ? " menuIsActive" : "")}>Cui.hu</div>
        </div>

        <BrowserRouter>
          <NavigationBar></NavigationBar>
          <Switch>
            <Route path="/" exact component={Xmjs}></Route>
            <Route path="/Qwzs" exact component={Qwzs}></Route>
          </Switch>
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
