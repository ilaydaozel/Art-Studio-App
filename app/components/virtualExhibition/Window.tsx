import * as THREE from 'three';
import { CSG } from 'three-csg-ts';

const createHole = (size: THREE.Vector2, position: THREE.Vector3) => {
  const geometry = new THREE.BoxGeometry(size.x, size.y, 1);
  const material = new THREE.MeshLambertMaterial();
  const hole = new THREE.Mesh(geometry, material);
  hole.position.set(position.x, position.y, position.z);
  return hole;
};

const subtractTheHoleFromTheWall = (wall: THREE.Mesh, hole: THREE.Mesh) => {
  wall.updateMatrix();
  hole.updateMatrix();

  // Convert meshes to CSG objects
  const wallCSG = CSG.fromMesh(wall);
  const holeCSG = CSG.fromMesh(hole);

  // Subtract the window from the right wall using CSG
  const wallWithHoleCSG = wallCSG.subtract(holeCSG);
  const wallWithHole = CSG.toMesh(wallWithHoleCSG, wall.matrix, wall.material);
  return wallWithHole;
};

const createGlass = (size: THREE.Vector2) => {
  const iceBlue = '#d3f2f5';
  const glassGeometry = new THREE.BoxGeometry(size.x, size.y, 0.5);
  const glassMaterial = new THREE.MeshLambertMaterial({
    color: iceBlue,
    transparent: true,
    opacity: 0.4,
  });
  const glass = new THREE.Mesh(glassGeometry, glassMaterial);

  return glass;
};

export const createWindowIntheWall = (
  wall: THREE.Mesh,
  size: THREE.Vector2,
  position: THREE.Vector3
) => {
  const windowHole = createHole(size, position);
  const wallWithHole = subtractTheHoleFromTheWall(wall, windowHole);
  const glass = createGlass(size);
  glass.position.set(
    position.x,
    position.y - wall.position.y,
    position.z - 0.5
  );
  wallWithHole.add(glass);
  return wallWithHole;
};
