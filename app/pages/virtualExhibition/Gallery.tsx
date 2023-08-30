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
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(renderer.domElement);
      camera.position.z = 5;

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // Render the scene and camera
      renderer.render(scene, camera);
      /** 
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight / 2);
      containerRef.current?.appendChild(renderer.domElement);
      //camera position
      camera.position.z = 0;
      camera.position.y = 5;

      //Ambient Light
      let ambientLight = new THREE.AmbientLight(0xffffff, 0.8); //color, intensity, distance, decay
      ambientLight.position.x = camera.position.x; //light follows camera
      ambientLight.position.y = camera.position.y;
      ambientLight.position.z = camera.position.z;
      scene.add(ambientLight);

      
      //Floor
      const planeGeometry = new THREE.PlaneGeometry(40, 50);
      const floorTexture = new THREE.TextureLoader().load('/images/marmer.jpg');
      floorTexture.wrapS = THREE.RepeatWrapping;
      floorTexture.wrapT = THREE.RepeatWrapping;
      floorTexture.repeat.set(10, 20); // how many times to repeat the texture

      const materialFloor = new THREE.MeshPhongMaterial();
      materialFloor.map = floorTexture;
      materialFloor.side = THREE.DoubleSide;
      const floor = new THREE.Mesh(planeGeometry, materialFloor);

      floor.rotation.x = Math.PI / 2; //90 degrees
      scene.add(floor);

      const artworkPlanes = [];
      let ZCount = -10;

      const light = new THREE.SpotLight(0xff000f, 1, 1, 1, 0.8, 1);
      scene.add(light);
      //renderer.shadowMap.enabled = true
      //renderer.shadowMap.type = THREE.PCFSoftShadowMap
      light.position.x = -15;
      light.position.z = 0;
      light.position.y = 20;

      const data = {
        color: light.color.getHex(),
        mapsEnabled: true,
        //shadowMapSizeWidth: 512,
        //shadowMapSizeHeight: 512,
      };

      for (let i = 0; i < artworks.length; i++) {
        const planeGeometry = new THREE.BoxGeometry(7, 7, 0.3);
        const artTexture = new THREE.TextureLoader().load(
          artworks[i].artworkMedias[0]
        );
        console.log(artworks[i].artworkMedias[0]);
        const artworkMaterial = new THREE.MeshPhongMaterial();
        artworkMaterial.map = artTexture;
        const artworkCanvas = new THREE.Mesh(planeGeometry, artworkMaterial);
        artworkCanvas.position.x = -19;
        artworkCanvas.rotation.y = Math.PI / 2;
        artworkCanvas.position.z = ZCount;
        artworkCanvas.position.y = 7;
        scene.add(artworkCanvas);
        ZCount += 12;
        artworkPlanes.push(artworkCanvas);
      }

      //Create the walls
      const wallGroup = new THREE.Group(); //create a group to hold the walls
      scene.add(wallGroup);

      //Front wall
      const frontWall = new THREE.Mesh(
        new THREE.BoxGeometry(40, 20, 0.001),
        new THREE.MeshLambertMaterial({ color: '#f2f2f2' })
      );
      frontWall.position.z = -25;
      frontWall.position.y = 10;

      //Left wall
      const leftWall = new THREE.Mesh(
        new THREE.BoxGeometry(50, 20, 0.001),
        new THREE.MeshLambertMaterial({ color: '#f9f9f9' })
      );

      leftWall.position.x = -20;
      leftWall.position.y = 10;
      leftWall.rotation.y = Math.PI / 2;

      //Right wall
      const rightWall = new THREE.Mesh(
        new THREE.BoxGeometry(50, 20, 0.001),
        new THREE.MeshLambertMaterial({ color: '#f9f9f9' })
      );

      rightWall.position.x = 20;
      rightWall.rotation.y = Math.PI / 2;
      rightWall.position.y = 10;
      wallGroup.add(frontWall, leftWall, rightWall);

      //Ceiling
      const ceilingTexture = new THREE.TextureLoader().load(
        '/images/textureWall.jpg'
      );
      ceilingTexture.wrapS = THREE.RepeatWrapping;
      ceilingTexture.wrapT = THREE.RepeatWrapping;
      ceilingTexture.repeat.set(20, 25); // how many times to repeat the texture

      const ceiling = new THREE.Mesh(
        new THREE.PlaneGeometry(40, 50),
        new THREE.MeshPhongMaterial({ map: ceilingTexture })
      );

      ceiling.rotation.x = Math.PI / 2;
      ceiling.position.y = 20;

      scene.add(ceiling);
        
      const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
      };
      window.addEventListener('resize', onWindowResize, false);
      const animate = () => {
        requestAnimationFrame(animate);
        render();
      };

      const render = () => {
        renderer.render(scene, camera);
      };

      animate();

      // Render the scene and camera
      renderer.render(scene, camera);
      **/
    }
  }, []);
  return <div ref={containerRef} />;
};
export default Gallery;
