import { useEffect, useState } from 'react';

const OPPOSITE = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
};

function computeCoords(anchorRect, floatRect, placement, viewport) {
    let x = 0;
    let y = 0;

    switch (placement) {
        case 'top':
            x = anchorRect.left + anchorRect.width / 2 - floatRect.width / 2;
            y = anchorRect.top - floatRect.height;
            break;
        case 'left':
            x = anchorRect.left - floatRect.width;
            y = anchorRect.top + anchorRect.height / 2 - floatRect.height / 2;
            break;
        case 'right':
            x = anchorRect.right;
            y = anchorRect.top + anchorRect.height / 2 - floatRect.height / 2;
            break;
        case 'bottom':
        default:
            x = anchorRect.left + anchorRect.width / 2 - floatRect.width / 2;
            y = anchorRect.bottom;
            break;
    }

    const overflow =
        y < 0 ||
        x < 0 ||
        y + floatRect.height > viewport.height ||
        x + floatRect.width > viewport.width;

    return { x, y, overflow };
}

/**
 * Position a floating element relative to an anchor with viewport flipping.
 * @param {object} config - Configuration object
 * @param {import('react').RefObject<HTMLElement>} config.anchor - Reference element ref
 * @param {import('react').RefObject<HTMLElement>} config.floating - Floating element ref
 * @param {'top'|'bottom'|'left'|'right'} [config.placement] - Preferred placement
 * @returns {{ x: number, y: number, placement: string }} Resolved coordinates and placement
 */
export function usePosition({ anchor, floating, placement = 'bottom' } = {}) {
    const [state, setState] = useState({ x: 0, y: 0, placement });

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const anchorEl = anchor?.current;
        const floatEl = floating?.current;
        if (!anchorEl || !floatEl) return undefined;

        const update = () => {
            const anchorRect = anchorEl.getBoundingClientRect();
            const floatRect = floatEl.getBoundingClientRect();
            const viewport = {
                width: window.innerWidth,
                height: window.innerHeight
            };

            const primary = computeCoords(anchorRect, floatRect, placement, viewport);
            let resolved = placement;
            let coords = primary;

            if (primary.overflow) {
                const flipped = computeCoords(
                    anchorRect,
                    floatRect,
                    OPPOSITE[placement] || placement,
                    viewport
                );
                if (!flipped.overflow) {
                    resolved = OPPOSITE[placement];
                    coords = flipped;
                }
            }

            setState((prev) =>
                prev.x === coords.x &&
                prev.y === coords.y &&
                prev.placement === resolved
                    ? prev
                    : { x: coords.x, y: coords.y, placement: resolved }
            );
        };

        // Initial measurement on the next frame, then on every layout change.
        const rafId = window.requestAnimationFrame(update);
        const observer =
            typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
        if (observer) {
            observer.observe(anchorEl);
            observer.observe(floatEl);
        }
        window.addEventListener('scroll', update, true);
        window.addEventListener('resize', update);

        return () => {
            window.cancelAnimationFrame(rafId);
            if (observer) observer.disconnect();
            window.removeEventListener('scroll', update, true);
            window.removeEventListener('resize', update);
        };
    }, [anchor, floating, placement]);

    return state;
}
