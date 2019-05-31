import React from 'react';
import './LoadingPage.scss';
import THREE from '../../ThreeFiles/three.js';
const OrbitControls = require('three-orbitcontrols');

var width, height;
var requestID, renderer, camera, scene, cameraControls;

class LoadingPage extends React.Component {
    constructor(props) {
        super(props);
        // 因為會在奇怪的地方調用這些函數，怕this亂指，所以在此將this綁定在Traffic底下
        this.animate = this.animate.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
    }

    componentDidMount() {
        this.init();
        this.animate();
        window.addEventListener('resize', this.onWindowResize);
    }
    componentWillUnmount() {
        cancelAnimationFrame(requestID);
        window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize() {
        this.updateWindowSize();
    }

    updateWindowSize() {
        width = this.mount.clientWidth;
        height = this.mount.clientHeight;
    }

    init() {
        width = this.mount.clientWidth;
        height = this.mount.clientHeight;

        // 場景
        scene = new window.THREE.Scene();
        scene.background = new THREE.Color(0x404749);

        // 相機
        camera = new window.THREE.PerspectiveCamera(
            60,     //fov
            width / height,   //相機寬縱比
            1,  //相機最近渲染距離
            1000  //相機最遠渲染距離
        )
        camera.position.set(0, 0, 5);

        // 燈光
        // var directionalLight = new THREE.DirectionalLight(0xffffff);
        // directionalLight.position.set(0, 0, 0);
        // scene.add(directionalLight);

        // 正方體
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0xD92040 });
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // 控制器
        cameraControls = new OrbitControls(camera);
        cameraControls.enableDamping = true;    //啟用摩擦力
        cameraControls.dampingFactor = 0.3;    //摩擦力數值 (包含滑動中集滑動結束後)
        cameraControls.rotateSpeed = 0.15;   //旋轉的速度 (靈敏度)
        cameraControls.update();

        // WebGLRenderer可做3D渲染，而CanvasRenderer只能做2D渲染，WebGLRenderer內可設定參數*({})，參考我的OneNote
        renderer = new window.THREE.WebGLRenderer({
            // antialias: false,
            alpha: true,
        })
        renderer.setClearColor(0x404749, 1);    //設定背景色(color, opacity)，如果不起作用，就是scene的背景蓋過了canvas的背景
        renderer.setPixelRatio(window.divicePixelRatio);    //解決高DPI裝置，
        renderer.setSize(width, height);
        renderer.autoClear = false;   //參數 - 是否要清除上一個frame
        this.mount.appendChild(renderer.domElement);
    }

    animate() {
        // 在每一次頁面更新頻率時，都呼叫一次這個函數，形成一個每秒六十次左右的迴圈
        // !!重要!! 必須將此存放在一個變數中，這樣才能在解除component時使用cancelRequestAnimationFrame(該變數)
        requestID = requestAnimationFrame(this.animate);
        // renderer.setClearColor(0xffffff, 0);
        renderer.render(scene, camera);

        // 因應調整視窗大小
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        cameraControls.update();
    }

    render() {
        return (
            <div className="LoadingPageContainer">
                <div className="threeContainer" ref={mount => this.mount = mount}>
                </div>
            </div>
        )
    }
}

export default LoadingPage;