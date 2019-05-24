import React from 'react';
import './Traffic.scss';
// import * as THREE from 'three';
import THREE from '../../ThreeFiles/three.js'
// import * as THREE from 'three';
// import * as THREE from '../../ThreeFiles/three.js';
// import * as THREE from '../../ThreeFiles/three';

const OrbitControls = require("three-orbitcontrols");
const FBXLoader = new window.THREE.FBXLoader();

class Traffic extends React.Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
    this.addCube = this.addCube.bind(this);
    this.initializeCamera = this.initializeCamera.bind(this);
    this.initializeOrbits = this.initializeOrbits.bind(this);
  }
  componentDidMount() {
    this.init();
  }
  init() {
    console.log(FBXLoader);
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    // this.clearPass = new THREE.ClearPass();
    this.scene = new window.THREE.Scene();
    this.camera = new window.THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new window.THREE.WebGLRenderer({ antialias: true });
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    this.initializeOrbits();
    this.initializeCamera();

    const geometry = new window.THREE.BoxGeometry(1, 1, 1);
    const material = new window.THREE.MeshBasicMaterial({ color: 0xFF00FF });
    this.cube = new window.THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
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