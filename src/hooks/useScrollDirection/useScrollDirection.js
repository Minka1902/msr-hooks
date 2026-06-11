import { useEffect, useRef, useState } from 'react';

/**
 * Detect the vertical scroll direction of the window.
 * @param {{ threshold?: number }} [options] - Minimum scroll delta before updating
 * @returns {'up' | 'down' | null} Current scroll direction
 */
export function useScrollDirection(options = {}) {
    const { threshold = 0 } = options;
    const [direction, setDirection] = useState(null);
    const lastScrollY = useRef(typeof window !== 'undefined' ? window.pageYOffset : 0);
    const ticking = useRef(false);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const updateDirection = () => {
            const scrollY = window.pageYOffset;
            if (Math.abs(scrollY - lastScrollY.current) >= threshold) {
                setDirection(scrollY > lastScrollY.current ? 'down' : 'up');
                lastScrollY.current = scrollY > 0 ? scrollY : 0;
            }
            ticking.current = false;
        };

        const onScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(updateDirection);
                ticking.current = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold]);

    return direction;
}
