'use client';
import { IUserArtwork } from '@/app/[lang]/types';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { PointerLockControls } from 'three-stdlib';
import { createRoom } from './Room';
import { createAndHangPaintings } from './Painting';
import {
  checkCollisionWithTheBoundingBox,
  createBoundingBoxOfGroup,
} from './BoundingBox';
import { createInitialRoomLight, createSpotlightForTarget } from './Light';

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
      camera.position.y = 20;
      scene.add(camera);
      //renderer

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xffffff, 1); //backgroundColor
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      containerRef.current?.appendChild(renderer.domElement);

      //createRoom
      createInitialRoomLight(scene);
      const floorDimensions = { width: 100, height: 200 };
      const { ceiling, floor, walls } = createRoom(floorDimensions);
      scene.add(ceiling, floor, walls);
      const roomBoundingBox: THREE.Box3[] = createBoundingBoxOfGroup(walls);
      const paintings = createAndHangPaintings(artworks, floorDimensions);
      for (let i = 0; i < paintings.length; i++) {
        scene.add(paintings[i]);
        const spotlightOfPainting = createSpotlightForTarget(paintings[i]);
        scene.add(spotlightOfPainting);
      }
      //controls
      const controls = new PointerLockControls(camera, document.body);
      controls.lock();

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
        if (key === 'Escape') {
          controls.unlock();
        }
        if (key === 'Enter' || key === 'Return' || key === ' ') {
          controls.lock();
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
        const moveSpeed = 15 * delta;
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
        if (keysPressed.Touch) {
          controls.moveForward(-moveSpeed);
        }

        if (checkCollisionWithTheBoundingBox(camera, roomBoundingBox)) {
          camera.position.copy(previousPosition);
        }
      };

      const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', onWindowResize, false);

      // Render with animation
      const renderLoop = () => {
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
