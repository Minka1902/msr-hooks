import { RefObject } from 'react';

export type Placement = 'top' | 'bottom' | 'left' | 'right';

export interface UsePositionConfig {
    anchor: RefObject<HTMLElement>;
    floating: RefObject<HTMLElement>;
    placement?: Placement;
}

export interface UsePositionResult {
    x: number;
    y: number;
    placement: Placement;
}

export function usePosition(config: UsePositionConfig): UsePositionResult;
