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
      camera.position.z = 5;
      camera.position.y = 10;
      scene.add(camera);
      //renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xffffff, 1); //backgroundColor
      containerRef.current?.appendChild(renderer.domElement);

      //ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); //color and intensity
      scene.add(ambientLight);
      //directional light
      const sunLight = new THREE.DirectionalLight(0xdddddd, 1.0);
      sunLight.position.y = 5;
      scene.add(sunLight);

      const ceiling = createCeiling();
      const floor = createFloor();
      const walls = createWalls();
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

      let xlocation = -15;
      artworks.map((artwork) => {
        const width: number = artwork.width ? artwork.width / 10 : 5;
        const height: number = artwork.height ? artwork.height / 10 : 8;
        const painting = createPainting(
          artwork.artworkMedias[0],
          width,
          height,
          new THREE.Vector3(xlocation, 10, -24.9)
        );
        scene.add(painting);
        xlocation += width + 10;
      });
      //controls
      const controls = new PointerLockControls(camera, document.body);

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
