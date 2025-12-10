import { useEffect, useRef, useState } from 'react';

/**
 * Detect when element enters/leaves viewport.
 * @param {object} options - IntersectionObserver options
 * @returns {[React.RefObject, boolean]} [ref to attach, isIntersecting state]
 */
export function useIntersectionObserver(options = {}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const targetRef = useRef(null);

    useEffect(() => {
        const target = targetRef.current;
        if (!target) return undefined;

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, options);

        observer.observe(target);
        return () => observer.disconnect();
    }, [options]);

    return [targetRef, isIntersecting];
}
