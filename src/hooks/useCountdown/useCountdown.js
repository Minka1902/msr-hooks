import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Countdown timer that ticks down to zero.
 * @param {number} seconds - Starting number of seconds
 * @param {{ interval?: number, onComplete?: Function }} [options] - Tick interval (ms) and completion callback
 * @returns {{ count: number, start: Function, pause: Function, reset: Function, isRunning: boolean }}
 */
export function useCountdown(seconds, options = {}) {
    const { interval = 1000, onComplete } = options;
    const [count, setCount] = useState(seconds);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    const clear = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const start = useCallback(() => setIsRunning(true), []);
    const pause = useCallback(() => setIsRunning(false), []);
    const reset = useCallback(() => {
        setIsRunning(false);
        setCount(seconds);
    }, [seconds]);

    useEffect(() => {
        if (!isRunning) return undefined;
        if (count <= 0) {
            setIsRunning(false);
            return undefined;
        }

        timerRef.current = setInterval(() => {
            setCount((prev) => {
                if (prev <= 1) {
                    clear();
                    setIsRunning(false);
                    if (onCompleteRef.current) onCompleteRef.current();
                    return 0;
                }
                return prev - 1;
            });
        }, interval);

        return clear;
    }, [isRunning, count, interval, clear]);

    return { count, start, pause, reset, isRunning };
}
