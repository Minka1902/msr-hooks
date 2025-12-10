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

    return ref.current;
}
