import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { checkCollisionWithTheBoundingBox } from './BoundingBox';
import { PointerLockControls } from 'three-stdlib';

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

const setUpPointerLockControls = (camera: THREE.Camera) => {
  return new PointerLockControls(camera, document.body);
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
  const controls = setUpPointerLockControls(camera);
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
    iconUp: false,
    iconDown: false,
    iconLeft: false,
    iconRight: false,
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const key: string = e.key;
    console.log();
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

  const onMouseDown = (e: MouseEvent) => {
    const clickedIconId = (e.target as HTMLElement)?.id; // Get the id attribute of the clicked icon
    if (clickedIconId && clickedIconId in keysPressed) {
      keysPressed[clickedIconId] = true;
    }
  };
  const onMouseUp = (e: MouseEvent) => {
    const clickedIconId = (e.target as HTMLElement)?.id; // Get the id attribute of the clicked icon
    if (clickedIconId && clickedIconId in keysPressed) {
      keysPressed[clickedIconId] = false;
    }
  };

  const movementKeys = document.getElementById('movementIconsMenu');
  if (movementKeys) {
    movementKeys.addEventListener('mousedown', onMouseDown, false);
    movementKeys.addEventListener('mouseup', onMouseUp, false);
  }

  const updateMovement = (delta: number) => {
    const moveSpeed = 15 * delta;
    const previousPosition = camera.position.clone();
    if (keysPressed.ArrowRight || keysPressed.d || keysPressed.iconRight) {
      controls.moveRight(moveSpeed);
    }
    if (keysPressed.ArrowLeft || keysPressed.a || keysPressed.iconLeft) {
      controls.moveRight(-moveSpeed);
    }
    if (keysPressed.ArrowUp || keysPressed.w || keysPressed.iconUp) {
      controls.moveForward(moveSpeed);
    }
    if (keysPressed.ArrowDown || keysPressed.s || keysPressed.iconDown) {
      controls.moveForward(-moveSpeed);
    }

    if (checkCollisionWithTheBoundingBox(camera, roomBoundingBox)) {
      camera.position.copy(previousPosition);
    }
  };
  return updateMovement;
};
