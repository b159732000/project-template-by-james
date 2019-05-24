import React from 'react';
import './Traffic.scss';
import THREE from '../../ThreeFiles/three.js'   //非常重要! 在three.js中，導入了所有Three相關的js庫! 黑科技我還不懂為啥可以用!

const OrbitControls = require("three-orbitcontrols");   //用了npm安裝，並且用ES6的方法導入，如果換成一般的import應該也可以。

// 定義這一頁通用的變數
var composer, renderer;
var box, torus;

class Traffic extends React.Component {
  constructor(props) {
    super(props);

    // 因為會在奇怪的地方調用這些函數，怕this亂指，所以在此將this綁定在Traffic底下
    this.animate = this.animate.bind(this);
    // this.addCube = this.addCube.bind(this);
    // this.initializeCamera = this.initializeCamera.bind(this);
    // this.initializeOrbits = this.initializeOrbits.bind(this);

  }

  componentDidMount() {
    this.init();
    this.animate();
  }

  init() {
    // 建立基本的畫布 START ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // 定義畫布寬高 = 渲染到的Div元件的寬高
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    // 定義相機視野、位置
    var camera = new window.THREE.PerspectiveCamera(
      50, //相機的垂直視野 (是角度360，不是弧度)
      width / height, //相機的外觀比例
      1,  // 相機可視距離近平面
      1000  // 相機可視距離遠平面
    );
    camera.position.z = 10; //相機z軸位置

    // 定義場景，場景內包含物件、光源、相機、以及其他渲染時需要的物件
    var scene1 = new window.THREE.Scene();
    var scene2 = new window.THREE.Scene();

    // 建立兩個物件(Mesh)，並加入場景中。 (在此先給定形狀，後續會補上材質)
    // Mesh(geometry, material) - 網格，結合了幾何圖形和材質，
    // BoxGeometry(x, y, z, x分段, y分段, z分段)
    box = new window.THREE.Mesh(new window.THREE.BoxBufferGeometry(4, 4, 4));
    scene1.add(box);
    torus = new window.THREE.Mesh(new window.THREE.TorusBufferGeometry(3, 1, 16, 32));
    scene2.add(torus);

    // WebGLRenderer可做3D渲染，而CanvasRenderer只能做2D渲染，WebGLRenderer內可設定參數*({})，參考我的OneNote
    renderer = new window.THREE.WebGLRenderer();
    renderer.setClearColor(0xe0e0e0);   //方法 - 設定背景色
    renderer.setPixelRatio(window.devicePixelRatio);  //方法 - 解決高DPI裝置上，顯示不銳利的問題
    renderer.setSize(width, height);  //方法 - 設定寬高
    renderer.autoClear = false;   //參數 - 是否要清除上一個frame
    this.mount.appendChild(renderer.domElement);    //在節點mount添加一個子節點
    // 建立基本的畫布 END ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    // 定義各種後期處裡效果
    var clearPass = new window.THREE.ClearPass();   //清除所有後期處裡效果
    var clearMaskPass = new window.THREE.ClearMaskPass();   //清除遮色片

    var maskPass1 = new window.THREE.MaskPass(scene1, camera);  //類似PS內的遮色片，後續通道只會影響此範圍
    var maskPass2 = new window.THREE.MaskPass(scene2, camera);  //類似PS內的遮色片，後續通道只會影響此範圍

    var texture1 = new window.THREE.TextureLoader().load(require('../../images/Traffic/758px-Canestra_di_frutta_(Caravaggio).jpg'));
    texture1.minFilter = window.THREE.LinearFilter;
    var texture2 = new window.THREE.TextureLoader().load(require('../../images/Traffic/2294472375_24a3b8ef46_o.jpg'));

    var texturePass1 = new window.THREE.TexturePass(texture1);  //紋理通道
    var texturePass2 = new window.THREE.TexturePass(texture2);  //紋理通道

    var outputPass = new window.THREE.ShaderPass(window.THREE.CopyShader);  //ShaderPass是自訂義通道，()內使用CopyShader可以合併計算所有處裡通道的效果

    var parameters = {
      minFilter: window.THREE.LinearFilter,
      magFilter: window.THREE.LinearFilter,
      format: window.THREE.RGBFormat,
      stencilBuffer: true
    };

    var renderTarget = new window.THREE.WebGLRenderTarget(width, height, parameters);   //創造一個渲染圖像的緩衝區，意思是GPU渲染後先暫存著，不顯示在畫面上

    composer = new window.THREE.EffectComposer(renderer, renderTarget);   //特效合成器，用來統整所有處理通道，類似PS的Folder
    composer.addPass(clearPass);        //清除所有後期處裡效果
    composer.addPass(maskPass1);        //添加遮罩1 (由scene1和camera的範圍製作而成)
    composer.addPass(texturePass1);     //應用紋理通道 (紋理1)
    composer.addPass(clearMaskPass);    //清除遮色片
    composer.addPass(maskPass2);        //添加遮罩2 (由scene2和camera的範圍製作而成)
    composer.addPass(texturePass2);     //應用紋理通道 (紋理2)
    composer.addPass(clearMaskPass);    //清除遮色片
    composer.addPass(outputPass);       //輸出所有通道合併計算結果
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
    this.mount.removeChild(renderer.domElement);
  }

  // initializeOrbits() {
  //   this.controls.rotateSpeed = 1.0;
  //   this.controls.zoomSpeed = 1.2;
  //   this.controls.panSpeed = 0.8;
  // }

  // initializeCamera() {
  //   this.camera.position.x = 0;
  //   this.camera.position.y = 0;
  //   this.camera.position.z = 4;
  // }

  animate() {
    // 在每一次頁面更新頻率時，都呼叫一次這個函數，形成一個每秒六十次左右的迴圈
    requestAnimationFrame(this.animate);

    this.changeObjectPosition();
  }

  changeObjectPosition() {
    var time = performance.now() * 0.001;
    box.position.x = Math.cos(time / 1.5) * 2;
    box.position.y = Math.sin(time) * 2;
    box.rotation.x = time;
    box.rotation.y = time / 2;
    torus.position.x = Math.cos(time) * 2;
    torus.position.y = Math.sin(time / 1.5) * 2;
    torus.rotation.x = time;
    torus.rotation.y = time / 2;
    renderer.clear();
    composer.render(time);
  }

  // addCube(cube) {
  //   this.scene.add(cube);
  // }

  render() {
    return (
      <div className="TrafficContainer">
        <div
          id="boardCanvas"
          style={{ width: "100%", height: "100%" }}
          ref={mount => {
            this.mount = mount;
          }}
        />
      </div>
    );
  }
}
export default Traffic;