export function useBroadcastChannel<T = unknown>(
    name: string
): [(data: T) => void, T | null];
