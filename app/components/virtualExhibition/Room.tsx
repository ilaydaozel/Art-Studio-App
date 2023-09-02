import * as THREE from 'three';
const roomHeight = 40;
export const createFloor = (width: number, height: number) => {
  //Floor
  const planeGeometry = new THREE.PlaneGeometry(width, height);
  const floorTexture = new THREE.TextureLoader().load(
    '/images/darkGrayMarble.jpeg'
  );
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(width / 10, height / 20); // how many times to repeat the texture
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

export const createCeiling = (width: number, height: number) => {
  //Ceiling
  const ceilingTexture = new THREE.TextureLoader().load(
    '/images/wallTexture.jpeg'
  );
  ceilingTexture.wrapS = THREE.RepeatWrapping;
  ceilingTexture.wrapT = THREE.RepeatWrapping;
  ceilingTexture.repeat.set(1, 1); // how many times to repeat the texture
  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({ map: ceilingTexture })
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = roomHeight;
  return ceiling;
};

const createWall = (wallColor: string, width: number) => {
  const wall = new THREE.Mesh(
    new THREE.BoxGeometry(width, roomHeight, 0.001),
    new THREE.MeshBasicMaterial({ color: wallColor })
  );
  wall.position.y = roomHeight / 2;
  return wall;
};

export const createWalls = (width: number, height: number) => {
  //wall group
  const wallGroup = new THREE.Group(); //create a group to hold the walls
  //Front wall
  const frontWall = createWall('#e9e8e6', width);
  frontWall.position.z = -height / 2;
  //Left wall
  const leftWall = createWall('#fcf8f4', height);
  leftWall.position.x = -width / 2;
  leftWall.rotation.y = Math.PI / 2;

  //Right wall
  const rightWall = createWall('#fcf8f4', height);
  rightWall.position.x = width / 2;
  rightWall.rotation.y = Math.PI / 2;

  //Back wall
  const backWall = createWall('#e9e8e6', width);
  backWall.position.z = height / 2;

  wallGroup.add(leftWall, frontWall, rightWall, backWall);
  return wallGroup;
};

export const createBoundingBox = (wallGroup: THREE.Group) => {
  const wallBoundingBoxes: THREE.Box3[] = [];
  for (let i = 0; i < wallGroup.children.length; i++) {
    const wallSideBoundingBox = new THREE.Box3().setFromObject(
      wallGroup.children[i]
    );
    wallBoundingBoxes.push(wallSideBoundingBox);
  }
  return wallBoundingBoxes;
};
