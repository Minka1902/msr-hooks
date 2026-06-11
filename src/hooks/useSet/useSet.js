import { useCallback, useState } from 'react';

/**
 * Stateful Set with helper actions (immutable updates trigger re-render).
 * @param {Iterable} [initialValue] - Initial values
 * @returns {[Set, { add: Function, has: Function, delete: Function, toggle: Function, clear: Function, reset: Function }]}
 */
export function useSet(initialValue = []) {
    const [set, setSet] = useState(() => new Set(initialValue));

    const add = useCallback((value) => {
        setSet((prev) => {
            const next = new Set(prev);
            next.add(value);
            return next;
        });
    }, []);

    const remove = useCallback((value) => {
        setSet((prev) => {
            const next = new Set(prev);
            next.delete(value);
            return next;
        });
    }, []);

    const toggle = useCallback((value) => {
        setSet((prev) => {
            const next = new Set(prev);
            if (next.has(value)) next.delete(value);
            else next.add(value);
            return next;
        });
    }, []);

    const clear = useCallback(() => setSet(new Set()), []);

    const reset = useCallback(() => setSet(new Set(initialValue)), [initialValue]);

    const actions = {
        add,
        has: useCallback((value) => set.has(value), [set]),
        delete: remove,
        toggle,
        clear,
        reset
    };

    return [set, actions];
}
