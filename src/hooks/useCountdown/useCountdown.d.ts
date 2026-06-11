export interface UseCountdownOptions {
    interval?: number;
    onComplete?: () => void;
}

export interface UseCountdownReturn {
    count: number;
    start: () => void;
    pause: () => void;
    reset: () => void;
    isRunning: boolean;
}

export function useCountdown(
    seconds: number,
    options?: UseCountdownOptions
): UseCountdownReturn;
