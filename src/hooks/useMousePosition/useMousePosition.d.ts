import { RefObject } from 'react';

export interface UseMousePositionResult {
    x: number;
    y: number;
    elementX: number;
    elementY: number;
    centerX: number;
    centerY: number;
    isInside: boolean;
}

export function useMousePosition(
    ref: RefObject<HTMLElement>
): UseMousePositionResult;
