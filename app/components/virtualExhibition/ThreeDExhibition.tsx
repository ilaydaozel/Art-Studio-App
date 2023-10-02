'use client';
import { IArtwork } from '@/app/types';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { PointerLockControls } from 'three-stdlib';
import { createRoom } from './Room';
import { createAndHangPaintings } from './Painting';
import {
  checkCollisionWithTheBoundingBox,
  createBoundingBoxOfGroup,
} from './BoundingBox';
import { createInitialRoomLight, createSpotlightWithTarget } from './Light';
import { createMobileControls, createPointerLockControls } from './Controls';

interface ThreeDExhibitionProps {
  artworks?: IArtwork[];
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
        const spotlightOfPainting = createSpotlightWithTarget(paintings[i]);
        scene.add(spotlightOfPainting);
      }
      //controls
      /*const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );*/

      const isMobileDevice =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;

      const updateMovement = isMobileDevice
        ? createMobileControls(camera, renderer, roomBoundingBox)
        : createPointerLockControls(camera, roomBoundingBox);
      const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', onWindowResize, false);

      // Render with animation
      const clock = new THREE.Clock();
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
