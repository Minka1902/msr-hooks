export interface UseSetActions<T> {
    add: (value: T) => void;
    has: (value: T) => boolean;
    delete: (value: T) => void;
    toggle: (value: T) => void;
    clear: () => void;
    reset: () => void;
}

export function useSet<T>(initialValue?: Iterable<T>): [Set<T>, UseSetActions<T>];
