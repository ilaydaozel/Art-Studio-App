import * as THREE from 'three';

export const createPainting = (url: string, width: number, height: number) => {
  const paintingTexture = new THREE.TextureLoader().load(url);
  const painting = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, 0.2),
    new THREE.MeshBasicMaterial({ map: paintingTexture })
  );
  painting.castShadow = true;
  painting.receiveShadow = true;
  return painting;
};
