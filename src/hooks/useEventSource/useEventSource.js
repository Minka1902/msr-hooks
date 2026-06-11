import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Consume Server-Sent Events (SSE) — great for streaming responses (e.g. LLM tokens).
 * @param {string} url - SSE endpoint URL
 * @param {{ withCredentials?: boolean, events?: string[] }} [options] - Connection options and named events to listen for
 * @returns {{ data: *, lastEvent: MessageEvent|null, readyState: number, error: Event|null, close: Function }}
 */
export function useEventSource(url, options = {}) {
    const { withCredentials = false, events = [] } = options;
    const [data, setData] = useState(null);
    const [lastEvent, setLastEvent] = useState(null);
    const [readyState, setReadyState] = useState(0);
    const [error, setError] = useState(null);
    const sourceRef = useRef(null);

    const close = useCallback(() => {
        sourceRef.current?.close();
        setReadyState(2);
    }, []);

    useEffect(() => {
        if (typeof EventSource === 'undefined' || !url) return undefined;

        const source = new EventSource(url, { withCredentials });
        sourceRef.current = source;
        // Reset connection state when (re)subscribing to a new EventSource —
        // synchronizing React state with an external system on subscribe.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setReadyState(0);

        source.onopen = () => setReadyState(1);
        source.onerror = (event) => {
            setError(event);
            setReadyState(source.readyState);
        };
        source.onmessage = (event) => {
            setLastEvent(event);
            setData(event.data);
        };

        const namedHandlers = events.map((name) => {
            const handler = (event) => {
                setLastEvent(event);
                setData(event.data);
            };
            source.addEventListener(name, handler);
            return { name, handler };
        });

        return () => {
            namedHandlers.forEach(({ name, handler }) => source.removeEventListener(name, handler));
            source.close();
        };
    }, [url, withCredentials, events]);

    return { data, lastEvent, readyState, error, close };
}
