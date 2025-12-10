export interface UseStateHistoryReturn<T> {
    state: T;
    set: (newState: T) => void;
    history: T[];
    pointer: number;
    jump: (index: number) => void;
    canUndo: boolean;
    canRedo: boolean;
    undo: () => void;
    redo: () => void;
    clearHistory: () => void;
}

export function useStateHistory<T>(
    initialState: T,
    options?: { limit?: number }
): UseStateHistoryReturn<T>;
