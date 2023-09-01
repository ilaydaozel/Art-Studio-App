import * as THREE from 'three';
export const createFloor = () => {
  //Floor
  const planeGeometry = new THREE.PlaneGeometry(50, 50);
  const floorTexture = new THREE.TextureLoader().load(
    '/images/darkGrayMarble.jpeg'
  );
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(8, 4); // how many times to repeat the texture
  const materialFloor = new THREE.MeshPhongMaterial({
    map: floorTexture,
    side: THREE.DoubleSide,
    shininess: 100,
  });
  const floor = new THREE.Mesh(planeGeometry, materialFloor);
  floor.rotation.x = Math.PI / 2; //90 degrees
  floor.rotation.y = -Math.PI; //180 degrees
  return floor;
};

export const createCeiling = () => {
  //Ceiling
  const ceilingTexture = new THREE.TextureLoader().load(
    '/images/wallTexture.jpeg'
  );
  ceilingTexture.wrapS = THREE.RepeatWrapping;
  ceilingTexture.wrapT = THREE.RepeatWrapping;
  ceilingTexture.repeat.set(1, 1); // how many times to repeat the texture
  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshBasicMaterial({ map: ceilingTexture })
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = 20;
  return ceiling;
};

export const createWalls = () => {
  //wall group
  const wallGroup = new THREE.Group(); //create a group to hold the walls
  //Front wall
  const frontTexture = new THREE.TextureLoader().load('/images/grayStone.jpeg');
  frontTexture.wrapS = THREE.RepeatWrapping;
  frontTexture.wrapT = THREE.RepeatWrapping;
  frontTexture.repeat.set(2, 1);
  const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    new THREE.MeshBasicMaterial({ color: 'F9F9F9' })
  );
  frontWall.position.z = -25;
  frontWall.position.y = 10;

  //Left wall
  const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    new THREE.MeshBasicMaterial({ color: '#F8F8F8' })
  );
  leftWall.position.x = -25;
  leftWall.position.y = 10;
  leftWall.rotation.y = Math.PI / 2;

  //Right wall
  const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    new THREE.MeshBasicMaterial({ color: '#F8F8F8' })
  );
  rightWall.position.x = 25;
  rightWall.rotation.y = Math.PI / 2;
  rightWall.position.y = 10;
  //Back wall
  const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    new THREE.MeshBasicMaterial({ color: '#F8F8F8' })
  );
  backWall.position.z = 25;
  backWall.position.y = 10;

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
