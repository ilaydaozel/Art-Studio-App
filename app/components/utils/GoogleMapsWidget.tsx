import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
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

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      // Check if the Google Maps script is already loaded
      if (window.google) {
        setIsLoading(false);
      } else {
        loadGoogleMapsScript();
      }
    }
  };

  const loadGoogleMapsScript = () => {
    setIsLoading(true);
    console.log('here');
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=console.debug&libraries=maps,marker&v=beta`;
    script.async = true;
    script.onload = () => {
      setIsLoading(false);
    };
    script.onerror = () => {
      setIsLoading(false);
      console.error('Google Maps API failed to load');
    };
    document.head.appendChild(script);
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
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={14}
        >
          <Marker position={center} title='Konak Kültür Sanat Akademisi' />
        </GoogleMap>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default GoogleMapsWidget;
