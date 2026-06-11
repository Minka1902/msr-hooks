import { useEffect, useState } from 'react';

/**
 * Dynamically load an external script and track its loading status.
 * @param {string} src - Script URL
 * @param {{ removeOnUnmount?: boolean }} [options] - Whether to remove the tag on unmount
 * @returns {'idle' | 'loading' | 'ready' | 'error'} Current load status
 */
export function useScript(src, options = {}) {
    const { removeOnUnmount = false } = options;
    const [status, setStatus] = useState(src ? 'loading' : 'idle');

    useEffect(() => {
        if (!src || typeof document === 'undefined') {
            // Sync status when `src` is cleared after a previous load.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setStatus('idle');
            return undefined;
        }

        let script = document.querySelector(`script[src="${src}"]`);

        if (script) {
            setStatus(script.getAttribute('data-status') || 'ready');
        } else {
            script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.setAttribute('data-status', 'loading');
            document.body.appendChild(script);
        }

        const setAttributeStatus = (event) => {
            const newStatus = event.type === 'load' ? 'ready' : 'error';
            script.setAttribute('data-status', newStatus);
            setStatus(newStatus);
        };

        script.addEventListener('load', setAttributeStatus);
        script.addEventListener('error', setAttributeStatus);

        return () => {
            script.removeEventListener('load', setAttributeStatus);
            script.removeEventListener('error', setAttributeStatus);
            if (removeOnUnmount && script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, [src, removeOnUnmount]);

    return status;
}
