'use client';
import { IUserArtwork } from '@/app/actions/type';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { PointerLockControls } from 'three-stdlib';
import {
  createBoundingBox,
  createCeiling,
  createFloor,
  createWalls,
} from './Room';
import { createPainting } from './Painting';
interface ThreeDExhibitionProps {
  artworks?: IUserArtwork[];
}
const ThreeDExhibition = ({ artworks = [] }: ThreeDExhibitionProps) => {
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
      camera.position.z = 0;
      camera.position.y = 18;
      scene.add(camera);
      //renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xffffff, 1); //backgroundColor
      containerRef.current?.appendChild(renderer.domElement);

      //ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); //color and intensity
      scene.add(ambientLight);
      //directional light
      const sunLight = new THREE.DirectionalLight(0xdddddd, 0.5);
      sunLight.position.y = 5;
      scene.add(sunLight);

      const floorWidth = 100;
      const floorHeight = 200;

      const ceiling = createCeiling(floorWidth, floorHeight);
      const floor = createFloor(floorWidth, floorHeight);
      const walls = createWalls(floorWidth, floorHeight);
      const wallsBoundingBox = createBoundingBox(walls);
      scene.add(ceiling, floor, walls);

      const checkCollision = () => {
        const playerBoundingBox = new THREE.Box3();
        const cameraWorldPosition = new THREE.Vector3();
        camera.getWorldPosition(cameraWorldPosition);
        playerBoundingBox.setFromCenterAndSize(
          cameraWorldPosition,
          new THREE.Vector3(1, 1, 1)
        );
        for (let i = 0; i < wallsBoundingBox.length; i++) {
          if (playerBoundingBox.intersectsBox(wallsBoundingBox[i])) {
            return true;
          }
        }
      };
      const hangPaintings = () => {
        let distanceBetween = 20;
        let hangingHeight = 20;
        let wallIndex = 0;
        let currentWallLength = 0; // Keeps track of the current wall's length
        let positionX = 0;
        let positionZ = 0;

        for (let i = 0; i < artworks.length; i++) {
          const artwork: IUserArtwork = artworks[i];
          const width: number = artwork.width ? artwork.width / 5 : 10;
          const height: number = artwork.height ? artwork.height / 5 : 10;
          const painting = createPainting(
            artwork.artworkMedias[0],
            width,
            height
          );

          // Check if there's enough space on the current wall, otherwise, switch walls
          if (currentWallLength + width + distanceBetween > floorWidth) {
            wallIndex = (wallIndex + 1) % 4; // Switch to the next wall
            currentWallLength = 0; // Reset the current wall's length
          }

          switch (wallIndex) {
            case 0:
              // Front wall
              positionX = -floorWidth / 2 + currentWallLength + distanceBetween;
              positionZ = -(floorHeight / 2 - 0.2);
              break;
            case 1:
              // left wall
              positionZ =
                -floorHeight / 2 + currentWallLength + distanceBetween;
              positionX = -floorWidth / 2 + 0.2;
              painting.rotation.y = Math.PI / 2;
              break;
            case 2:
              // Back wall
              positionX = floorWidth / 2 - currentWallLength - distanceBetween;
              positionZ = -(floorHeight / 2 - 0.2);
              break;
            case 3:
              // right wall
              positionX = floorWidth / 2 - 0.2;
              positionZ =
                -floorHeight / 2 + currentWallLength + distanceBetween;
              painting.rotation.y = Math.PI / 2;
              break;
          }

          painting.position.set(positionX, hangingHeight, positionZ);
          scene.add(painting);

          currentWallLength += width + distanceBetween; // Update the current wall's length
        }
      };

      hangPaintings();

      //controls
      const controls = new PointerLockControls(camera, document.body);

      const hideMenu = () => {
        const menu = document.getElementById('menu');
        if (menu) {
          menu.style.display = 'none'; // Hide the menu
        }
      };

      const showMenu = () => {
        const menu = document.getElementById('menu');
        if (menu) {
          menu.style.display = 'block'; // Show the menu
        }
      };

      // Lock the pointer (controls are activated) and hide the menu when the experience starts
      const startExperience = () => {
        controls.lock(); // Lock the pointer (controls are activated)
        hideMenu();
      };

      const setupPlayButton = () => {
        const playButton = document.getElementById('play_button'); // Get the reference
        if (playButton) {
          console.log('start');
          playButton.addEventListener('click', () => startExperience()); // Add the click event listener to the play button to start the experience
        }
      };
      setupPlayButton();

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
        /*if (key === 'Escape') {
          showMenu();
          controls.unlock();
        }
        if (key === 'Enter' || key === 'Return') {
          hideMenu();
          controls.lock();
        }*/
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
        const moveSpeed = 7 * delta;
        const previousPosition = camera.position.clone();
        if (keysPressed.ArrowRight || keysPressed.d) {
          controls.moveRight(moveSpeed);
        }
        if (keysPressed.ArrowLeft || keysPressed.a) {
          controls.moveRight(-moveSpeed);
        }
        if (keysPressed.ArrowUp || keysPressed.w) {
          controls.moveForward(moveSpeed);
        }
        if (keysPressed.ArrowDown || keysPressed.s) {
          controls.moveForward(-moveSpeed);
        }

        if (checkCollision()) {
          camera.position.copy(previousPosition);
        }
      };

      //render with animation
      let renderLoop = () => {
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
export default ThreeDExhibition;
