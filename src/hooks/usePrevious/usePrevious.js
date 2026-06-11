import { useEffect, useRef } from 'react';

/**
 * Get the previous render's value.
 * @param {*} value - Current value
 * @returns {*} Previous value from last render
 */
export function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    // Returns the value from the previous commit; reading the ref during render
    // is the canonical implementation of this hook.
    // eslint-disable-next-line react-hooks/refs
    return ref.current;
}
