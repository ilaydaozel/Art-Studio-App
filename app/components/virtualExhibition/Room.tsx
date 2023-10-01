import * as THREE from 'three';
import { CSG } from 'three-csg-ts';

const roomHeight = 40;

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
    new THREE.BoxGeometry(width, roomHeight, 0.1),
    new THREE.MeshPhongMaterial({ color: wallColor })
  );
  wall.position.y = roomHeight / 2;
  return wall;
};

const createWallWithWindow = (floorHeight: number) => {
  const rightWall = createWall('#F8F3FF', floorHeight);

  // Create the window geometry and material
  const windowGeometry = new THREE.BoxGeometry(30, 30, 1); // Adjust the size as needed
  const windowMaterial = new THREE.MeshLambertMaterial({ color: 'brown' });
  const window = new THREE.Mesh(windowGeometry, windowMaterial);

  // Position the window within the right wall (adjust coordinates as needed)
  window.position.set(20, 0, 0);

  rightWall.updateMatrix();
  window.updateMatrix();

  // Convert meshes to CSG objects
  const rightWallCSG = CSG.fromMesh(rightWall);
  const windowCSG = CSG.fromMesh(window);
  // Subtract the window from the right wall using CSG
  const wallWithHoleCSG = rightWallCSG.subtract(windowCSG);

  // Create a new mesh from the resulting CSG object
  const wallWithHoleMesh = CSG.toMesh(
    wallWithHoleCSG,
    rightWall.matrix,
    rightWall.material
  );

  return wallWithHoleMesh;
};

const createAllWalls = (floorWidth: number, floorHeight: number) => {
  const wallGroup = new THREE.Group();
  const wallColor: string = '#FFFFFF';
  const frontWall = createWall(wallColor, floorWidth);
  frontWall.position.z = -floorHeight / 2;

  const leftWall = createWall(wallColor, floorHeight);
  leftWall.position.x = -floorWidth / 2;
  leftWall.rotation.y = Math.PI / 2;

  const rightWall = createWallWithWindow(floorHeight);
  rightWall.position.x = floorWidth / 2;
  rightWall.rotation.y = Math.PI / 2;

  const backWall = createWall(wallColor, floorWidth);
  backWall.position.z = floorHeight / 2;

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
