import { useEffect, useRef, useState } from 'react';

/**
 * Throttle a changing value or function.
 * @param {*} value - Value to throttle
 * @param {number} limit - Throttle limit in ms, defaults to 500
 * @returns {*} Throttled value
 */
export function useThrottle(value, limit = 500) {
    const [throttled, setThrottled] = useState(value);
    const lastRan = useRef(null);

    useEffect(() => {
        if (lastRan.current === null) {
            lastRan.current = Date.now();
        }

        const handler = setTimeout(() => {
            if (Date.now() - lastRan.current >= limit) {
                setThrottled(value);
                lastRan.current = Date.now();
            }
        }, limit - (Date.now() - lastRan.current));

        return () => clearTimeout(handler);
    }, [value, limit]);

    return throttled;
}
