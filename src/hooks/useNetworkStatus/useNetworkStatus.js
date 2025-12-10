import { useEffect, useState } from 'react';

const getConnection = () => {
    if (typeof navigator === 'undefined') return null;
    return navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;
};

const readStatus = () => {
    const online = typeof navigator !== 'undefined' ? navigator.onLine : true;
    const conn = getConnection();
    return {
        online,
        downlink: conn?.downlink ?? null,
        rtt: conn?.rtt ?? null,
    };
};

/**
 * Detect network status with basic debouncing and connection details.
 * @returns {{online: boolean, downlink: number|null, rtt: number|null}}
 */
export function useNetworkStatus() {
    const [state, setState] = useState(readStatus);

    useEffect(() => {
        let timer = null;
        const scheduleUpdate = () => {
            clearTimeout(timer);
            timer = setTimeout(() => setState(readStatus()), 150);
        };

        window.addEventListener('online', scheduleUpdate);
        window.addEventListener('offline', scheduleUpdate);

        const conn = getConnection();
        conn?.addEventListener?.('change', scheduleUpdate);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('online', scheduleUpdate);
            window.removeEventListener('offline', scheduleUpdate);
            conn?.removeEventListener?.('change', scheduleUpdate);
        };
    }, []);

    return state;
}
