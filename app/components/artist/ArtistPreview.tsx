'use client';

interface ArtistPreviewProps {
  artist: any;
}

const ArtistPreview = ({ artist }: ArtistPreviewProps) => {
  return <div>{artist.user.name}</div>;
};

export default ArtistPreview;
