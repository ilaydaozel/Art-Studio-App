'use client';
import { IUserArtwork } from '@/app/actions/type';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { PointerLockControls } from 'three-stdlib';
import { createRoom } from './Room';
import { createAndHangPaintings } from './Painting';
import {
  checkCollisionWithTheBoundingBox,
  createBoundingBoxOfGroup,
} from './BoundingBox';
import { createInitialRoomLight } from './Light';
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

      createInitialRoomLight(scene);

      const floorDimensions = { width: 100, height: 200 };
      const roomGroup = createRoom(floorDimensions, scene);
      const roomBoundingBox = createBoundingBoxOfGroup(roomGroup);
      createAndHangPaintings(artworks, floorDimensions, scene);

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

        if (checkCollisionWithTheBoundingBox(camera, roomBoundingBox)) {
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
