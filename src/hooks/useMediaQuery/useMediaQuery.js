import { useEffect, useState } from 'react';

/**
 * Detect if media query matches current viewport.
 * @param {string} query - Media query string (e.g., '(min-width: 768px)')
 * @returns {boolean} Whether the media query matches
 */
export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches);

        const handler = (event) => setMatches(event.matches);
        
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, [query]);

    return matches;
}
