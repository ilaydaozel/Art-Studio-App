import * as THREE from 'three';

export const createInitialRoomLight = (scene: THREE.Scene) => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); //color and intensity
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xdddddd, 0.5);
  sunLight.position.y = 15;
  scene.add(sunLight);
};

const createSpotlight = (
  x: number,
  y: number,
  z: number,
  intensity: number,
  targetPosition: THREE.Vector3
) => {
  const spotlight = new THREE.SpotLight(0xffffff, intensity);
  spotlight.position.set(x, y, z);
  spotlight.target.position.copy(targetPosition);
  spotlight.castShadow = true;
  spotlight.angle = Math.PI / 3;
  spotlight.penumbra = 1;
  spotlight.decay = 1.5;
  spotlight.distance = 40;
  spotlight.shadow.mapSize.width = 1024;
  spotlight.shadow.mapSize.height = 1024;
  return spotlight;
};
