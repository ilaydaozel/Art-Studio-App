import React, { useMemo } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface GoogleMapsWidgetProps {
  mapContainerStyle?: { width: string; height: string };
}
const GoogleMapsWidget = ({
  mapContainerStyle = { width: '50%', height: '400px' },
}: GoogleMapsWidgetProps) => {
  const center = useMemo(
    () => ({ lat: 38.41948699951172, lng: 27.132444381713867 }),
    []
  );
  const apiKey = useMemo(() => process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, []);

  return (
    <LoadScript googleMapsApiKey={apiKey || ''}>
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
