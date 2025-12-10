import { useEffect, useState } from 'react';

/**
 * Ensure a DOM node exists for portals and return it.
 * @param {string} id
 * @returns {HTMLElement | null}
 */
export function usePortal(id) {
    const [el] = useState(() => {
        if (typeof document === 'undefined') return null;
        const existing = id ? document.getElementById(id) : null;
        if (existing) return existing;
        const created = document.createElement('div');
        if (id) created.id = id;
        return created;
    });

    useEffect(() => {
        if (!el || typeof document === 'undefined') return undefined;
        const alreadyInDom = document.body.contains(el);
        if (!alreadyInDom) {
            document.body.appendChild(el);
        }

        return () => {
            if (!alreadyInDom && el.parentNode) {
                el.parentNode.removeChild(el);
            }
        };
    }, [el]);

    return el;
}
