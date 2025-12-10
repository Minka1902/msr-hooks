export interface UseUndoRedoOptions {
    limit?: number;
}

export interface UseUndoRedoReturn<T> {
    state: T;
    set: (value: T | ((prev: T) => T)) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    reset: (value?: T) => void;
}

export function useUndoRedo<T>(
    initialValue: T,
    options?: UseUndoRedoOptions
): UseUndoRedoReturn<T>;
