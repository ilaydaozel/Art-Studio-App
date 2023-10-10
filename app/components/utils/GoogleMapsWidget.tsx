import React, { useMemo } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GoogleMapsWidget = () => {
  const center = useMemo(
    () => ({ lat: 38.41948699951172, lng: 27.132444381713867 }),
    []
  );

  const mapContainerStyle = {
    width: '50%',
    height: '400px',
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={14}
      >
        <Marker position={center} title='Konak Kültür Sanat Akademisi' />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapsWidget;
