import * as THREE from 'three';

const roomHeight = 40;

const createFloor = (width: number, height: number) => {
  const planeGeometry = new THREE.PlaneGeometry(width, height);
  const floorTexture = new THREE.TextureLoader().load(
    '/images/darkGrayMarble.jpeg'
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
  return ceiling;
};

const createWall = (wallColor: string, width: number) => {
  const wall = new THREE.Mesh(
    new THREE.BoxGeometry(width, roomHeight, 0.001),
    new THREE.MeshPhongMaterial({ color: wallColor })
  );
  wall.position.y = roomHeight / 2;
  return wall;
};

const createAllWalls = (width: number, height: number) => {
  const wallGroup = new THREE.Group();

  const frontWall = createWall('#ffffff', width);
  frontWall.position.z = -height / 2;

  const leftWall = createWall('#ffffff', height);
  leftWall.position.x = -width / 2;
  leftWall.rotation.y = Math.PI / 2;

  const rightWall = createWall('#ffffff', height);
  rightWall.position.x = width / 2;
  rightWall.rotation.y = Math.PI / 2;

  const backWall = createWall('#ffffff', width);
  backWall.position.z = height / 2;

  wallGroup.add(leftWall, frontWall, rightWall, backWall);
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
