import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { checkCollisionWithTheBoundingBox } from './BoundingBox';
import { PointerLockControls } from 'three-stdlib';
/*
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
};*/

const setUpOrbitControls = (camera: THREE.Camera, renderer: THREE.Renderer) => {
  const controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.autoRotate = false;
  controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN,
  };

  return controls;
};

export const createMobileControls = (
  camera: THREE.Camera,
  renderer: THREE.Renderer,
  roomBoundingBox: THREE.Box3[]
) => {
  const controls = setUpOrbitControls(camera, renderer);
  const touchState = {
    touchStart: new THREE.Vector3(),
    touchEnd: new THREE.Vector3(),
    touchDelta: new THREE.Vector3(),
  };

  function onTouchStart(event: TouchEvent) {
    const touch = event.touches[0];
    touchState.touchStart.set(touch.clientX, touch.clientY, 0);
  }

  function onTouchMove(event: TouchEvent) {
    const touch = event.touches[0];
    touchState.touchEnd.set(touch.clientX, touch.clientY, 0);
    touchState.touchDelta.subVectors(
      touchState.touchEnd,
      touchState.touchStart
    );

    const sensitivity = 0.1;
    controls.target.addScaledVector(touchState.touchDelta, sensitivity);

    touchState.touchStart.copy(touchState.touchEnd);
  }

  renderer.domElement.addEventListener('touchstart', onTouchStart);
  renderer.domElement.addEventListener('touchmove', onTouchMove);

  const updateMovement = (delta: number) => {
    const moveSpeed = 15 * delta;
    const previousPosition = camera.position.clone();
    controls.update();
    if (checkCollisionWithTheBoundingBox(camera, roomBoundingBox)) {
      camera.position.copy(previousPosition);
    }
  };
  return updateMovement;
};

export const createPointerLockControls = (
  camera: THREE.Camera,
  roomBoundingBox: THREE.Box3[]
) => {
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
  return updateMovement;
};
