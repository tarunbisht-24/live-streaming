import React,{ useEffect,useRef } from "react";
import * as THREE from 'three'

import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { Link } from "react-router-dom";


const Home = () => {
    const world={
        plane:{
          width:15,
          height:15,
          widthSegments:15,
          heightSegments:15,
        }
      }
      const mountRef=useRef(null)
    
      useEffect(()=>{
        const mount=mountRef.current
    
      const raycaster=new THREE.Raycaster()
      const scene=new THREE.Scene()
      const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
      const renderer=new THREE.WebGLRenderer()
    
      renderer.setSize(window.innerWidth , window.innerHeight)
      renderer.setPixelRatio(devicePixelRatio)
      mount.appendChild(renderer.domElement)
    
      const controls=new OrbitControls(camera,renderer.domElement)
      controls.enableDamping=true  
    
      camera.position.z=5
    
      const planeGeometry=new THREE.PlaneGeometry(
        world.plane.width,
        world.plane.height,
        world.plane.widthSegments,
        world.plane.heightSegments,)
      const planeMaterial=new THREE.MeshPhongMaterial({
        side:THREE.DoubleSide,
        flatShading:true,
        vertexColors:true
      })
      const planeMesh=new THREE.Mesh(planeGeometry,planeMaterial)
      scene.add(planeMesh)
  
    
      function generatePlane(){
        planeMesh.geometry.dispose()
        planeMesh.geometry=new THREE.PlaneGeometry(
          world.plane.width,
          world.plane.width,
          world.plane.widthSegments,
          world.plane.heightSegments
        )
    
        const {array}=planeMesh.geometry.attributes.position
        for(let i=0;i<array.length;i+=3){
        const x=array[i]
        const y=array[i+1]
        const z=array[i+2]
        array[i+2]=z+Math.random()
      }
    
      const colors=[]
      for (let i=0;i<planeMesh.geometry.attributes.position.count;i++){
        colors.push(0,0.19,0.4)
      }
    
      planeMesh.geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(new Float32Array(colors),3)
      )
    }
    
      generatePlane()
    
      const light=new THREE.DirectionalLight(0xffffff,1)
      light.position.set(1,0,0)
      scene.add(light)
    
      const backLight=new THREE.DirectionalLight(0xffffff,1)
      backLight.position.set(0,0,-1)
      scene.add(backLight)
    
    
      const mouse={
        x:undefined,
        y:undefined,
      }
    
      function animate(){
        requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene,camera)
        raycaster.setFromCamera(mouse,camera)
    
        const intersects=raycaster.intersectObject(planeMesh) 
     
        if (intersects.length > 0) {
          const face = intersects[0].face;
          const colorAttribute = intersects[0].object.geometry.attributes.color;
    
          colorAttribute.setXYZ(face.a, 0.1, 0.5, 1);
          colorAttribute.setXYZ(face.b, 0.1, 0.5, 1);
          colorAttribute.setXYZ(face.c, 0.1, 0.5, 1);
          colorAttribute.needsUpdate = true;
    
          const initialColor={ r:0, g:0.19, b:0.4, }
          const hoverColor={ r:0.1, g:0.5, b:1, }
    
          gsap.to(hoverColor,{
            r:initialColor.r, g:initialColor.g, b:initialColor.b,
            onUpdate:()=>{
              colorAttribute.setXYZ(face.a, hoverColor.r, hoverColor.g, hoverColor.b);
              colorAttribute.setXYZ(face.b, hoverColor.r, hoverColor.g, hoverColor.b);
              colorAttribute.setXYZ(face.c, hoverColor.r, hoverColor.g, hoverColor.b);
              colorAttribute.needsUpdate = true;
            }
          })
        }
      }
    
      animate()
      
    
      addEventListener('mousemove',(e)=>{
        mouse.x=(e.clientX/innerWidth)*2 - 1
        mouse.y=-(e.clientY/innerHeight)*2 + 1
      })

      
    
      return ()=>{
            renderer.setAnimationLoop(null)
            mount.removeChild(renderer.domElement)
          };
        },[])
    
    return  <div ref={mountRef} className="relative w-screen h-screen">
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10">
      <h1 className="text-white text-4xl mb-4">Welcome to Live Stream</h1>
      <div className="flex space-x-4">
        <Link to='/login'>
          <button className="bg-blue-500 hover:bg-black text-white font-bold py-2 px-4 rounded">Login</button>
        </Link>
        <Link to='/register'>
          <button className="bg-blue-500 hover:bg-black text-white font-bold py-2 px-4 rounded">Register</button>
        </Link>
      </div>
    </div>
  </div>   

    }

export default Home







