import React, { Component } from 'react';
import * as THREE from "./assets/js/three.js";

import {OrbitControls} from "./assets/js/OrbitControls.js";
import {TransformControls} from './assets/js/TransformControls.js';
import {GLTFLoader} from './assets/js/gltfLoader';
import dark from './assets/models/dark.glb'

class ThreeScene extends Component{

    constructor(props){
        super(props);
        
 }

  componentDidMount(){
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    //ADD SCENE
    var scene = new THREE.Scene();
    //ADD CAMERA
    var camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    camera.position.z = 4
    //ADD RENDERER
    var renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor('#ffffff')
    renderer.setSize(window.innerWidth, window.innerHeight)
    this.mount.appendChild(renderer.domElement)
    
    const size = 5;
    const divisions = 30;

    this.gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( this.gridHelper );

    this.light = new THREE.PointLight( 0xffffcc, 20, 200 );
    this.light.position.set( 4, 30, -20 );
    scene.add( this.light );

    this.light2 = new THREE.AmbientLight( 0x20202A, 20, 100 );
    // light2.position.set( 30, -10, 30 );
    scene.add( this.light2 );

    var orbit = new OrbitControls( camera, renderer.domElement );
    orbit.update();
    orbit.addEventListener( 'change', this.render );

    this.control = new TransformControls( this.camera, renderer.domElement );
    this.control.addEventListener( 'change', this.render );

    this.control.addEventListener( 'dragging-changed', function ( event ) {

    this.orbit.enabled = ! event.value;
  });
    var loader = new GLTFLoader();
    loader.crossOrigin = true;
    loader.load( 'https://threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf', function ( data ) {

    console.log(data);
    
        var object = data.scene;
         object.position.set(0, -10, -0.75);

      
        //object.position.y = - 95;
        scene.add( object );
      //, onProgress, onError );
    });
    
    var animate = function() {
      requestAnimationFrame(animate);
  
      renderer.render(scene, camera);
    };
  
    animate();
  }
// componentWillUnmount(){
//     this.stop()
//     this.mount.removeChild(renderer.domElement)
//   }
start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
stop = () => {
    cancelAnimationFrame(this.frameId)
  }
animate = () => {
   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
 }
renderScene = () => {
  this.renderer.render(this.scene, this.camera)
}
render(){
    return(
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}
export default ThreeScene