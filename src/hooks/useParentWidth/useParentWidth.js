import { useEffect, useRef, useState } from 'react';

/**
 * Get the parent element's width and a ref for the child element.
 * @returns {{parentWidth: number|null, childRef: React.RefObject}} Parent width and child ref
 */
export function useParentWidth() {
    const [parentWidth, setParentWidth] = useState(null);
    const childRef = useRef(null);

    useEffect(() => {
        if (!childRef.current || !childRef.current.parentElement) return;

        const parentElement = childRef.current.parentElement;

        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.target === parentElement) {
                    setParentWidth(entry.contentRect.width);
                }
            });
        });

        resizeObserver.observe(parentElement);

        return () => resizeObserver.disconnect();
    }, []);

    return { parentWidth, childRef };
}
