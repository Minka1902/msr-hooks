export interface UseMapActions<K, V> {
    set: (key: K, value: V) => void;
    get: (key: K) => V | undefined;
    has: (key: K) => boolean;
    delete: (key: K) => void;
    clear: () => void;
    reset: () => void;
}

export function useMap<K, V>(
    initialValue?: Iterable<readonly [K, V]>
): [Map<K, V>, UseMapActions<K, V>];
