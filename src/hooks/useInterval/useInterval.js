import { useEffect, useRef } from 'react';

/**
 * Declarative setInterval with cleanup.
 * @param {Function} callback - Function to call on interval
 * @param {number|null} delay - Delay in ms, null to pause
 * @returns {void}
 */
export function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null) return undefined;

        const tick = () => savedCallback.current();
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
}
