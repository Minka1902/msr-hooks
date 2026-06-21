import { useEffect, useState } from 'react';

const INITIAL = {
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    centerX: 0,
    centerY: 0,
    isInside: false
};

/**
 * Track the pointer position relative to an element.
 * @param {import('react').RefObject<HTMLElement>} ref - Element ref to track against
 * @returns {{ x: number, y: number, elementX: number, elementY: number,
 *   centerX: number, centerY: number, isInside: boolean }}
 */
export function useMousePosition(ref) {
    const [position, setPosition] = useState(INITIAL);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleMove = (event) => {
            const next = {
                x: event.pageX,
                y: event.pageY,
                elementX: 0,
                elementY: 0,
                centerX: 0,
                centerY: 0,
                isInside: false
            };

            const el = ref?.current;
            if (el) {
                const rect = el.getBoundingClientRect();
                const elementX = event.clientX - rect.left;
                const elementY = event.clientY - rect.top;
                next.elementX = elementX;
                next.elementY = elementY;
                next.centerX = elementX - rect.width / 2;
                next.centerY = elementY - rect.height / 2;
                next.isInside =
                    elementX >= 0 &&
                    elementY >= 0 &&
                    elementX <= rect.width &&
                    elementY <= rect.height;
            }

            setPosition(next);
        };

        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, [ref]);

    return position;
}
