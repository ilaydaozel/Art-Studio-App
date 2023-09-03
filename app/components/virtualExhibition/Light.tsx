import * as THREE from 'three';

export const createInitialRoomLight = (scene: THREE.Scene) => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  scene.add(directionalLight);
};
export const createDirectionalLight = (scene: THREE.Scene) => {
  const directionallight = new THREE.DirectionalLight(0xffffff, Math.PI);
  directionallight.target.position.set(-50, 0, 100);
  directionallight.position.set(0, 40, -100);
  directionallight.castShadow = true;
  directionallight.shadow.mapSize.width = 512;
  directionallight.shadow.mapSize.height = 512;
  directionallight.shadow.camera.near = 0.5;
  directionallight.shadow.camera.far = 100;
  scene.add(directionallight);
};

export const createSpotlightForTarget = (targetObject: THREE.Object3D) => {
  const spotlight = new THREE.SpotLight(0xffffff, 30);
  const { x, z } = targetObject.position;
  spotlight.position.set(x, 38, z < 0 ? z + 10 : z - 10);
  spotlight.target = targetObject;
  spotlight.castShadow = true;
  spotlight.angle = Math.PI / 2;
  spotlight.penumbra = 1;
  spotlight.decay = 1.5;
  spotlight.distance = 50;
  spotlight.shadow.mapSize.width = 1024;
  spotlight.shadow.mapSize.height = 1024;
  return spotlight;
};
