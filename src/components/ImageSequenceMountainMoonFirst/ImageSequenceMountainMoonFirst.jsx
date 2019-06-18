import React from 'react';
import './ImageSequenceMountainMoonFirst.scss';

class ImageSequenceFirst extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.updateLoadingProgress = this.updateLoadingProgress.bind(this);
        this.checkAllImagesLoaded = this.checkAllImagesLoaded.bind(this);

        // 定義本頁變數
        this.imageArray = [];
        this.DOMArray = [];
        this.requestID = null;  //提供掛載/卸載requestAnimationFrame
        this.lastPositionX = null;   //上一個

        this.state = {
            // 對應不同專案，要進入程式碼中手動設定的
            // 設定方法是將圖片所在目錄整行文字複製進以下底方
            // 需要修改的地方及數量: function addImagesIntoPage()*1、render()中的預覽圖區*1
            imagesBaseUrl: "../../images/Jghx/HouseStyle/Villa/MountainMoon/MountainMoonCombineGif/First/",    //圖片所在的目錄

            // 對應不同專案，要在此手動設定的
            totalImagesNumber: 40,                  //圖片總張數
            imageNameStartNumber: 0,                //第一張圖片名稱的數字
            imagesFormat: ".png",                   // 圖片格式
            fingerMoveDistanceToChangeImage: 1,    //手指每滑過多遠距離(x軸)就換一張圖片

            // 不用手動設定的
            startShowingImageSequence: false,       //是否開始載入所有圖片
            alreadyLoadingImagesNumber: 0,          //目前載入了幾張圖片
            currentShowingImage: 1,                 //目前顯示第幾張圖片
            allImagesAreLoaded: false,              //是否全部載入完成
            realImageSequenceIsShowing: false,      //是否顯示序列禎
            playerLayerIsShowing: true,             //播放鈕圖層是否顯現
            loadingLayerIsShowing: false,           //載入圖層是否顯現
            blurPreviewImageIsShowing: true,        //模糊預覽圖是否顯現
            currentLoadingPercentage: 0,           //載入進度 (0-100)
            // 跟觸控滑動換圖相關的
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
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        if (this.requestID !== null) {
            window.cancelAnimationFrame(this.requestID);     // 用來更新進度條的requestAnimationFrame
            this.requestID = null;
        }
        this._isMounted = false;
    }

    // 將image掛載到本頁中 (掛載後圖片會自動載入)
    addImagesIntoPage() {
        // 先檢驗imageArray的長度是否為0 (因為有用到CSSTransition，所以本頁可能被多次掛載，為確保只在第一次掛載時執行推送<img/>到DOMTree)
        if (this.imageArray.length === 0) {
            // 當i<圖片總張數，推送一個新的div到imageArray，最後return imageArray
            for (let i = this.state.imageNameStartNumber; i < this.state.totalImagesNumber; i++) {

                // 取得目前的時間，作為獨一無二的image ID
                let currentTime = new Date();

                // 推送img進入imageArray
                this.imageArray.push(
                    <img ref={self => this.DOMArray.push(self)} className={'image ' + "image" + i + " hidden"} src={require('../../images/Jghx/HouseStyle/Villa/MountainMoon/MountainMoonCombineGif/First/' + i + this.state.imagesFormat)} onLoad={() => this.handleEachImageLoaded()} key={"image" + currentTime + i} alt="" />
                );
            };
        }
        return this.imageArray;
    }

    // 載入每張圖片後都觸發
    handleEachImageLoaded() {
        // 目前載入的圖片數量+1
        this.setState({
            alreadyLoadingImagesNumber: this.state.alreadyLoadingImagesNumber + 1
        }, () => this.checkAllImagesLoaded())
    }

    // 檢驗全部圖片是否載入完，是的話更新state全部載入完成的狀態
    checkAllImagesLoaded() {
        if (this.state.alreadyLoadingImagesNumber === this.state.totalImagesNumber) {
            this.setState({
                allImagesAreLoaded: true
            }, () => this.desideWhichImageToShow())
        }
    }

    // 設定目前要顯示第幾張圖片(設定state.currentShowingImage)
    setCurrentShowingImageTo(imageNumber) {
        this.setState({
            currentShowingImage: imageNumber
        }, () => this.desideWhichImageToShow())
    }

    // 自動決定目前顯現的圖片 (根據state.currentShowingImage)
    desideWhichImageToShow() {
        // 確認className是否有hidden，如果沒有就加上hidden
        for (let i = 0; i < this.DOMArray.length; i++)
            if (!this.DOMArray[i].classList.contains('hidden')) {
                this.DOMArray[i].classList.add('hidden');
            }
        // 移除目前要顯示的圖片的hidden
        this.DOMArray[this.state.currentShowingImage - 1].classList.remove('hidden');
    }

    // 手指滑動時觸發
    // 滑鼠滑動時觸發(未做)
    handleTouchMove(event) {

        // 檢查手指是往左/右滑動，然後按方向加減圖片顯示第幾張
        if (event.touches[0].screenX - this.state.thisTimeTouch.startX < 0) {  //往左滑，換上一張

            // 每滑動npx則顯示前一張 (n是state.fingerMoveDistanceToChangeImage, 手指每滑過多遠距離(x軸)就換一張圖片)
            if ((event.touches[0].screenX - this.state.thisTimeTouch.startX) % this.state.fingerMoveDistanceToChangeImage === 0) {
                this.setState({
                    thisTimeTouch: {
                        ...this.state.thisTimeTouch,
                        startX: event.touches[0].screenX,
                    }
                })
                let imageNumber = (this.state.currentShowingImage - 1);
                if (imageNumber <= 0) {
                    imageNumber = this.state.totalImagesNumber;
                }
                this.setCurrentShowingImageTo(imageNumber);
            }

        } else if (event.touches[0].screenX - this.state.thisTimeTouch.startX > 0) {  //往右滑，換下一張

            // 每滑動npx則顯示前一張 (n是state.fingerMoveDistanceToChangeImage, 手指每滑過多遠距離(x軸)就換一張圖片)
            if ((event.touches[0].screenX - this.state.thisTimeTouch.startX) % this.state.fingerMoveDistanceToChangeImage === 0) {
                this.setState({
                    thisTimeTouch: {
                        ...this.state.thisTimeTouch,
                        startX: event.touches[0].screenX,
                    }
                })
                let imageNumber = (this.state.currentShowingImage + 1);
                if (imageNumber > this.state.totalImagesNumber) {
                    imageNumber = 1;
                }
                this.setCurrentShowingImageTo(imageNumber);
            }

        }
               // 為了讓下一個手指移動的位置跟這次比較
               this.setState({
                thisTimeTouch: {
                    ...this.state.thisTimeTouch,
                    startX: event.touches[0].screenX,
                    startY: event.touches[0].screenY,
                }
            })
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

    // 點擊播放鈕觸發
    handlePlayButtonClick() {
        this.setState({
            startShowingImageSequence: true,
        })
        // 隱藏播放鈕圖層
        this.hidePlayButtonLayer();
        // 顯現載入圖層
        this.showLoadingLayer();
    }

    // 隱藏播放鈕圖層
    hidePlayButtonLayer() {
        this.setState({
            playerLayerIsShowing: false
        })
    }

    // 顯現載入圖層，並開始更新載入進度
    showLoadingLayer() {
        this.setState({
            loadingLayerIsShowing: true
        }, () => this.updateLoadingProgress());
    }

    // 即時更新載入進度 (文字+進度條長度)
    updateLoadingProgress() {

        // 為了循環執行此函數
        this.requestID = window.requestAnimationFrame(this.updateLoadingProgress);

        console.log("now is in animation frame");
        console.log("state.allImagesAreLoaded: " + this.state.allImagesAreLoaded);

        // 序列禎載入完成時觸發
        if (this.state.allImagesAreLoaded) {
            // 隱藏載入圖層並卸載requestAnimation
            this.hideLoadingLayer();
            // 隱藏模糊圖層
            this.hideBlurPreviewImage();
        } else {
            // 將目前的載入進度(%)設定進state中
            let currentLoadingPercentage = Math.round(this.state.alreadyLoadingImagesNumber / this.state.totalImagesNumber * 100);
            this.setState({
                currentLoadingPercentage: currentLoadingPercentage
            })

            // 進度條長度
            let loadingBarWidth = this.state.currentLoadingPercentage + "%";
            this.progressBarDOMElement.style.width = loadingBarWidth;
        }

    }

    // 隱藏載入圖層並卸載requestAnimation
    hideLoadingLayer() {
        // 隱藏載入圖層
        this.setState({
            loadingLayerIsShowing: false
        })

        // 卸載載入進度條的requestAnimationFrame (見function updateLoadingProgress())
        window.cancelAnimationFrame(this.requestID);
        this.requestID = null;

        console.log("cancle animationframe");
    }

    // 隱藏模糊預覽圖
    hideBlurPreviewImage() {
        this.setState({
            blurPreviewImageIsShowing: false
        })
    }

    // 顯現真實背景圖
    showRealImageSequence() {

    }

    render() {
        return (
            <div className="ImageSequenceFirstContainer" onTouchMove={(event) => this.handleTouchMove(event)} onTouchStart={(event) => this.handleTouchStart(event)} onTouchEnd={() => this.handleTouchEnd()}>

                {/* 播放鈕擊白色半透明覆蓋 */}
                {/* <div className="coverContainer"> */}
                <div className={(this.state.playerLayerIsShowing) ? ("coverContainer") : ("coverContainer hidden")}>
                    <div className="icons" onClick={() => this.handlePlayButtonClick()}>
                        <i className="fas fa-play"></i>
                    </div>
                    <div className="cover"></div>
                </div>

                {/* 載入畫面 */}
                {/* <div className="loadingAnimationContainer"> */}
                <div className={(this.state.loadingLayerIsShowing) ? ("loadingAnimationContainer") : ("loadingAnimationContainer hidden")}>
                    {/* 將內容物置於畫面中間 */}
                    <div className="positioner">

                        {/* 左右置中 */}
                        <div className="upper">
                            {/* 載入動畫容器 */}
                            <div className="animationContainer">
                                {/* 這次選用的動畫 - 百分比 */}
                                <h1 className="count">{this.state.currentLoadingPercentage + "%"}</h1>
                            </div>
                        </div>

                        {/* 左右置中 */}
                        <div className="bottom">
                            {/* 載入條 */}
                            <div className="percentageContainer">
                                {/* 進度條本體 */}
                                <div className="progress-bar">
                                    <span className="bar">
                                        <span className="progress" ref={self => this.progressBarDOMElement = self}></span>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 預覽圖 */}
                {/* <div className="previewImg"> */}
                <div className={(this.state.blurPreviewImageIsShowing) ? ("previewImg") : ("previewImg hidden")}>
                    <img src={require(('../../images/Jghx/HouseStyle/Villa/MountainMoon/MountainMoonCombineGif/First/' + this.state.imageNameStartNumber + this.state.imagesFormat))} alt="" />
                </div>

                {/* 掛載圖片的程式碼 */}
                {(this.state.startShowingImageSequence) ? (this.addImagesIntoPage()) : (null)}
                {/* 掛載後的東西大概長下面這樣 */}
                {/* <img className="image image1 hidden" src={require('../../images/Jghx/HouseStyle/Villa/MountainMoon/MountainMoonCombineGif/' + i +'.png')} onLoad={()=>this.handleEachImageLoaded()} key={"image" + currentTime + i} alt=""/> */}

            </div>
        )
    }
}

export default ImageSequenceFirst;