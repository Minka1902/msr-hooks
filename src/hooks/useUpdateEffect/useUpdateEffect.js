import { useEffect, useRef } from 'react';

/**
 * Like useEffect, but skips running on the initial mount.
 * @param {Function} effect - Effect callback (may return a cleanup function)
 * @param {Array} [deps] - Dependency array
 * @returns {void}
 */
export function useUpdateEffect(effect, deps) {
    const isFirstMount = useRef(true);

    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return undefined;
        }
        return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
