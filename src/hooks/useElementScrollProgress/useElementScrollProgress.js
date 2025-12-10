import { useEffect, useState } from 'react';

/**
 * Track scroll progress of a specific element (0-1).
 * @param {React.RefObject<HTMLElement>} ref - Element ref to observe
 * @returns {number} progress ratio between 0 and 1
 */
export function useElementScrollProgress(ref) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const el = ref?.current;
        if (!el) return;

        const handleScroll = () => {
            const max = el.scrollHeight - el.clientHeight;
            if (max <= 0) {
                setProgress(1);
                return;
            }
            const next = Math.min(1, Math.max(0, el.scrollTop / max));
            setProgress(next);
        };

        handleScroll();
        el.addEventListener('scroll', handleScroll, { passive: true });
        const resizeObserver = new ResizeObserver(handleScroll);
        resizeObserver.observe(el);

        return () => {
            el.removeEventListener('scroll', handleScroll);
            resizeObserver.disconnect();
        };
    }, [ref]);

    return progress;
}
