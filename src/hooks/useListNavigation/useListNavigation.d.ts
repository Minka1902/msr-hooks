import { Dispatch, KeyboardEvent, SetStateAction } from 'react';

export interface UseListNavigationConfig {
    count: number;
    onSelect?: (index: number) => void;
    loop?: boolean;
}

export interface UseListNavigationResult {
    activeIndex: number;
    setActiveIndex: Dispatch<SetStateAction<number>>;
    onKeyDown: (event: KeyboardEvent) => void;
}

export function useListNavigation(
    config: UseListNavigationConfig
): UseListNavigationResult;
