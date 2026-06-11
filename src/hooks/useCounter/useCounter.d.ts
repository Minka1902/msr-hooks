export interface UseCounterOptions {
    min?: number;
    max?: number;
    step?: number;
}

export interface UseCounterReturn {
    count: number;
    increment: (amount?: number) => void;
    decrement: (amount?: number) => void;
    set: (value: number | ((prev: number) => number)) => void;
    reset: () => void;
}

export function useCounter(
    initialValue?: number,
    options?: UseCounterOptions
): UseCounterReturn;
