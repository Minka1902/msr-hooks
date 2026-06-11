import { useCallback, useRef } from 'react';

/**
 * Detect press-and-hold gestures on an element (mouse and touch).
 * @param {Function} callback - Called when the long press fires
 * @param {{ delay?: number, onStart?: Function, onCancel?: Function }} [options] - Timing and lifecycle callbacks
 * @returns {{ onMouseDown: Function, onMouseUp: Function, onMouseLeave: Function, onTouchStart: Function, onTouchEnd: Function }} Props to spread onto the target element
 */
export function useLongPress(callback, options = {}) {
    const { delay = 400, onStart, onCancel } = options;
    const timerRef = useRef();
    const triggeredRef = useRef(false);

    const start = useCallback((event) => {
        if (onStart) onStart(event);
        triggeredRef.current = false;
        timerRef.current = setTimeout(() => {
            callback(event);
            triggeredRef.current = true;
        }, delay);
    }, [callback, delay, onStart]);

    const clear = useCallback((event) => {
        clearTimeout(timerRef.current);
        if (!triggeredRef.current && onCancel) onCancel(event);
    }, [onCancel]);

    return {
        onMouseDown: start,
        onMouseUp: clear,
        onMouseLeave: clear,
        onTouchStart: start,
        onTouchEnd: clear
    };
}
