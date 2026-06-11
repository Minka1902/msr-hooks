import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Cross-tab/window messaging via the BroadcastChannel API.
 * @param {string} name - Channel name shared across tabs
 * @returns {[Function, *]} [postMessage, lastMessage]
 */
export function useBroadcastChannel(name) {
    const [lastMessage, setLastMessage] = useState(null);
    const channelRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof BroadcastChannel === 'undefined') {
            return undefined;
        }

        const channel = new BroadcastChannel(name);
        channelRef.current = channel;
        channel.onmessage = (event) => setLastMessage(event.data);

        return () => {
            channel.close();
            channelRef.current = null;
        };
    }, [name]);

    const postMessage = useCallback((data) => {
        try {
            channelRef.current?.postMessage(data);
        } catch (error) {
            console.warn('useBroadcastChannel post error', error);
        }
    }, []);

    return [postMessage, lastMessage];
}
