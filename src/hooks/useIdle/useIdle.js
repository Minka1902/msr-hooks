import { useEffect, useRef, useState } from 'react';

const DEFAULT_EVENTS = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'wheel'];

/**
 * Detect when the user has been inactive for a given duration.
 * @param {number} [ms] - Idle threshold in milliseconds
 * @param {string[]} [events] - Activity events that reset the timer
 * @returns {boolean} True when the user is idle
 */
export function useIdle(ms = 60000, events = DEFAULT_EVENTS) {
    const [idle, setIdle] = useState(false);
    const timerRef = useRef();

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const handleActivity = () => {
            setIdle(false);
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => setIdle(true), ms);
        };

        handleActivity();
        events.forEach((event) => window.addEventListener(event, handleActivity, { passive: true }));

        return () => {
            clearTimeout(timerRef.current);
            events.forEach((event) => window.removeEventListener(event, handleActivity));
        };
    }, [ms, events]);

    return idle;
}
