import { useEffect } from 'react';

/**
 * Run a handler when a key sequence is pressed in order.
 * @param {string | string[]} sequence
 * @param {(event: KeyboardEvent) => void} handler
 * @param {{ timeout?: number }} options
 */
export function useKeyPressSequence(sequence, handler, options = {}) {
    const { timeout = 1000 } = options;

    useEffect(() => {
        if (!sequence || typeof window === 'undefined') return undefined;
        const target = Array.isArray(sequence) ? sequence : String(sequence).split('');
        let buffer = [];
        let timerId;

        const reset = () => {
            buffer = [];
            if (timerId) {
                clearTimeout(timerId);
                timerId = undefined;
            }
        };

        const scheduleReset = () => {
            if (!timeout) return;
            if (timerId) clearTimeout(timerId);
            timerId = setTimeout(reset, timeout);
        };

        const handleKeyDown = (event) => {
            buffer.push(event.key);
            if (buffer.length > target.length) {
                buffer.shift();
            }

            scheduleReset();

            if (buffer.length === target.length && target.every((key, idx) => buffer[idx] === key)) {
                handler?.(event);
                reset();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (timerId) clearTimeout(timerId);
        };
    }, [sequence, handler, timeout]);
}
