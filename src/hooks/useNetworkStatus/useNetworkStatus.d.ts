export interface NetworkStatusState {
    online: boolean;
    downlink: number | null;
    rtt: number | null;
}

export function useNetworkStatus(): NetworkStatusState;
