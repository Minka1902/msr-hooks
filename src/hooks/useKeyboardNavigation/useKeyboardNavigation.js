import { useEffect } from 'react';

/**
 * Navigate through grid-like structures with arrow keys.
 * @param {object} config - Configuration object
 * @param {number} config.selectedIndex - Currently selected item index
 * @param {Function} config.handleSelect - Callback to update selection
 * @param {number} config.totalBytes - Total number of items
 * @param {number} config.bytesPerRow - Items per row in grid
 * @returns {void}
 */
export function useKeyboardNavigation({
    selectedIndex,
    handleSelect,
    totalBytes,
    bytesPerRow
}) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (selectedIndex === null) return;

            let newIndex = selectedIndex;

            switch (event.key) {
                case 'ArrowLeft':
                    newIndex = Math.max(0, selectedIndex - 1);
                    break;
                case 'ArrowRight':
                    newIndex = Math.min(totalBytes - 1, selectedIndex + 1);
                    break;
                case 'ArrowUp':
                    newIndex = Math.max(0, selectedIndex - bytesPerRow);
                    break;
                case 'ArrowDown':
                    newIndex = Math.min(totalBytes - 1, selectedIndex + bytesPerRow);
                    break;
                default:
                    return;
            }

            if (newIndex !== selectedIndex) {
                event.preventDefault();
                handleSelect(newIndex);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, handleSelect, totalBytes, bytesPerRow]);
}
