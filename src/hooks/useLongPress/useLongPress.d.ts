export interface UseLongPressOptions {
    delay?: number;
    onStart?: (event: Event) => void;
    onCancel?: (event: Event) => void;
}

export interface UseLongPressHandlers {
    onMouseDown: (event: Event) => void;
    onMouseUp: (event: Event) => void;
    onMouseLeave: (event: Event) => void;
    onTouchStart: (event: Event) => void;
    onTouchEnd: (event: Event) => void;
}

export function useLongPress(
    callback: (event: Event) => void,
    options?: UseLongPressOptions
): UseLongPressHandlers;
