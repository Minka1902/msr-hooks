import { useEffect } from 'react';

/**
 * Trigger a handler when Escape key is pressed.
 * @param {Function} handler - Callback to execute on Escape
 * @returns {void}
 */
export function useEscapeKey(handler) {
    useEffect(() => {
        const listener = (event) => {
            if (event.key === 'Escape') {
                handler();
            }
        };

        document.addEventListener('keydown', listener);

        return () => {
            document.removeEventListener('keydown', listener);
        };
    }, [handler]);
}
