import React, { Component } from "react";
import * as THREE from "three";
import './HouseModel3D.scss';

const OrbitControls = require("three-orbitcontrols");
const FBXLoader = require("three-fbx-loader");

class HouseModel3D extends Component {
    constructor(props) {
        super(props);
        this.animate = this.animate.bind(this);
        this.addCube = this.addCube.bind(this);
    this.initializeCamera = this.initializeCamera.bind(this);
    this.initializeOrbits = this.initializeOrbits.bind(this);
}
componentDidMount() {

    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.scene = new THREE.Scene();
    // this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    this.initializeOrbits();
    this.initializeCamera();
    // this.addLight(0.55, 0.9, 0.5, 5000, 2000, 5000);
    // this.addLight(0.08, 0.8, 0.5, 5000, 2000, 5000);
    // this.addLight(0.995, 0.5, 0.9, 5000, 2000, 5000);
    

    //----------------------
    // 複製自我自己的成功3D圖瀏覽器
    // var loader = new FBXLoader();
  //   loader.load('./lwf/1111.FBX', function (object) {
  //     object.traverse(function (child) {
  //         console.log(child);
  //         if (child.isMesh) {
  
  //             var texture1 = texLoader.load('lwf/' + child.name + 'VRay完成贴图.tga');
  //             var materal1 = new THREE.MeshBasicMaterial({
  //                 map: texture1,
  //                 transparent: true
  //             });
  //             child.material = materal1;
  //             child.castShadow = true;
  //             child.lights = true;
  //         }
  //     })
  
  //     object.scale.set(0.05, 0.05, 0.05);
  //     this.scene.add(object);
  // })
  
//複製自three-fbx-loader
// loader.load(require('../../ThreeFiles/Models/HouseFly/1111.FBX'), function (object3d) {
//   object3d.scale.set(0.05, 0.05, 0.05);
//   this.scene.add(object3d);
// })
  //----------------------------


    const loader = new THREE.TextureLoader();
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0xFF00FF } );
    this.cube = new THREE.Mesh( geometry, material );
    this.scene.add( this.cube );
    this.animate();
  }
componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
    this.mount.removeChild(this.renderer.domElement);
  }
initializeOrbits() {
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
  }
initializeCamera() {
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 4;
  }
animate() {
    this.frameId = window.requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }
addCube(cube) {
    this.scene.add(cube);
  }
// addLight(h, s, l, x, y, z) {
//     var light = new THREE.PointLight(0xffffff, 1.5, 2000);
//     light.color.setHSL(h, s, l);
//     light.position.set(x, y, z);
//     this.scene.add(light);
//     // var lensflare = new THREE.Lensflare();
//     // lensflare.addElement(new THREE.LensflareElement(textureFlare0, 700, 0, light.color));
//     // lensflare.addElement(new THREE.LensflareElement(textureFlare3, 60, 0.6));
//     // lensflare.addElement(new THREE.LensflareElement(textureFlare3, 70, 0.7));
//     // lensflare.addElement(new THREE.LensflareElement(textureFlare3, 120, 0.9));
//     // lensflare.addElement(new THREE.LensflareElement(textureFlare3, 70, 1));
//     // light.add(lensflare);
// }
render() {
    return (
      <div className="houseModel3DContainer">
        <div
          id="boardCanvas"
          ref={mount => {
            this.mount = mount;
          }}
        />
      </div>
    );
  }
}
export default HouseModel3D;