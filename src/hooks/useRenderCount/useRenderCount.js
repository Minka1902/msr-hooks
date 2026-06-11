import { useRef } from 'react';

/**
 * Count how many times a component has rendered (debugging aid).
 * @returns {number} The current render count (starts at 1)
 */
export function useRenderCount() {
    const count = useRef(0);
    count.current += 1;
    return count.current;
}
