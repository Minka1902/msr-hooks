export interface UseGeolocationReturn {
    loading: boolean;
    latitude: number | null;
    longitude: number | null;
    accuracy: number | null;
    error: GeolocationPositionError | Error | null;
}

export function useGeolocation(options?: PositionOptions): UseGeolocationReturn;
