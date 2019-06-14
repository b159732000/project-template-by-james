import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Scroll from 'react-scroll';
import './JghxBuilding.scss';

// 將接收到的state(包含在store內)放為本頁的state
function mapStateToProps(state) {
    return {
        jghxSelectedSecondHouseStyle: state.jghxReducers.jghxSelectedSecondHouseStyle,  //表示此次選擇的子戶型 (MountainMoon, MountainRiver, A, B, C)
    }
}

class JghxBuilding extends React.Component {
    constructor(props) {
        super(props);
        this.updateWhenScroll = this.updateWhenScroll.bind(this);
        this.state = {
            combineOrSplit: 'combine',  //目前是結合or拆分
            currentActiveFloor: 1,  //拆分時，目前瀏覽的樓層
            showBackToTopIcon: false,   //是否顯示回到頂端的按鈕
        }
    }

    componentDidMount() {
        this.scrollToElement();
        window.addEventListener('scroll', this.updateWhenScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.updateWhenScroll);
    }

    // 在捲動頁面時觸發
    updateWhenScroll() {
        this.updateBackToTopIconShowing();
    }

    // 更新是否顯示回到頂端按鈕
    updateBackToTopIconShowing() {

        // 如果頁面位置參考點存在，則檢查頁面下滑距離，並決定是否顯示返回頂端按鈕
        if (this.innerContainerDOMNode) {
            // 如果頁面下滑超過50px而且回到頂端按鈕未顯示，則將其顯示(設定state)
            // 如果頁面回到離頂50px以內且按鈕已顯示，則將其隱藏(設定state)
            if (this.innerContainerDOMNode.getBoundingClientRect().y < -200 & this.state.showBackToTopIcon === false) {
                this.setState({
                    showBackToTopIcon: true
                })
            } else if (this.innerContainerDOMNode.getBoundingClientRect().y >= -200 & this.state.showBackToTopIcon === true) {
                this.setState({
                    showBackToTopIcon: false
                })
            }
        }

    }

    // 拆分和合併按鈕按下時
    handleCombineOrSplitButtonClick(combineOrSplit) {
        this.changeCombineOrSplitTo(combineOrSplit);
    }

    // 按下樓層按鈕 (樓層按鈕為拆分狀態才顯示)
    handleFloorButtonClick(selectedNumber) {
        this.changeCurrentActiveFloor(selectedNumber);
    }

    // 更改拆分/合併
    changeCombineOrSplitTo(combineOrSplit) {
        this.setState({
            combineOrSplit: combineOrSplit,
        })
    }

    // 更改拆分時，目前瀏覽的樓層
    changeCurrentActiveFloor(selectedNumber) {
        this.setState({
            currentActiveFloor: selectedNumber
        })
    }

    // 滾動頁面到選定的樓層
    scrollToElement() {
        switch (this.props.jghxSelectedSecondHouseStyle) {
            case "A":
                this.firstFloor.scrollIntoView({
                    block: 'start',
                })
                break;
            case "B":
                this.secondFloor.scrollIntoView({
                    block: 'start',
                })
                break;
            case "C":
                this.thirdFloor.scrollIntoView({
                    block: 'start',
                })
                break;
            default:
                break;
        }
        // switch (selectedElement) {
        //     case value:

        //         break;

        //     default:
        //         break;
        // }
    }

    // 返回頂部鈕點選時觸發
    handleBackToTopIconClick() {
        // document.body.scrollTop = 0; // For Safari
        // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        Scroll.animateScroll.scrollToTop();
    }

    render() {
        return (
            <div className="JghxBuildingContainer">

                <img className="bg" src={require('../../images/Jghx/HouseStyle/Villa/MountainMoon/bg.png')} alt="" />

                <div className="innerContainer" ref={self => this.innerContainerDOMNode = self}>

                    {/* 頂部返回鈕 */}
                    <div className="backButtonPositioner">
                        <Link to="/james/project-template-by-james/Jghx">
                            <div className="backButton">
                            <img src={require('../../images/Jghx/BackLastPageIcon.png')} alt="" />
                            </div>
                        </Link>
                    </div>

                    {/* 樓層一圖+字 */}
                    <div className={(this.state.combineOrSplit === "combine") ? ("floor1Positioner") : ("floor1Positioner hidden")} ref={self => this.firstFloor = self}>
                        <div className="layout">
                            <img src={require('../../images/Jghx/HouseStyle/Villa/MountainMoon/Layout/First.png')} alt="" />
                        </div>
                        <div className="text">
                            <img src={require('../../images/Jghx/HouseStyle/Villa/MountainMoon/Text/First.png')} alt="" />
                        </div>
                    </div>

                    {/* 樓層二圖+字 */}
                    <div className={(this.state.combineOrSplit === "combine") ? ("floor2Positioner") : ("floor2Positioner hidden")} ref={self => this.secondFloor = self}>
                        <div className="layout">
                            <img src={require('../../images/Jghx/HouseStyle/Villa/MountainMoon/Layout/Second.png')} alt="" />
                        </div>
                        <div className="text">
                            <img src={require('../../images/Jghx/HouseStyle/Villa/MountainMoon/Text/Second.png')} alt="" />
                        </div>
                    </div>

                    {/* 樓層三圖+字 */}
                    <div className={(this.state.combineOrSplit === "combine") ? ("floor3Positioner") : ("floor3Positioner hidden")} ref={self => this.thirdFloor = self}>
                        <div className="layout">
                            <img src={require('../../images/Jghx/HouseStyle/Villa/MountainMoon/Layout/Third.png')} alt="" />
                        </div>
                        <div className="text">
                            <img src={require('../../images/Jghx/HouseStyle/Villa/MountainMoon/Text/Third.png')} alt="" />
                        </div>
                    </div>

                    {/* 返回頂部按鈕 */}
                    <div onClick={() => this.handleBackToTopIconClick()} className={(this.state.showBackToTopIcon) ? ("backToTopIconContainer") : ("backToTopIconContainer hidden")} ref={self => this.backToTopIcon = self}>
                        {/* <div className="backToTopIconContainer" ref={self=>this.backToTopIcon = self}> */}
                        <img src={require('../../images/Jghx/BackToTop.png')} alt="" />
                    </div>

                </div>

            </div>
        )
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(JghxBuilding);