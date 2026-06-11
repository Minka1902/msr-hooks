import { useCallback, useState } from 'react';

/**
 * Full state timeline with time-travel navigation.
 * @template T
 * @param {T} initialState
 * @param {{ limit?: number }} options
 */
export function useStateHistory(initialState, options = {}) {
    const { limit = 50 } = options;

    const [history, setHistory] = useState([initialState]);
    const [pointer, setPointer] = useState(0);

    const state = history[pointer];

    const set = useCallback((newState) => {
        setHistory((prev) => {
            // Remove any "future" states after current pointer
            const truncated = prev.slice(0, pointer + 1);
            // Add new state
            const updated = [...truncated, newState];
            // Enforce limit by removing oldest entries
            const trimmed = updated.length > limit ? updated.slice(updated.length - limit) : updated;
            return trimmed;
        });
        setPointer(() => {
            const newLength = Math.min(pointer + 2, limit);
            return newLength - 1;
        });
    }, [pointer, limit]);

    const jump = useCallback((index) => {
        const clampedIndex = Math.max(0, Math.min(index, history.length - 1));
        setPointer(clampedIndex);
    }, [history.length]);

    const undo = useCallback(() => {
        if (pointer > 0) {
            setPointer(pointer - 1);
        }
    }, [pointer]);

    const redo = useCallback(() => {
        if (pointer < history.length - 1) {
            setPointer(pointer + 1);
        }
    }, [pointer, history.length]);

    const clearHistory = useCallback(() => {
        setHistory([state]);
        setPointer(0);
    }, [state]);

    const canUndo = pointer > 0;
    const canRedo = pointer < history.length - 1;

    return {
        state,
        set,
        history,
        pointer,
        jump,
        canUndo,
        canRedo,
        undo,
        redo,
        clearHistory,
    };
}
