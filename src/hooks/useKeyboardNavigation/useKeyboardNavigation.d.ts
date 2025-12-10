export interface UseKeyboardNavigationConfig {
    selectedIndex: number | null;
    handleSelect: (index: number | null) => void;
    totalBytes: number;
    bytesPerRow: number;
}

export function useKeyboardNavigation(
    config: UseKeyboardNavigationConfig
): void;
