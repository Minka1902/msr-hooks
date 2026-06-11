import { useCallback, useState } from 'react';

/**
 * Stateful Map with helper actions (immutable updates trigger re-render).
 * @param {Iterable} [initialValue] - Initial entries
 * @returns {[Map, { set: Function, get: Function, has: Function, delete: Function, clear: Function, reset: Function }]}
 */
export function useMap(initialValue = []) {
    const [map, setMap] = useState(() => new Map(initialValue));

    const set = useCallback((key, value) => {
        setMap((prev) => {
            const next = new Map(prev);
            next.set(key, value);
            return next;
        });
    }, []);

    const remove = useCallback((key) => {
        setMap((prev) => {
            const next = new Map(prev);
            next.delete(key);
            return next;
        });
    }, []);

    const clear = useCallback(() => setMap(new Map()), []);

    const reset = useCallback(() => setMap(new Map(initialValue)), [initialValue]);

    const actions = {
        set,
        get: useCallback((key) => map.get(key), [map]),
        has: useCallback((key) => map.has(key), [map]),
        delete: remove,
        clear,
        reset
    };

    return [map, actions];
}
