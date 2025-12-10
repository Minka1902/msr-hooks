import { useEffect, useRef, useState } from 'react';

/**
 * Detect deliberate hover with configurable delay and sensitivity.
 * @param {React.RefObject<HTMLElement>} ref
 * @param {{ delay?: number; leaveDelay?: number; sensitivity?: number }} options
 * @returns {boolean}
 */
export function useHoverIntent(ref, options = {}) {
    const { delay = 120, leaveDelay = 80, sensitivity = 8 } = options;
    const [hovered, setHovered] = useState(false);
    const startPos = useRef({ x: 0, y: 0 });
    const lastPos = useRef({ x: 0, y: 0 });
    const enterTimer = useRef();
    const leaveTimer = useRef();

    useEffect(() => {
        const node = ref?.current;
        if (!node) return undefined;

        const clearEnter = () => {
            if (enterTimer.current) {
                clearTimeout(enterTimer.current);
                enterTimer.current = undefined;
            }
        };

        const clearLeave = () => {
            if (leaveTimer.current) {
                clearTimeout(leaveTimer.current);
                leaveTimer.current = undefined;
            }
        };

        const onMouseEnter = (event) => {
            clearLeave();
            startPos.current = { x: event.clientX, y: event.clientY };
            lastPos.current = startPos.current;

            const checkIntent = () => {
                const dx = lastPos.current.x - startPos.current.x;
                const dy = lastPos.current.y - startPos.current.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance <= sensitivity) {
                    setHovered(true);
                } else {
                    startPos.current = { ...lastPos.current };
                    enterTimer.current = setTimeout(checkIntent, delay);
                }
            };

            clearEnter();
            enterTimer.current = setTimeout(checkIntent, delay);
        };

        const onMouseMove = (event) => {
            lastPos.current = { x: event.clientX, y: event.clientY };
        };

        const onMouseLeave = () => {
            clearEnter();
            clearLeave();
            leaveTimer.current = setTimeout(() => setHovered(false), leaveDelay);
        };

        node.addEventListener('mouseenter', onMouseEnter);
        node.addEventListener('mousemove', onMouseMove);
        node.addEventListener('mouseleave', onMouseLeave);

        return () => {
            clearEnter();
            clearLeave();
            node.removeEventListener('mouseenter', onMouseEnter);
            node.removeEventListener('mousemove', onMouseMove);
            node.removeEventListener('mouseleave', onMouseLeave);
        };
    }, [ref, delay, leaveDelay, sensitivity]);

    return hovered;
}
