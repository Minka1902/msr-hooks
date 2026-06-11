import { useCallback, useEffect, useState } from 'react';

/**
 * State synced to sessionStorage with JSON parsing and SSR guard.
 * @param {string} key - Storage key
 * @param {*} initialValue - Initial value if not in storage
 * @returns {[*, Function]} [storedValue, setValue]
 */
export function useSessionStorage(key, initialValue) {
    const isBrowser = typeof window !== 'undefined';

    const readValue = useCallback(() => {
        if (!isBrowser) return initialValue;
        try {
            const item = window.sessionStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn('useSessionStorage read error', error);
            return initialValue;
        }
    }, [initialValue, isBrowser, key]);

    const [storedValue, setStoredValue] = useState(readValue);

    const setValue = useCallback(
        (value) => {
            if (!isBrowser) return;
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.warn('useSessionStorage write error', error);
            }
        },
        [isBrowser, key, storedValue]
    );

    useEffect(() => {
        setStoredValue(readValue());
    }, [readValue]);

    return [storedValue, setValue];
}
