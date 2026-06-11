import { useCallback, useState } from 'react';

/**
 * Numeric counter state with bounds and step controls.
 * @param {number} initialValue - Starting value
 * @param {{ min?: number, max?: number, step?: number }} [options] - Bounds and step
 * @returns {{ count: number, increment: Function, decrement: Function, set: Function, reset: Function }}
 */
export function useCounter(initialValue = 0, options = {}) {
    const { min = -Infinity, max = Infinity, step = 1 } = options;

    const clamp = useCallback(
        (value) => Math.min(Math.max(value, min), max),
        [min, max]
    );

    const [count, setCount] = useState(() => clamp(initialValue));

    const increment = useCallback(
        (amount = step) => setCount((prev) => clamp(prev + amount)),
        [clamp, step]
    );

    const decrement = useCallback(
        (amount = step) => setCount((prev) => clamp(prev - amount)),
        [clamp, step]
    );

    const set = useCallback(
        (value) => setCount((prev) => clamp(value instanceof Function ? value(prev) : value)),
        [clamp]
    );

    const reset = useCallback(() => setCount(clamp(initialValue)), [clamp, initialValue]);

    return { count, increment, decrement, set, reset };
}
