import { useEffect } from 'react';

/**
 * Lock document body scrolling while enabled.
 * @param {boolean} enabled
 */
export function useLockBodyScroll(enabled = true) {
    useEffect(() => {
        if (!enabled || typeof document === 'undefined') return undefined;

        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
        };
    }, [enabled]);
}
