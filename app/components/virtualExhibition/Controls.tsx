import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { checkCollisionWithTheBoundingBox } from './BoundingBox';
import { PointerLockControls } from 'three-stdlib';
import Hammer from 'hammerjs';

const setUpOrbitControls = (camera: THREE.Camera, renderer: THREE.Renderer) => {
  const controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.autoRotate = false;
  controls.touches = {
    ONE: THREE.TOUCH.DOLLY_PAN,
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
  const sensitivity = 0.1;

  const keysPressed: { [key: string]: boolean } = {
    iconUp: false,
    iconDown: false,
    iconLeft: false,
    iconRight: false,
  };

  function onIconPress(event: HammerInput) {
    const iconId = event.target.id;
    if (iconId && iconId in keysPressed) {
      keysPressed[iconId] = true;
    }
  }

  function onIconPressUp(event: HammerInput) {
    const iconId = event.target?.id;
    if (iconId && iconId in keysPressed) {
      keysPressed[iconId] = false;
    }
  }

  const movementIcons = document.getElementById('movementIconsMenu');
  if (movementIcons) {
    const hammerIcons = new Hammer(movementIcons);
    hammerIcons.on('press', onIconPress);
    hammerIcons.on('pressUp', onIconPressUp);
  }

  const updateMovement = (delta: number) => {
    const moveSpeed = 15 * delta * sensitivity;
    const previousPosition = camera.position.clone();
    controls.update();

    if (keysPressed.iconRight) {
      const right = new THREE.Vector3(1, 0, 0);
      controls.target.addScaledVector(right, moveSpeed);
    }
    if (keysPressed.iconLeft) {
      const left = new THREE.Vector3(-1, 0, 0);
      controls.target.addScaledVector(left, moveSpeed);
    }
    if (keysPressed.iconUp) {
      const forward = new THREE.Vector3(0, 0, -1);
      controls.target.addScaledVector(forward, moveSpeed);
    }
    if (keysPressed.iconDown) {
      const backward = new THREE.Vector3(0, 0, 1);
      controls.target.addScaledVector(backward, moveSpeed);
    }
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

  const movementIcons = document.getElementById('movementIconsMenu');
  if (movementIcons) {
    movementIcons.addEventListener('mousedown', onMouseDown, false);
    movementIcons.addEventListener('mouseup', onMouseUp, false);
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
