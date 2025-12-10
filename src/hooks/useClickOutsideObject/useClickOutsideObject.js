import { useEffect } from 'react';

/**
 * Detect clicks outside an element and trigger a handler.
 * @param {object} ref - React ref to the target element
 * @param {Function} handler - Callback when click occurs outside
 * @param {string} dontReactTo - Element ID to ignore
 * @param {object} excludeRef - Additional ref to exclude from trigger
 * @returns {void}
 */
export function useClickOutsideObject(ref, handler, dontReactTo, excludeRef) {
    useEffect(() => {
        const listener = (event) => {
            const target = event.target;
            if (!ref.current || ref.current.contains(target)) return;
            if (excludeRef?.current && excludeRef.current.contains(target)) return;
            if (event?.target?.id !== dontReactTo) handler();
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler, excludeRef, dontReactTo]);
}
