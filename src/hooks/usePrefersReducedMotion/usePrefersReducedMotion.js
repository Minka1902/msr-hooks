import { useEffect, useState } from 'react';

/**
 * Detect OS reduced motion preference.
 * @returns {boolean} true if user prefers reduced motion
 */
export function usePrefersReducedMotion() {
    const isBrowser = typeof window !== 'undefined';
    const query = '(prefers-reduced-motion: reduce)';
    const [prefers, setPrefers] = useState(() => {
        if (!isBrowser || !window.matchMedia) return false;
        return window.matchMedia(query).matches;
    });

    useEffect(() => {
        if (!isBrowser || !window.matchMedia) return undefined;
        const mql = window.matchMedia(query);
        const handler = (event) => setPrefers(event.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, [isBrowser]);

    return prefers;
}
