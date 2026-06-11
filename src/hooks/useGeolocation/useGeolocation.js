import { useEffect, useState } from 'react';

/**
 * Track the user's geolocation via the Geolocation API.
 * @param {PositionOptions} [options] - Geolocation options (enableHighAccuracy, timeout, maximumAge)
 * @returns {{ loading: boolean, latitude: number|null, longitude: number|null, accuracy: number|null, error: GeolocationPositionError|Error|null }}
 */
export function useGeolocation(options = {}) {
    const [state, setState] = useState({
        loading: true,
        latitude: null,
        longitude: null,
        accuracy: null,
        error: null
    });

    useEffect(() => {
        const isBrowser = typeof navigator !== 'undefined' && 'geolocation' in navigator;
        if (!isBrowser) {
            setState((prev) => ({
                ...prev,
                loading: false,
                error: new Error('Geolocation is not supported')
            }));
            return undefined;
        }

        const onSuccess = (position) => {
            setState({
                loading: false,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                error: null
            });
        };

        const onError = (error) => {
            setState((prev) => ({ ...prev, loading: false, error }));
        };

        const watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);
        return () => navigator.geolocation.clearWatch(watchId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options.enableHighAccuracy, options.timeout, options.maximumAge]);

    return state;
}
