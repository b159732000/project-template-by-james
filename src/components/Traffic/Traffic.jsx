import React from 'react';
import './Traffic.scss';
import THREE from '../../ThreeFiles/three.js'   //非常重要! 在three.js中，導入了所有Three相關的js庫! 黑科技我還不懂為啥可以用!
import { TransitionGroup, CSSTransition } from "react-transition-group";

const OrbitControls = require("three-orbitcontrols");   //用了npm安裝，並且用ES6的方法導入，如果換成一般的import應該也可以。

// 定義這一頁通用的變數
var composer, renderer;
var box, torus;

class Traffic extends React.Component {
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

    // 因為會在奇怪的地方調用這些函數，怕this亂指，所以在此將this綁定在Traffic底下
    this.animate = this.animate.bind(this);
    // this.addCube = this.addCube.bind(this);
    // this.initializeCamera = this.initializeCamera.bind(this);
    // this.initializeOrbits = this.initializeOrbits.bind(this);
  }

  componentDidMount() {
    // this.init();
    // this.animate();
  }
  componentWillUnmount() {
    // cancelAnimationFrame(this.frameId);
    // this.mount.removeChild(renderer.domElement);
  }

  // Three.js Start -------
  init() {
    // 建立基本的畫布 START ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // 定義畫布寬高 = 渲染到的Div元件的寬高
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    // 定義相機視野、位置
    var camera = new window.THREE.PerspectiveCamera(
      60, //相機的垂直視野 (是角度360，不是弧度)
      width / height, //相機的外觀比例
      1,  // 相機可視距離近平面
      1000  // 相機可視距離遠平面
    );
    camera.position.z = 10; //相機z軸位置

    // 定義場景，場景內包含物件、光源、相機、以及其他渲染時需要的物件
    var scene = new window.THREE.Scene();   //雲狀特效用的scene
    // var scene1 = new window.THREE.Scene();
    // var scene2 = new window.THREE.Scene();

    // 光源
    var ambient = new window.THREE.AmbientLight(0x555555);
    scene.add(ambient);
    var directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0,0,1);
    scene.add(directionalLight);

    // 建立兩個物件(Mesh)，並加入場景中。 (在此先給定形狀，後續會補上材質)
    // Mesh(geometry, material) - 網格，結合了幾何圖形和材質，
    // BoxGeometry(x長度, y長度, z長度, x分段, y分段, z分段)
    // box = new window.THREE.Mesh(new window.THREE.BoxBufferGeometry(1, 1, 1));
    // scene1.add(box);
    // torus = new window.THREE.Mesh(new window.THREE.TorusBufferGeometry(1, 0.1, 16, 32));
    // scene2.add(torus);

    // WebGLRenderer可做3D渲染，而CanvasRenderer只能做2D渲染，WebGLRenderer內可設定參數*({})，參考我的OneNote
    renderer = new window.THREE.WebGLRenderer({
      antialias: false,
      // alpha: true
    });
    // renderer.setClearColor(0xffffff, 0);   //方法 - 設定背景色
    renderer.setClearColor(0xe0e0e0);   //方法 - 設定背景色
    renderer.setPixelRatio(window.devicePixelRatio);  //方法 - 解決高DPI裝置上，顯示不銳利的問題
    renderer.setSize(width, height);  //方法 - 設定寬高
    renderer.autoClear = false;   //參數 - 是否要清除上一個frame
    this.mount.appendChild(renderer.domElement);    //在節點mount添加一個子節點
    // 建立基本的畫布 END ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑


    // 使用雲狀照片
    var loader = new THREE.TextureLoader();
    loader.load(require('../../images/Traffic/ThreeImg/smoke_1.png'), function (texture) {

      var cloudGeo = new THREE.PlaneBufferGeometry(500, 500);   //定義2D四邊形，用以裝載紋理
      var cloudMaterial = new window.THREE.MeshLambertMaterial({    //可模擬木材石材等表面，但不能模擬有反光的表面，如塗漆木材、鏡面
        map: texture,
        // transparent: true,
      })

      for (let p = 0; p < 25; p++) {   //加入25個cloud圖片
        let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);  //建立物件，結合了幾何圖形和材質
        cloud.position.set(     //物件的位置
          // Math.random() * 800 - 400,
          // 500,
          // Math.random() * 500 - 450
          0,
          0,
          0
        );
        cloud.rotation.x = 1.16;    //讓物件朝向相機
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random() * 360;
        // cloud.material.opacity = 0.6;
        scene.add(cloud);
      }

    })


    // 定義各種後期處裡效果
    // var clearPass = new window.THREE.ClearPass();   //清除所有後期處裡效果
    // var clearMaskPass = new window.THREE.ClearMaskPass();   //清除遮色片

    // var maskPass1 = new window.THREE.MaskPass(scene1, camera);  //類似PS內的遮色片，後續通道只會影響此範圍
    // var maskPass2 = new window.THREE.MaskPass(scene2, camera);  //類似PS內的遮色片，後續通道只會影響此範圍

    // var texture1 = new window.THREE.TextureLoader().load(require('../../images/Traffic/758px-Canestra_di_frutta_(Caravaggio).jpg'));
    // texture1.minFilter = window.THREE.LinearFilter;
    // var texture2 = new window.THREE.TextureLoader().load(require('../../images/Traffic/2294472375_24a3b8ef46_o.jpg'));

    // var texturePass1 = new window.THREE.TexturePass(texture1);  //紋理通道
    // var texturePass2 = new window.THREE.TexturePass(texture2);  //紋理通道

    // var outputPass = new window.THREE.ShaderPass(window.THREE.CopyShader);  //ShaderPass是自訂義通道，()內使用CopyShader可以合併計算所有處裡通道的效果

    var parameters = {
      minFilter: window.THREE.LinearFilter,
      magFilter: window.THREE.LinearFilter,
      format: window.THREE.RGBAFormat,  //使用RGBA而非原本的RGB，才能使背景透明
      stencilBuffer: true,
    };
    var renderTarget = new window.THREE.WebGLRenderTarget(width, height, parameters);   //創造一個渲染圖像的緩衝區，意思是GPU渲染後先暫存著，不顯示在畫面上

    composer = new window.THREE.EffectComposer(renderer, renderTarget);   //特效合成器，用來統整所有處理通道，類似PS的Folder，將renderTarget暫存的東西渲染到主renderer
    // composer.addPass(clearPass);        //清除所有後期處裡效果
    // composer.addPass(maskPass1);        //添加遮罩1 (由scene1和camera的範圍製作而成)
    // composer.addPass(texturePass1);     //應用紋理通道 (紋理1)
    // composer.addPass(clearMaskPass);    //清除遮色片
    // composer.addPass(maskPass2);        //添加遮罩2 (由scene2和camera的範圍製作而成)
    // composer.addPass(texturePass2);     //應用紋理通道 (紋理2)
    // composer.addPass(clearMaskPass);    //清除遮色片
    // composer.addPass(outputPass);       //輸出所有通道合併計算結果
  }

  animate() {
    requestAnimationFrame(this.animate);    // 在每一次頁面更新頻率時，都呼叫一次這個函數，形成一個每秒六十次左右的迴圈
    // this.changeObjectPosition();
  }

  changeObjectPosition() {
    // var time = performance.now() * 0.001;   //performance.now代表執行到此行時，程式已經執行多久的瞬間時間，單位是毫秒
    // box.position.x = Math.cos(time / 1.5) * 2;    //cos在0-90度時是1~0
    // box.position.y = Math.sin(time) * 2;    //sin在0-90度時是0~1
    // box.rotation.x = time;
    // box.rotation.y = time / 2;
    // torus.position.x = Math.cos(time) * 2;
    // torus.position.y = Math.sin(time / 1.5) * 2;
    // torus.rotation.x = time;
    // torus.rotation.y = time / 2;
    // renderer.clear();
    // composer.render(time);
  }
  // Three.js END -------




  // 換頁程式碼 START --------
  handlePagerClick(pageNumber) {
    this.changePageTo(pageNumber);
    // this.changeBgImgUrl();
  }
  changePageTo(pageNumber) {
    this.setState({
      currentPageIndex: pageNumber,
    }, () => setTimeout(() => this.changeBgImgUrl(), 0));
    // }, () => setTimeout(() => this.changeBgImgUrl(), 500));
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
    if(Math.abs(event.touches[0].screenY - this.state.thisTimeTouch.startY) >= 50 && this.state.thisTimeTouch.pageIsChanged === false) {
      if(event.touches[0].screenY - this.state.thisTimeTouch.startY < 0) {  //換下一頁
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
    } else {
      // console.log("page not change");
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
      <div className="TrafficContainer" onTouchMove={(event)=>this.handleTouchScroll(event)} onTouchStart={(event)=>this.handleTouchStart(event)} onTouchEnd={()=>this.handleTouchEnd()}>
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
    );
  }
}
export default Traffic;