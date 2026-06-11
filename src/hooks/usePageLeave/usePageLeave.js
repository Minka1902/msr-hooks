import { useEffect } from 'react';

/**
 * Trigger a callback when the user is about to leave the page/tab.
 * @param {Function} handler - Callback to run before leave
 */
export function usePageLeave(handler) {
    useEffect(() => {
        const onBeforeUnload = () => {
            handler?.();
        };
        const onVisibility = () => {
            if (document.visibilityState === 'hidden') handler?.();
        };
        const onPageHide = () => handler?.();

        window.addEventListener('beforeunload', onBeforeUnload);
        document.addEventListener('visibilitychange', onVisibility);
        window.addEventListener('pagehide', onPageHide);

        return () => {
            window.removeEventListener('beforeunload', onBeforeUnload);
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('pagehide', onPageHide);
        };
    }, [handler]);
}
