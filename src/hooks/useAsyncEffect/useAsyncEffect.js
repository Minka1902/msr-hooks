import { useEffect } from 'react';

/**
 * An async-friendly effect with AbortSignal support.
 * @param {(signal: AbortSignal) => void | (() => void) | Promise<void | (() => void)>} effect
 * @param {React.DependencyList} deps
 */
export function useAsyncEffect(effect, deps = []) {
    useEffect(() => {
        const controller = new AbortController();
        let cleanup;

        const run = async () => {
            const result = await effect(controller.signal);
            if (typeof result === 'function') {
                cleanup = result;
            }
        };

        run().catch(() => {
            // Avoid unhandled rejections; surface errors in the caller if needed.
        });

        return () => {
            controller.abort();
            if (typeof cleanup === 'function') {
                cleanup();
            }
        };
    }, deps);
}
