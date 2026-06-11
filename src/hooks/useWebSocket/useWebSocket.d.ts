export interface UseWebSocketOptions {
    onMessage?: (event: MessageEvent) => void;
    reconnect?: boolean;
    reconnectInterval?: number;
    protocols?: string | string[];
}

export interface UseWebSocketReturn {
    sendMessage: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void;
    lastMessage: MessageEvent | null;
    readyState: number;
    connect: () => void;
    disconnect: () => void;
}

export function useWebSocket(
    url: string,
    options?: UseWebSocketOptions
): UseWebSocketReturn;
