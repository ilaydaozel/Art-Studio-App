'use client';
import { IUserArtwork } from '@/app/actions/type';
import React, { useRef, useEffect } from 'react';
import { FaBullseye } from 'react-icons/fa';
import * as THREE from 'three';
import { FlyControls, PointerLockControls } from 'three-stdlib';
import { OrbitControls } from 'three-stdlib';
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
      camera.position.y = 10;
      scene.add(camera);
      //renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xffffff, 1); //backgroundColor
      containerRef.current?.appendChild(renderer.domElement);
      //document.body.appendChild(renderer.domElement);
      //ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); //color and intensity
      scene.add(ambientLight);
      //directional light
      const sunLight = new THREE.DirectionalLight(0xdddddd, 1.0);
      sunLight.position.y = 5;
      scene.add(sunLight);

      //cube
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const cube = new THREE.Mesh(geometry, material); //combine geometry and material
      cube.position.y = 2;
      scene.add(cube);

      //Floor
      const planeGeometry = new THREE.PlaneGeometry(50, 50);
      const floorTexture = new THREE.TextureLoader().load(
        '/images/woodFloor.jpeg'
      );
      floorTexture.wrapS = THREE.RepeatWrapping;
      floorTexture.wrapT = THREE.RepeatWrapping;
      floorTexture.repeat.set(5, 5); // how many times to repeat the texture
      const materialFloor = new THREE.MeshBasicMaterial({
        map: floorTexture,
        side: THREE.DoubleSide,
      });
      const floorPlane = new THREE.Mesh(planeGeometry, materialFloor);
      floorPlane.rotation.x = Math.PI / 2; //90 degrees
      floorPlane.rotation.y = -Math.PI; //180 degrees
      scene.add(floorPlane);

      //wall group
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

      const createPainting = (
        url: string,
        width: number,
        height: number,
        position: THREE.Vector3
      ) => {
        const paintingTexture = new THREE.TextureLoader().load(url);
        const painting = new THREE.Mesh(
          new THREE.BoxGeometry(width, height, 0.1),
          new THREE.MeshBasicMaterial({ map: paintingTexture })
        );
        painting.position.set(position.x, position.y, position.z);
        return painting;
      };
      const painting1 = createPainting(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/711px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg',
        5,
        8,
        new THREE.Vector3(-10, 10, -24.9)
      );
      const painting2 = createPainting(
        'https://m.media-amazon.com/images/I/71Fjd73fu9L._AC_UF1000,1000_QL80_.jpg',
        10,
        5,
        new THREE.Vector3(10, 10, -24.9)
      );
      scene.add(painting1, painting2);
      const wallBoundingBoxes: THREE.Box3[] = [];
      for (let i = 0; i < wallGroup.children.length; i++) {
        const wallSideBoundingBox = new THREE.Box3().setFromObject(
          wallGroup.children[i]
        );
        wallBoundingBoxes.push(wallSideBoundingBox);
      }
      const checkCollision = () => {
        const playerBoundingBox = new THREE.Box3();
        const cameraWorldPosition = new THREE.Vector3();
        camera.getWorldPosition(cameraWorldPosition);
        playerBoundingBox.setFromCenterAndSize(
          cameraWorldPosition,
          new THREE.Vector3(1, 1, 1)
        );
        for (let i = 0; i < wallBoundingBoxes.length; i++) {
          if (playerBoundingBox.intersectsBox(wallBoundingBoxes[i])) {
            return true;
          }
        }
      };
      //controls
      const pointerLockControls = new PointerLockControls(
        camera,
        document.body
      );
      /**
      const orbitControls = new OrbitControls(camera, renderer.domElement);
      orbitControls.enableDamping = true; // Add damping for smooth movement
      orbitControls.dampingFactor = 0.05; // Adjust damping factor
      orbitControls.minDistance = 5; // Set minimum distance from the camera
      orbitControls.maxDistance = 50; // Set maximum distance from the camera
        */

      const startExperience = () => {
        pointerLockControls.lock();
        hideMenu();
      };
      const playButton = document.getElementById('start_button');
      const menu = document.getElementById('menu');
      playButton?.addEventListener('click', startExperience);

      const hideMenu = () => {
        if (menu) {
          menu.style.display = 'none';
        }
      };
      const showMenu = () => {
        if (menu) {
          menu.style.display = 'block';
        }
      };

      const keysPressed: { [key: string]: boolean } = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
        w: false,
        a: false,
        s: false,
        d: false,
      };

      const onKeyDown = (e: KeyboardEvent) => {
        const key: string = e.key;
        if (key in keysPressed) {
          keysPressed[key] = true;
        }
      };
      const onKeyUp = (e: KeyboardEvent) => {
        const key: string = e.key;
        if (key in keysPressed) {
          keysPressed[key] = false;
        }
      };

      document.addEventListener('keydown', onKeyDown, false);
      document.addEventListener('keyup', onKeyUp, false);

      const clock = new THREE.Clock();

      const updateMovement = (delta: number) => {
        const moveSpeed = 5 * delta;
        const previousPosition = camera.position.clone();
        if (keysPressed.ArrowRight || keysPressed.d) {
          pointerLockControls.moveRight(moveSpeed);
        }
        if (keysPressed.ArrowLeft || keysPressed.a) {
          pointerLockControls.moveRight(-moveSpeed);
        }
        if (keysPressed.ArrowUp || keysPressed.w) {
          pointerLockControls.moveForward(moveSpeed);
        }
        if (keysPressed.ArrowDown || keysPressed.s) {
          pointerLockControls.moveForward(-moveSpeed);
        }

        if (checkCollision()) {
          camera.position.copy(previousPosition);
        }
      };

      //render with animation
      let renderLoop = () => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        requestAnimationFrame(renderLoop);
        const delta = clock.getDelta();
        updateMovement(delta);
        renderer.render(scene, camera);
      };
      renderLoop();
    }
  }, []);
  return <div ref={containerRef} />;
};
export default Gallery;
