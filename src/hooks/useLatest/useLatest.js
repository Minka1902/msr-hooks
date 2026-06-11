import { useRef } from 'react';

/**
 * Keep a ref that always holds the latest value, for closure-safe reads
 * inside callbacks, intervals, or event listeners.
 * @param {*} value - The value to track
 * @returns {{ current: * }} A ref whose `current` is always the latest value
 */
export function useLatest(value) {
    const ref = useRef(value);
    // Intentional render-time write: this hook's contract is that `current`
    // always holds the latest value for closure-safe reads after commit.
    // eslint-disable-next-line react-hooks/refs
    ref.current = value;
    return ref;
}
