'use client';
import { IUserArtwork } from '@/app/actions/type';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface GalleryProps {
  artworks?: IUserArtwork[];
}
const Gallery = ({ artworks = [] }: GalleryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      //scene
      const scene = new THREE.Scene();
      //camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 15;
      camera.position.y = 5;
      scene.add(camera);
      //renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
      renderer.setClearColor(0xffffff, 1); //backgroundColor
      containerRef.current?.appendChild(renderer.domElement);
      //document.body.appendChild(renderer.domElement);
      //ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); //color and intensity
      scene.add(ambientLight);
      //directional light
      const sunLight = new THREE.DirectionalLight(0xdddddd, 1.0);
      sunLight.position.y = 15;
      scene.add(sunLight);

      //cube
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const cube = new THREE.Mesh(geometry, material); //combine geometry and material
      cube.position.y = 2;
      scene.add(cube);
      //plane
      //Floor
      const planeGeometry = new THREE.PlaneGeometry(50, 50);
      const floorTexture = new THREE.TextureLoader().load(
        '/images/woodFloor.jpeg'
      );
      floorTexture.wrapS = THREE.RepeatWrapping;
      floorTexture.wrapT = THREE.RepeatWrapping;
      floorTexture.repeat.set(12, 30); // how many times to repeat the texture

      const materialFloor = new THREE.MeshBasicMaterial({
        map: floorTexture,
        side: THREE.DoubleSide,
      });
      const floorPlane = new THREE.Mesh(planeGeometry, materialFloor);

      floorPlane.rotation.x = Math.PI / 2; //90 degrees
      floorPlane.rotation.y = -Math.PI; //180 degrees
      scene.add(floorPlane);
      //wall group

      //Create the walls
      const wallGroup = new THREE.Group(); //create a group to hold the walls
      scene.add(wallGroup);

      //Front wall
      const frontTexture = new THREE.TextureLoader().load(
        '/images/grayStone.jpeg'
      );
      frontTexture.wrapS = THREE.RepeatWrapping;
      frontTexture.wrapT = THREE.RepeatWrapping;
      frontTexture.repeat.set(2, 1);
      const frontWall = new THREE.Mesh(
        new THREE.BoxGeometry(50, 20, 0.001),
        new THREE.MeshBasicMaterial({ map: frontTexture })
      );
      frontWall.position.z = -25;
      frontWall.position.y = 10;

      //Left wall
      const leftWall = new THREE.Mesh(
        new THREE.BoxGeometry(50, 20, 0.001),
        new THREE.MeshBasicMaterial({ color: '#F8F8F8' })
      );

      leftWall.position.x = -25;
      leftWall.position.y = 10;
      leftWall.rotation.y = Math.PI / 2;

      //Right wall
      const rightWall = new THREE.Mesh(
        new THREE.BoxGeometry(50, 20, 0.001),
        new THREE.MeshBasicMaterial({ color: '#F8F8F8' })
      );

      rightWall.position.x = 25;
      rightWall.rotation.y = Math.PI / 2;
      rightWall.position.y = 10;
      //Back wall
      const backWall = new THREE.Mesh(
        new THREE.BoxGeometry(50, 20, 0.001),
        new THREE.MeshBasicMaterial({ color: '#F8F8F8' })
      );

      backWall.position.z = 25;
      backWall.position.y = 10;

      wallGroup.add(leftWall, frontWall, rightWall, backWall);

      //Ceiling
      const ceilingTexture = new THREE.TextureLoader().load(
        '/images/textureWall.jpg'
      );
      ceilingTexture.wrapS = THREE.RepeatWrapping;
      ceilingTexture.wrapT = THREE.RepeatWrapping;
      ceilingTexture.repeat.set(20, 25); // how many times to repeat the texture

      const ceiling = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 50),
        new THREE.MeshBasicMaterial({ map: ceilingTexture })
      );

      ceiling.rotation.x = Math.PI / 2;
      ceiling.position.y = 20;

      scene.add(ceiling);
      //controls
      const onKeyDown = (e: any) => {
        const keyCode = e.which;
        if (keyCode == 39) {
          camera.translateX(0.1);
        }
        if (keyCode == 37) {
          camera.translateX(-0.1);
        }
        if (keyCode == 38) {
          camera.translateY(0.1);
        }
        if (keyCode == 40) {
          camera.translateY(-0.1);
        }
        if (keyCode == 68) {
          camera.translateZ(0.1);
        }
        if (keyCode == 69) {
          camera.translateZ(-0.1);
        }
      };
      document.addEventListener('keydown', onKeyDown, false);

      //render with animation
      let renderLoop = () => {
        // Render the scene and camera
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        requestAnimationFrame(renderLoop);
        renderer.render(scene, camera);
      };
      renderLoop();
    }
  }, []);
  return <div ref={containerRef} />;
};
export default Gallery;
