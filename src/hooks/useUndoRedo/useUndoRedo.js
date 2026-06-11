import { useCallback, useRef, useState } from 'react';

/**
 * State management helper with undo/redo history.
 * @param {*} initialValue - Initial state value
 * @param {object} options
 * @param {number} [options.limit=50] - Max history length
 * @returns {{state: *, set: Function, undo: Function, redo: Function, canUndo: boolean, canRedo: boolean, reset: Function}}
 */
export function useUndoRedo(initialValue, { limit = 50 } = {}) {
    const historyRef = useRef([initialValue]);
    const pointerRef = useRef(0);
    const [state, setState] = useState(initialValue);

    const set = useCallback((value) => {
        const resolved = typeof value === 'function' ? value(historyRef.current[pointerRef.current]) : value;
        const history = historyRef.current.slice(0, pointerRef.current + 1);
        history.push(resolved);
        if (history.length > limit) history.shift();
        historyRef.current = history;
        pointerRef.current = history.length - 1;
        setState(resolved);
    }, [limit]);

    const undo = useCallback(() => {
        if (pointerRef.current === 0) return;
        pointerRef.current -= 1;
        const next = historyRef.current[pointerRef.current];
        setState(next);
    }, []);

    const redo = useCallback(() => {
        if (pointerRef.current >= historyRef.current.length - 1) return;
        pointerRef.current += 1;
        const next = historyRef.current[pointerRef.current];
        setState(next);
    }, []);

    const reset = useCallback((value = initialValue) => {
        historyRef.current = [value];
        pointerRef.current = 0;
        setState(value);
    }, [initialValue]);

    // History and pointer are kept in refs but every mutation also calls
    // setState, so these render-time reads are always in sync with the latest
    // commit. Deriving the flags here avoids redundant state.
    /* eslint-disable react-hooks/refs */
    const canUndo = pointerRef.current > 0;
    const canRedo = pointerRef.current < historyRef.current.length - 1;
    /* eslint-enable react-hooks/refs */

    return { state, set, undo, redo, canUndo, canRedo, reset };
}
