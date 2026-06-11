export interface UseArrayReturn<T> {
    array: T[];
    set: (value: T[] | ((prev: T[]) => T[])) => void;
    push: (item: T) => void;
    removeAt: (index: number) => void;
    updateAt: (index: number, item: T) => void;
    filter: (predicate: (item: T, index: number) => boolean) => void;
    clear: () => void;
}

export function useArray<T>(initialValue?: T[]): UseArrayReturn<T>;
