import { useEffect, useState } from 'react';

/**
 * Track document visibility (tab focus/blur).
 * @returns {boolean} true when document is visible
 */
export function useDocumentVisibility() {
    const isBrowser = typeof document !== 'undefined';
    const [isVisible, setIsVisible] = useState(() => (isBrowser ? !document.hidden : true));

    useEffect(() => {
        if (!isBrowser) return undefined;
        const handler = () => setIsVisible(!document.hidden);
        document.addEventListener('visibilitychange', handler);
        return () => document.removeEventListener('visibilitychange', handler);
    }, [isBrowser]);

    return isVisible;
}
