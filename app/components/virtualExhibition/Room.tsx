import * as THREE from 'three';
import { createWindowsInTheWall } from './Window';

const roomHeight = 50;

const createFloor = (width: number, height: number) => {
  const planeGeometry = new THREE.PlaneGeometry(width, height);
  const floorTexture = new THREE.TextureLoader().load(
    '/images/woodMarble.jpeg'
  );
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(width / 10, height / 20);
  const materialFloor = new THREE.MeshPhongMaterial({
    map: floorTexture,
    side: THREE.DoubleSide,
    shininess: 100,
  });
  const floor = new THREE.Mesh(planeGeometry, materialFloor);
  floor.rotation.x = Math.PI / 2; //90 degrees
  floor.rotation.y = -Math.PI; //180 degrees
  floor.position.y = 0;
  floor.receiveShadow = true;
  return floor;
};

const createCeiling = (width: number, height: number) => {
  const ceilingTexture = new THREE.TextureLoader().load(
    '/images/wallTexture.jpeg'
  );
  ceilingTexture.wrapS = THREE.RepeatWrapping;
  ceilingTexture.wrapT = THREE.RepeatWrapping;
  ceilingTexture.repeat.set(1, 1);
  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshPhongMaterial({ map: ceilingTexture })
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = roomHeight;
  ceiling.receiveShadow = true;
  return ceiling;
};

const createWall = (wallColor: string, width: number) => {
  const wall = new THREE.Mesh(
    new THREE.BoxGeometry(width, roomHeight, 1),
    new THREE.MeshPhongMaterial({ color: wallColor })
  );
  wall.position.y = roomHeight / 2;
  wall.receiveShadow = true;
  wall.castShadow = true;
  return wall;
};

const createAllWalls = (floorWidth: number, floorHeight: number) => {
  const wallGroup = new THREE.Group();
  const wallColor: string = '#FFFFFF';
  const frontWall = createWall(wallColor, floorWidth);
  frontWall.position.z = -floorHeight / 2;

  const leftWall = createWall(wallColor, floorHeight);
  leftWall.position.x = -floorWidth / 2;
  leftWall.rotation.y = Math.PI / 2;

  let rightWall: THREE.Mesh = createWall('#F8F3FF', floorHeight);
  let rightWallWithWindows: THREE.Mesh = createWindowsInTheWall(rightWall, [
    {
      size: new THREE.Vector2(20, 35),
      position: new THREE.Vector3(-40, 25, 0),
      lightDirection: new THREE.Vector3(-50, 20, 30),
    },
    {
      size: new THREE.Vector2(20, 35),
      position: new THREE.Vector3(40, 25, 0),
      lightDirection: new THREE.Vector3(50, 20, 30),
    },
  ]);
  rightWall = rightWallWithWindows;
  rightWall.position.x = floorWidth / 2;
  rightWall.rotation.y = Math.PI / 2;

  const backWall = createWall(wallColor, floorWidth);
  backWall.position.z = floorHeight / 2;

  wallGroup.add(leftWall, frontWall, backWall, rightWall);
  return wallGroup;
};

export const createRoom = (floorDimensions: {
  width: number;
  height: number;
}) => {
  const { width, height } = floorDimensions;
  const ceiling = createCeiling(width, height);
  const floor = createFloor(width, height);
  const walls = createAllWalls(width, height);
  return { ceiling, floor, walls };
};
