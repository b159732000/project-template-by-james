import React from 'react';
import './Traffic.scss';
// import * as THREE from 'three';
import THREE from '../../ThreeFiles/three.js'
// import * as THREE from 'three';
// import * as THREE from '../../ThreeFiles/three.js';
// import * as THREE from '../../ThreeFiles/three';

const OrbitControls = require("three-orbitcontrols");
var composer, renderer;
var box, torus;

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
    this.animate();
  }
  init() {

    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    var camera = new window.THREE.PerspectiveCamera( 50, width / height, 1, 1000 );
    camera.position.z = 10;

    var scene1 = new window.THREE.Scene();
    var scene2 = new window.THREE.Scene();

    box = new window.THREE.Mesh( new window.THREE.BoxBufferGeometry( 4, 4, 4 ) );
    scene1.add( box );

    torus = new window.THREE.Mesh( new window.THREE.TorusBufferGeometry( 3, 1, 16, 32 ) );
    scene2.add( torus );

    renderer = new window.THREE.WebGLRenderer();
    renderer.setClearColor( 0xe0e0e0 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.autoClear = false;
    this.mount.appendChild(renderer.domElement);

    //

    var clearPass = new window.THREE.ClearPass();

    var clearMaskPass = new window.THREE.ClearMaskPass();

    var maskPass1 = new window.THREE.MaskPass( scene1, camera );
    var maskPass2 = new window.THREE.MaskPass( scene2, camera );

    var texture1 = new window.THREE.TextureLoader().load( require('../../images/Traffic/758px-Canestra_di_frutta_(Caravaggio).jpg'));
    texture1.minFilter = window.THREE.LinearFilter;
    var texture2 = new window.THREE.TextureLoader().load( require('../../images/Traffic/2294472375_24a3b8ef46_o.jpg') );

    var texturePass1 = new window.THREE.TexturePass( texture1 );
    var texturePass2 = new window.THREE.TexturePass( texture2 );

    var outputPass = new window.THREE.ShaderPass( window.THREE.CopyShader );

    var parameters = {
      minFilter: window.THREE.LinearFilter,
      magFilter: window.THREE.LinearFilter,
      format: window.THREE.RGBFormat,
      stencilBuffer: true
    };

    var renderTarget = new window.THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, parameters );

    composer = new window.THREE.EffectComposer( renderer, renderTarget );
    composer.addPass( clearPass );
    composer.addPass( maskPass1 );
    composer.addPass( texturePass1 );
    composer.addPass( clearMaskPass );
    composer.addPass( maskPass2 );
    composer.addPass( texturePass2 );
    composer.addPass( clearMaskPass );
    composer.addPass( outputPass );
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
    this.mount.removeChild(renderer.domElement);
    // this.mount.removeChild(this.renderer.domElement);
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

    requestAnimationFrame( this.animate );
    var time = performance.now() * 0.001;
    box.position.x = Math.cos( time / 1.5 ) * 2;
    box.position.y = Math.sin( time ) * 2;
    box.rotation.x = time;
    box.rotation.y = time / 2;
    torus.position.x = Math.cos( time ) * 2;
    torus.position.y = Math.sin( time / 1.5 ) * 2;
    torus.rotation.x = time;
    torus.rotation.y = time / 2;
    renderer.clear();
    composer.render( time );
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