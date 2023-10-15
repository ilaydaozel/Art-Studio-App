import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Spinner from './Spinner';

interface GoogleMapsWidgetProps {
  mapContainerStyle?: { width: string; height: string };
}
const GoogleMapsWidget = ({
  mapContainerStyle = { width: '50%', height: '400px' },
}: GoogleMapsWidgetProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const center = useMemo(
    () => ({ lat: 38.41948699951172, lng: 27.132444381713867 }),
    []
  );
  const apiKey = useMemo(() => process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, []);
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    });
    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={mapContainerStyle}
      className='outline outline-1 outline-neutral-400 flex justify-center items-center'
    >
      {!isLoading ? (
        <LoadScript googleMapsApiKey={apiKey || ''}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={14}
          >
            <Marker position={center} title='Konak Kültür Sanat Akademisi' />
          </GoogleMap>
        </LoadScript>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default GoogleMapsWidget;
