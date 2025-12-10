import { useEffect } from 'react';

/**
 * Prevent page zoom via keyboard shortcuts and scroll wheel.
 * @param {boolean} scrollCheck - Prevent Ctrl+Scroll zoom, defaults to true
 * @param {boolean} keyboardCheck - Prevent Ctrl+Plus/Minus zoom, defaults to true
 * @returns {void}
 */
export function usePreventZoom(scrollCheck = true, keyboardCheck = true) {
    useEffect(() => {
        const handleKeydown = (e) => {
            if (!keyboardCheck) return;

            const isCtrlOrCmd = e.ctrlKey || e.metaKey;
            const zoomKeys = ['61', '107', '173', '109', '187', '189'];

            if (isCtrlOrCmd && zoomKeys.includes(e.code)) {
                e.preventDefault();
            }
        };

        const handleWheel = (e) => {
            if (!scrollCheck) return;

            const isCtrlOrCmd = e.ctrlKey || e.metaKey;
            if (isCtrlOrCmd) {
                e.preventDefault();
            }
        };

        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            document.removeEventListener('keydown', handleKeydown);
            document.removeEventListener('wheel', handleWheel);
        };
    }, [scrollCheck, keyboardCheck]);
}
