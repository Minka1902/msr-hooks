import React from 'react';

export function useClickOutsideObject(
    ref: React.RefObject<HTMLElement>,
    handler: () => void,
    dontReactTo?: string,
    excludeRef?: React.RefObject<HTMLElement>
): void;
