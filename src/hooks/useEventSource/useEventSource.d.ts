export interface UseEventSourceOptions {
    withCredentials?: boolean;
    events?: string[];
}

export interface UseEventSourceReturn {
    data: string | null;
    lastEvent: MessageEvent | null;
    readyState: number;
    error: Event | null;
    close: () => void;
}

export function useEventSource(
    url: string,
    options?: UseEventSourceOptions
): UseEventSourceReturn;
