import { useCallback, useState } from 'react';

/**
 * Copy text to clipboard.
 * @returns {[() => Promise<void>, boolean]} [copy function, isCopied state]
 */
export function useClipboard() {
    const [isCopied, setIsCopied] = useState(false);

    const copy = useCallback(async (text) => {
        if (!navigator?.clipboard) {
            console.warn('Clipboard API not available');
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.warn('Failed to copy text', error);
            setIsCopied(false);
        }
    }, []);

    return [copy, isCopied];
}
