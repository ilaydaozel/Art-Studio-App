import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const setUpOrbitControls = (
  camera: THREE.PerspectiveCamera,
  rendererDomElement: HTMLCanvasElement
) => {
  const controls = new OrbitControls(camera, rendererDomElement);
  controls.listenToKeyEvents(document.body);
  controls.keys = {
    LEFT: 'ArrowLeft', //left arrow
    UP: 'ArrowUp', // up arrow
    RIGHT: 'ArrowRight', // right arrow
    BOTTOM: 'ArrowDown', // down arrow
  };
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.PAN,
  };
  controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN,
  };
  controls.panSpeed = 5;
  controls.target.set(0, 20, -10);
  controls.maxDistance = 2;
  controls.minDistance = 4;
  return controls;
};
