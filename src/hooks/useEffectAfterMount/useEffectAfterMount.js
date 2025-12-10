import { useEffect, useRef } from 'react';

/**
 * Run an effect only after the first render (skips mount).
 * @param {Function} effect - Effect callback to run after mount
 * @param {Array} deps - Dependency array, defaults to []
 * @returns {void}
 */
export function useEffectAfterMount(effect, deps = []) {
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return undefined;
        }
        return effect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
