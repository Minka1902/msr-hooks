import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Manage a WebSocket connection with optional auto-reconnect.
 * @param {string} url - WebSocket URL
 * @param {{ onMessage?: Function, reconnect?: boolean, reconnectInterval?: number, protocols?: string|string[] }} [options]
 * @returns {{ sendMessage: Function, lastMessage: MessageEvent|null, readyState: number, connect: Function, disconnect: Function }}
 */
export function useWebSocket(url, options = {}) {
    const { onMessage, reconnect = false, reconnectInterval = 3000, protocols } = options;
    const [lastMessage, setLastMessage] = useState(null);
    const [readyState, setReadyState] = useState(
        typeof WebSocket !== 'undefined' ? WebSocket.CLOSED : 3
    );

    const wsRef = useRef(null);
    const reconnectTimer = useRef(null);
    const shouldReconnect = useRef(reconnect);
    const connectRef = useRef(() => {});
    const onMessageRef = useRef(onMessage);

    useEffect(() => {
        onMessageRef.current = onMessage;
    });

    const connect = useCallback(() => {
        if (typeof WebSocket === 'undefined' || !url) return;

        const ws = new WebSocket(url, protocols);
        wsRef.current = ws;
        setReadyState(WebSocket.CONNECTING);

        ws.onopen = () => setReadyState(WebSocket.OPEN);
        ws.onclose = () => {
            setReadyState(WebSocket.CLOSED);
            if (shouldReconnect.current) {
                reconnectTimer.current = setTimeout(() => connectRef.current(), reconnectInterval);
            }
        };
        ws.onmessage = (event) => {
            setLastMessage(event);
            if (onMessageRef.current) onMessageRef.current(event);
        };
        ws.onerror = () => setReadyState(ws.readyState);
    }, [url, protocols, reconnectInterval]);

    useEffect(() => {
        connectRef.current = connect;
    }, [connect]);

    const disconnect = useCallback(() => {
        shouldReconnect.current = false;
        clearTimeout(reconnectTimer.current);
        wsRef.current?.close();
    }, []);

    const sendMessage = useCallback((data) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(data);
        } else {
            console.warn('useWebSocket: socket is not open');
        }
    }, []);

    useEffect(() => {
        shouldReconnect.current = reconnect;
        // Open the socket on mount/url change — subscribing to an external
        // system. connect() updates readyState as part of that setup.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        connect();
        return () => {
            shouldReconnect.current = false;
            clearTimeout(reconnectTimer.current);
            wsRef.current?.close();
        };
    }, [connect, reconnect]);

    return { sendMessage, lastMessage, readyState, connect, disconnect };
}
