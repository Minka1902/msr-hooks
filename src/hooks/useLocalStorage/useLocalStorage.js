import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * State synced to localStorage with JSON parsing and SSR guard.
 * @param {string} key - Storage key
 * @param {*} initialValue - Initial value if not in storage
 * @returns {[*, Function]} [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
    const isBrowser = typeof window !== 'undefined';

    const read = useCallback(
        (storageKey, fallback) => {
            if (!isBrowser) return fallback;
            try {
                const item = window.localStorage.getItem(storageKey);
                return item ? JSON.parse(item) : fallback;
            } catch (error) {
                console.warn('useLocalStorage read error', error);
                return fallback;
            }
        },
        [isBrowser]
    );

    const [storedValue, setStoredValue] = useState(() => read(key, initialValue));

    // Track the latest initialValue without making it a re-read dependency, so
    // passing an inline literal (e.g. `[]`/`{}`) does not cause a render loop.
    const initialValueRef = useRef(initialValue);
    useEffect(() => {
        initialValueRef.current = initialValue;
    }, [initialValue]);

    const setValue = useCallback(
        (value) => {
            if (!isBrowser) return;
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.warn('useLocalStorage write error', error);
            }
        },
        [isBrowser, key, storedValue]
    );

    // Re-read only when the key changes, never on initialValue identity changes.
    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        setStoredValue(read(key, initialValueRef.current));
    }, [key, read]);

    return [storedValue, setValue];
}
