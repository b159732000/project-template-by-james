import React from 'react';
import './NavigationBar.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { openMenu, closeMenu } from '../../actions/actions.js'

// 將接收到的state(包含在store內)放為本頁的state
function mapStateToProps(state) {
    return {
        menuIsOpen: state.openCloseMenuReducers.menuIsOpen, //Boolean, 表示Menu開啟與否
    }
}

class NavigationBar extends React.Component {

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

    componentDidMount() {
    }

    render() {
        return (
            <div className={"NavigationBar" + ((this.props.menuIsOpen) ? " menuIsActive" : "")}>

                {/*<div className={"menuIcon" + ((this.props.menuIsOpen) ? " active" : "")} onClick={() => this.handleMenuIconClick()}>
                    <div className="hamburger"></div>
                    </div>

                    <div className="logo">Cui.hu</div>*/}

                <ul className="menuList">
                    <li>
                        <Link to="/Xmjs" onClick={() => this.handleMenuIconClick()}>

                            <div className="menuNameCN">項目介紹</div>
                            <div className="menuNameEn">Project introduciton</div>
                        </Link>
                    </li>
                    <div className="lineBreak"></div>
                    <li>
                        <Link to="/Qwzs" onClick={() => this.handleMenuIconClick()}>
                            <div className="menuNameCN">區位展示</div>
                            <div className="menuNameEn">Location display</div>
                        </Link>
                    </li>
                    <div className="lineBreak"></div>
                    <li>
                        <Link to="/Qwzs" onClick={() => this.handleMenuIconClick()}>
                            <div className="menuNameCN">精工戶型</div>
                            <div className="menuNameEn">Seiko apartment</div>
                        </Link>
                    </li>
                    <div className="lineBreak"></div>
                    <li>
                        <Link to="/TestPlayground" onClick={() => this.handleMenuIconClick()}>
                            <div className="menuNameCN">測試小天地</div>
                            <div className="menuNameEn">My Own Test Playground</div>
                        </Link>
                    </li>
                </ul>

                <div className="bottom">
                    <span>137-2233-9977</span>
                    <span>|</span>
                    <span>sunupcg@sunupcg.com</span>
                </div>

                {/* 測試 Router Link 是否成功 */}
                {/*<ul>
                    <li>
                        <Link to='/'>Xmjs</Link>
                        <Link to='/Qwzs'>Qwzs</Link>
                    </li>
                    <li></li>
                </ul>*/}

            </div>
        )
    }
}

const mapDispatchToProps = {
    openMenu,
    closeMenu
}

// export { NavigationBar };
// export default connect((state) => ({
//     ...state
// }), mapDispatchToProps)(NavigationBar);
export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);