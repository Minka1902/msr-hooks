import { useEffect, useRef } from 'react';

/**
 * Run a callback on every animation frame while active.
 * The callback receives the milliseconds since the last frame and since the
 * loop started. The latest callback is always used without restarting the loop.
 * @param {(deltaMs: number, elapsedMs: number) => void} callback - Frame callback
 * @param {boolean} [active] - Whether the loop runs (default true)
 * @returns {void}
 */
export function useAnimationFrame(callback, active = true) {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!active || typeof window === 'undefined' || !window.requestAnimationFrame) {
            return undefined;
        }

        let frameId;
        let startTime = null;
        let previousTime = null;

        const loop = (time) => {
            if (startTime === null) {
                startTime = time;
                previousTime = time;
            }
            const deltaMs = time - previousTime;
            const elapsedMs = time - startTime;
            previousTime = time;

            if (callbackRef.current) {
                callbackRef.current(deltaMs, elapsedMs);
            }
            frameId = window.requestAnimationFrame(loop);
        };

        frameId = window.requestAnimationFrame(loop);

        return () => window.cancelAnimationFrame(frameId);
    }, [active]);
}
