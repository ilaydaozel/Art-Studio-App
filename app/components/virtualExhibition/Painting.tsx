import { IUserArtwork } from '@/app/actions/type';
import * as THREE from 'three';

export const createPainting = (url: string, width: number, height: number) => {
  const paintingTexture = new THREE.TextureLoader().load(url);
  const painting = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, 0.2),
    new THREE.MeshLambertMaterial({ map: paintingTexture })
  );
  painting.castShadow = true;
  painting.receiveShadow = true;
  return painting;
};

export const createAndHangPaintings = (
  artworks: IUserArtwork[],
  floorDimensions: { width: number; height: number },
  scene: THREE.Scene
) => {
  let distanceBetween = 20;
  let hangingHeight = 20;
  let wallIndex = 0;
  let currentWallLength = 0; // Keeps track of the current wall's length
  let positionX = 0;
  let positionZ = 0;
  const floorWidth = floorDimensions.width;
  const floorHeight = floorDimensions.height;

  for (let i = 0; i < artworks.length; i++) {
    const artwork: IUserArtwork = artworks[i];
    const artworkWidth: number = artwork.width ? artwork.width / 5 : 10;
    const artworkHeight: number = artwork.height ? artwork.height / 5 : 10;
    const painting = createPainting(
      artwork.artworkMedias[0],
      artworkWidth,
      artworkHeight
    );

    // Check if there's enough space on the current wall, otherwise, switch walls
    if (currentWallLength + artworkWidth + distanceBetween > floorWidth) {
      wallIndex = (wallIndex + 1) % 4; // Switch to the next wall
      currentWallLength = 0; // Reset the current wall's length
    }

    switch (wallIndex) {
      case 0:
        // Front wall
        positionX = -floorWidth / 2 + currentWallLength + distanceBetween;
        positionZ = -(floorHeight / 2 - 0.2);
        break;
      case 1:
        // left wall
        positionZ = -floorHeight / 2 + currentWallLength + distanceBetween;
        positionX = -floorWidth / 2 + 0.2;
        painting.rotation.y = Math.PI / 2;
        break;
      case 2:
        // Back wall
        positionX = floorWidth / 2 - currentWallLength - distanceBetween;
        positionZ = -(floorHeight / 2 - 0.2);
        break;
      case 3:
        // right wall
        positionX = floorWidth / 2 - 0.2;
        positionZ = -floorHeight / 2 + currentWallLength + distanceBetween;
        painting.rotation.y = Math.PI / 2;
        break;
    }
    console.log(artwork.title, ': ', positionX, hangingHeight, positionZ);
    painting.position.set(positionX, hangingHeight, positionZ);
    scene.add(painting);

    currentWallLength += artworkWidth + distanceBetween; // Update the current wall's length
  }
};
