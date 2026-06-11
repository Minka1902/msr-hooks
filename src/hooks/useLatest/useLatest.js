import { useRef } from 'react';

/**
 * Keep a ref that always holds the latest value, for closure-safe reads
 * inside callbacks, intervals, or event listeners.
 * @param {*} value - The value to track
 * @returns {{ current: * }} A ref whose `current` is always the latest value
 */
export function useLatest(value) {
    const ref = useRef(value);
    ref.current = value;
    return ref;
}
