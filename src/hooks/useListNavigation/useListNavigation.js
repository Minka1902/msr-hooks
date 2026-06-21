import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Roving keyboard navigation for a flat list of items.
 * @param {object} config - Configuration object
 * @param {number} config.count - Number of items in the list
 * @param {Function} [config.onSelect] - Called with the active index on Enter
 * @param {boolean} [config.loop] - Wrap around at the ends (default false)
 * @returns {{ activeIndex: number, setActiveIndex: Function, onKeyDown: Function }}
 */
export function useListNavigation({ count, onSelect, loop = false } = {}) {
    const [activeIndex, setActiveIndex] = useState(0);

    const onSelectRef = useRef(onSelect);
    const countRef = useRef(count);
    const loopRef = useRef(loop);

    useEffect(() => {
        onSelectRef.current = onSelect;
        countRef.current = count;
        loopRef.current = loop;
    });

    const onKeyDown = useCallback((event) => {
        const total = countRef.current;
        if (!total || total <= 0) return;

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                setActiveIndex((prev) => {
                    const next = prev + 1;
                    if (next >= total) return loopRef.current ? 0 : total - 1;
                    return next;
                });
                break;
            case 'ArrowUp':
                event.preventDefault();
                setActiveIndex((prev) => {
                    const next = prev - 1;
                    if (next < 0) return loopRef.current ? total - 1 : 0;
                    return next;
                });
                break;
            case 'Home':
                event.preventDefault();
                setActiveIndex(0);
                break;
            case 'End':
                event.preventDefault();
                setActiveIndex(total - 1);
                break;
            case 'Enter':
                if (onSelectRef.current) {
                    event.preventDefault();
                    setActiveIndex((prev) => {
                        onSelectRef.current(prev);
                        return prev;
                    });
                }
                break;
            default:
                break;
        }
    }, []);

    return { activeIndex, setActiveIndex, onKeyDown };
}
