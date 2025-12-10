import { useEffect, useRef } from 'react';

/**
 * Declarative setTimeout with cleanup.
 * @param {Function} callback - Function to call after timeout
 * @param {number|null} delay - Delay in ms, null to cancel
 * @returns {void}
 */
export function useTimeout(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null) return undefined;

        const id = setTimeout(() => savedCallback.current(), delay);
        return () => clearTimeout(id);
    }, [delay]);
}
