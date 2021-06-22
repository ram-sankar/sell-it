import { useEffect, useState } from 'react';
import * as ExpoLocation from 'expo-location';


export default function useLocation() {
    const [location, setLocation] = useState();
    const [error, setError] = useState({});

    const getLocation = async () => {
        try {
            const { granted } = await ExpoLocation.requestPermissionsAsync();
            if (!granted) return;
            const result = await ExpoLocation.getLastKnownPositionAsync();
            if (result) {
                const {
                    coords: { latitude, longitude }
                } = result;
                setLocation({ latitude, longitude });
            }
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    return { location, error };
  }