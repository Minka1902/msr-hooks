import { useEffect } from 'react';

const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
].join(',');

/**
 * Trap keyboard focus within a container while active.
 * Focuses the first focusable element on activation and restores focus to the
 * previously focused element when deactivated.
 * @param {import('react').RefObject<HTMLElement>} ref - Container element ref
 * @param {boolean} active - Whether the trap is engaged
 * @returns {void}
 */
export function useFocusTrap(ref, active) {
    useEffect(() => {
        if (!active || typeof document === 'undefined') return;

        const container = ref?.current;
        if (!container) return;

        const previouslyFocused = document.activeElement;

        const getFocusable = () =>
            Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
                (el) => el.offsetParent !== null || el === document.activeElement
            );

        const focusable = getFocusable();
        if (focusable.length > 0) {
            focusable[0].focus();
        }

        const handleKeyDown = (event) => {
            if (event.key !== 'Tab') return;

            const items = getFocusable();
            if (items.length === 0) {
                event.preventDefault();
                return;
            }

            const first = items[0];
            const last = items[items.length - 1];
            const activeEl = document.activeElement;

            if (event.shiftKey) {
                if (activeEl === first || !container.contains(activeEl)) {
                    event.preventDefault();
                    last.focus();
                }
            } else if (activeEl === last || !container.contains(activeEl)) {
                event.preventDefault();
                first.focus();
            }
        };

        container.addEventListener('keydown', handleKeyDown);

        return () => {
            container.removeEventListener('keydown', handleKeyDown);
            if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
                previouslyFocused.focus();
            }
        };
    }, [ref, active]);
}
