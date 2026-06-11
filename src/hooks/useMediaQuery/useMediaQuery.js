import { useEffect, useState } from 'react';

/**
 * Detect if media query matches current viewport.
 * @param {string} query - Media query string (e.g., '(min-width: 768px)')
 * @returns {boolean} Whether the media query matches
 */
export function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia(query).matches;
    });

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const mediaQuery = window.matchMedia(query);
        const handler = (event) => setMatches(event.matches);

        // Re-sync on subscribe in case `query` changed or the value moved
        // between render and effect — legitimate external-store synchronization.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMatches(mediaQuery.matches);

        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, [query]);

    return matches;
}
