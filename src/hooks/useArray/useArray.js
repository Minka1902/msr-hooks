import { useCallback, useState } from 'react';

/**
 * Array state with common mutation helpers (immutable updates).
 * @param {Array} initialValue - Initial array
 * @returns {{ array: Array, set: Function, push: Function, removeAt: Function, updateAt: Function, filter: Function, clear: Function }}
 */
export function useArray(initialValue = []) {
    const [array, setArray] = useState(initialValue);

    const push = useCallback((item) => {
        setArray((prev) => [...prev, item]);
    }, []);

    const removeAt = useCallback((index) => {
        setArray((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const updateAt = useCallback((index, item) => {
        setArray((prev) => prev.map((value, i) => (i === index ? item : value)));
    }, []);

    const filter = useCallback((predicate) => {
        setArray((prev) => prev.filter(predicate));
    }, []);

    const clear = useCallback(() => setArray([]), []);

    return { array, set: setArray, push, removeAt, updateAt, filter, clear };
}
