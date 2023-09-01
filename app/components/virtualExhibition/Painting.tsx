import * as THREE from 'three';

export const createPainting = (
  url: string,
  width: number,
  height: number,
  position: THREE.Vector3
) => {
  const paintingTexture = new THREE.TextureLoader().load(url);
  const painting = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, 0.1),
    new THREE.MeshBasicMaterial({ map: paintingTexture })
  );
  painting.position.set(position.x, position.y, position.z);
  return painting;
};
