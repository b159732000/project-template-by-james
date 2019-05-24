import * as THREE from 'three';

window.THREE = THREE;
require('./shaders/CopyShader')
require('./Otherjs/UniformsUtils');
require('./Loaders/FBXLoader');
require('./postprocessing/EffectComposer');
require('./postprocessing/ClearPass');
require('./postprocessing/TexturePass');
require('./postprocessing/ShaderPass');
require('./postprocessing/MaskPass');
require('./Otherjs/WebGL');

export default window.THREE;