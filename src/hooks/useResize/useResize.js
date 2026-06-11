import { useCallback, useState } from 'react';

/**
 * Manage resizable element state with drag tracking.
 * @param {object} config - Configuration object
 * @param {number} config.defaultSize - Initial size value
 * @param {number} config.minSize - Minimum allowed size
 * @param {number} config.maxSize - Maximum allowed size
 * @returns {{size: number, setSize: Function, isDragging: boolean, setIsDragging: Function, handleMouseDown: Function, handleMouseUp: Function}}
 */
export function useResize({ defaultSize, minSize, maxSize }) {
    const clamp = useCallback((value) => {
        let next = value;
        if (typeof minSize === 'number') next = Math.max(minSize, next);
        if (typeof maxSize === 'number') next = Math.min(maxSize, next);
        return next;
    }, [minSize, maxSize]);

    const [size, setSizeRaw] = useState(() => clamp(defaultSize));
    const [isDragging, setIsDragging] = useState(false);

    const setSize = useCallback((value) => {
        setSizeRaw((prev) => clamp(typeof value === 'function' ? value(prev) : value));
    }, [clamp]);

    const handleMouseDown = useCallback((e) => {
        setIsDragging(true);
        e.preventDefault?.();
    }, []);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    return {
        size,
        setSize,
        isDragging,
        setIsDragging,
        handleMouseDown,
        handleMouseUp
    };
}
