import { useEffect, useRef } from 'react';

/**
 * Add an event listener with automatic cleanup.
 * @param {EventTarget | React.RefObject<EventTarget>} target
 * @param {string} type
 * @param {(event: Event) => void} listener
 * @param {boolean | AddEventListenerOptions} [options]
 */
export function useEventListener(target, type, listener, options) {
    const handlerRef = useRef(listener);

    useEffect(() => {
        handlerRef.current = listener;
    }, [listener]);

    useEffect(() => {
        const element = target && 'current' in target ? target.current : target || (typeof window !== 'undefined' ? window : undefined);
        if (!element || !element.addEventListener) return undefined;

        const eventHandler = (event) => handlerRef.current?.(event);
        element.addEventListener(type, eventHandler, options);
        return () => element.removeEventListener(type, eventHandler, options);
    }, [target, type, options]);
}
