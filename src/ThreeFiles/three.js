import * as THREE from 'three';
// import { CopyShader } from './CopyShader';
// import {UniformsUtils} from './Otherjs/UniformsUtils';

window.THREE = THREE;
// window.THREE.UniformsUtils = UniformsUtils;
require('./shaders/CopyShader')
require('./Otherjs/UniformsUtils');
require('./Loaders/FBXLoader');
require('./postprocessing/EffectComposer');
require('./postprocessing/ClearPass');
require('./postprocessing/TexturePass');
require('./postprocessing/ShaderPass');
require('./postprocessing/MaskPass');
require('./Otherjs/WebGL');
// require('./libs/stats.min.js');

export default window.THREE;