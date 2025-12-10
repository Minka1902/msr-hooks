import { useEffect, useState } from 'react';

/**
 * Debounce a changing value.
 * @param {*} value - Value to debounce
 * @param {number} delay - Debounce delay in ms, defaults to 300
 * @returns {*} Debounced value
 */
export function useDebounce(value, delay = 300) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debounced;
}
