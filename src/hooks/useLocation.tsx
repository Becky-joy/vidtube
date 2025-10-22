import { useState, useEffect } from 'react';

export interface LocationData {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        // First, get coordinates from browser
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });

        const { latitude, longitude } = position.coords;

        // Use a free geolocation API to get detailed location info
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }

        const data = await response.json();

        setLocation({
          country: data.countryName || 'Unknown',
          countryCode: data.countryCode || 'XX',
          region: data.principalSubdivision || 'Unknown',
          city: data.city || data.locality || 'Unknown',
          latitude,
          longitude,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
        setLoading(false);
      } catch (err) {
        console.error('Error getting location:', err);
        setError(err instanceof Error ? err.message : 'Failed to get location');
        setLoading(false);
        
        // Fallback: use timezone to estimate location
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setLocation({
          country: 'Unknown',
          countryCode: 'XX',
          region: 'Unknown',
          city: 'Unknown',
          latitude: 0,
          longitude: 0,
          timezone
        });
      }
    };

    getLocation();
  }, []);

  return { location, loading, error };
};
