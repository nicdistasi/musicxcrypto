import * as THREE from 'https://cdn.skypack.dev/three@0.130.0/build/three.module.js';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/controls/OrbitControls.js';
//import { Sky } from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/objects/Sky.js';
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FilmPass } from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/postprocessing/FilmPass.js';


let app = {
  elem: document.getElementById("canvas2-cont"),
  scene: null,
  renderer: null,
  composer: null,
  camera: null,
  controls: null,
  counter: 0
}

let line;
  
const init = () => {
  app.renderer = new THREE.WebGLRenderer( { alpha: true } );
  app.renderer.setClearColor( 0x000000, 0 );
  console.log(app.renderer);
  app.renderer.setSize ( app.elem.offsetWidth, app.elem.offsetHeight);
  app.elem.appendChild (app.renderer.domElement);
  
  app.scene = new THREE.Scene();
  //app.scene.background = new THREE.Color(0x141414);
  
  app.camera =  new THREE.PerspectiveCamera( 75, app.elem.offsetWidth / app.elem.offsetHeight, 0.1, 1000 );
  //app.camera = new THREE.OrthographicCamera( window.innerWidth / - 50, window.innerWidth / 50, window.innerHeight / 50, window.innerHeight / -50, - 500, 1000); 
  app.camera.position.set(30,30,30);
  app.controls = new OrbitControls(app.camera, app.renderer.domElement);
  //app.controls.autoRotate = true;


  app.composer = new EffectComposer( app.renderer );


  const renderPass = new RenderPass( app.scene, app.camera );
  app.composer.addPass( renderPass );


  const ambientLight = new THREE.HemisphereLight('white', 'darkslategrey', 1);
  app.scene.add(ambientLight);

  
  const geometry = new THREE.TorusGeometry( 10, 5, 10, 30 );
  const wireframe = new THREE.WireframeGeometry( geometry );
  const material = new THREE.LineBasicMaterial( {color: 0xffffff, linewidth: 2} );
  line = new THREE.LineSegments( wireframe, material );
  //const torus = new THREE.Mesh( geometry, material );
  app.scene.add( line );

};
  
const render = () => {
  requestAnimationFrame(render);

  //app.controls.update();
  //app.renderer.render(app.scene, app.camera);
  app.composer.render();

  app.counter+= 0.05;

  line.rotation.x = app.counter;
  line.rotation.y = app.counter/2;

};

window.addEventListener('resize', function() {
  app.camera.aspect = app.elem.offsetWidth / app.elem.offsetHeight;
  app.camera.updateProjectionMatrix();
  app.renderer.setSize(app.elem.offsetWidth, app.elem.offsetHeight);
}, false);

  
init();
render();