import { useRef } from 'react';

/**
 * Count how many times a component has rendered (debugging aid).
 * @returns {number} The current render count (starts at 1)
 */
export function useRenderCount() {
    const count = useRef(0);
    // Counting renders inherently requires mutating and reading the ref during
    // render; that is precisely this debugging hook's purpose.
    /* eslint-disable react-hooks/refs */
    count.current += 1;
    return count.current;
    /* eslint-enable react-hooks/refs */
}
