export interface UseControllableStateConfig<T> {
    value?: T;
    defaultValue?: T;
    onChange?: (value: T) => void;
}

export function useControllableState<T>(
    config: UseControllableStateConfig<T>
): [T, (value: T | ((prev: T) => T)) => void];
