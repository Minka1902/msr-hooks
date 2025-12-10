import { useCallback, useState } from 'react';

/**
 * Boolean state with toggle and setter helpers.
 * @param {boolean} initial - Initial value, defaults to false
 * @returns {[boolean, Function, Function, Function]} [value, toggle, setTrue, setFalse]
 */
export function useToggle(initial = false) {
    const [value, setValue] = useState(Boolean(initial));

    const toggle = useCallback(() => setValue((v) => !v), []);
    const setTrue = useCallback(() => setValue(true), []);
    const setFalse = useCallback(() => setValue(false), []);

    return [value, toggle, setTrue, setFalse];
}
