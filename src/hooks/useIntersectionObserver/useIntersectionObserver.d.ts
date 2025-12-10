import React from 'react';

export function useIntersectionObserver(
    options?: IntersectionObserverInit
): [React.RefObject<HTMLElement>, boolean];
