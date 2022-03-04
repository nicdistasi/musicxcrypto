import * as THREE from 'https://cdn.skypack.dev/three@0.130.0/build/three.module.js';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/controls/OrbitControls.js';
//import { Sky } from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/objects/Sky.js';
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FilmPass } from 'https://cdn.skypack.dev/three@0.130.0/examples/jsm/postprocessing/FilmPass.js';


let app = {
  elem: document.getElementById("background-cont"),
  scene: null,
  renderer: null,
  composer: null,
  camera: null,
  controls: null,
  counter: 0
}

let elems = {
  cubePlane: []
}
  
const init = () => {
  app.renderer = new THREE.WebGLRenderer( { alpha: true } );
  app.renderer.setClearColor( 0x000000, 0 );
  console.log(app.renderer);
  app.renderer.setSize ( window.innerWidth, window.innerHeight);
  app.elem.appendChild (app.renderer.domElement);
  
  app.scene = new THREE.Scene();
  //app.scene.background = new THREE.Color(0x141414);
  
  //app.camera =  new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
  app.camera = new THREE.OrthographicCamera( window.innerWidth / - 50, window.innerWidth / 50, window.innerHeight / 50, window.innerHeight / -50, - 500, 1000); 
  app.camera.position.set(20,5,-20);
  app.controls = new OrbitControls(app.camera, app.renderer.domElement);
  //app.controls.autoRotate = true;


  app.composer = new EffectComposer( app.renderer );


  const renderPass = new RenderPass( app.scene, app.camera );
  app.composer.addPass( renderPass );
  const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 0.5, 0.9, 0.2 );
  app.composer.addPass( bloomPass );
  const filmPass = new FilmPass(0.2, 0, 648, false);
  filmPass.renderToScreen = true;
  app.composer.addPass(filmPass);

  const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 2);
  //app.scene.add(hemiLight);

  const ambientLight = new THREE.HemisphereLight('white', 'darkslategrey', 1);
  app.scene.add(ambientLight);

  const cubeMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const cube = new THREE.Mesh( geometry, cubeMaterial );
  const range = 50;
  for (let x = 0; x <= range; x++) {
    var zRange = [];
    for (let z = 0; z <= range; z++) {
      //parseInt(251-((251-107)*((x/range)+(z/range))/2));
      const m = new THREE.MeshStandardMaterial( { color: 0xffffff } );
      const c = new THREE.Mesh( geometry, m );
      app.scene.add( c );
      c.position.set(x-(range/2), Math.cos(x-(range/2))/2, z-(range/2));
      zRange[z] = c;
    }
    elems.cubePlane[x] = zRange;
  }
  //app.scene.add( cube );


};
  
const render = () => {
  requestAnimationFrame(render);

  app.controls.update();
  //app.renderer.render(app.scene, app.camera);
  app.composer.render();

  app.counter+= 0.1;

  for (let x = 0; x < elems.cubePlane.length; x++) {
    for (let z = 0; z < elems.cubePlane.length; z++) {
      elems.cubePlane[x][z].position.y = Math.cos((((x+z)/4)+app.counter)-(elems.cubePlane.length/2))*4;
      const h = elems.cubePlane[x][z].position.y;
      const r = parseInt(255 * (((h/4)+1)/2));
      const g = parseInt((120 * (((h/4)+1)/2)) + 135);
      const b = 255;
      elems.cubePlane[x][z].material.color.set(`rgb(${r}, ${g}, ${b})`);
    }
  }

  //app.camera.fov = parseInt(((80* ((Math.sin(app.counter/2)+1)/2))+45));

};

window.addEventListener('resize', function() {
  app.camera.aspect = window.innerWidth / window.innerHeight;
  app.camera.updateProjectionMatrix();
  app.renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

document.addEventListener('mousemove', (e) => {
  var valX = (e.pageX / window.innerWidth).toFixed(3);
  var valY = (e.pageY / window.innerHeight).toFixed(3);
  //console.log(valX);
  app.camera.position.set(15 + (valX*10) ,(valY*10),-20);
});
  
init();
render();
