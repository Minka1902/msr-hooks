import React from 'react';

export function useHoverIntent(
    ref: React.RefObject<HTMLElement>,
    options?: { delay?: number; leaveDelay?: number; sensitivity?: number }
): boolean;
