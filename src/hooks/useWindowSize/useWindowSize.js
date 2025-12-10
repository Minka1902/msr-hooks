import { useEffect, useState } from 'react';

/**
 * Track window dimensions with SSR guard.
 * @returns {{width: number, height: number}} Current window size
 */
export function useWindowSize() {
    const isBrowser = typeof window !== 'undefined';
    const [windowSize, setWindowSize] = useState({
        width: isBrowser ? window.innerWidth : 0,
        height: isBrowser ? window.innerHeight : 0
    });

    useEffect(() => {
        if (!isBrowser) return undefined;

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isBrowser]);

    return windowSize;
}
