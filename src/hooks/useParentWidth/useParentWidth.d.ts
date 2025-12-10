import React from 'react';

export interface UseParentWidthReturn {
    parentWidth: number | null;
    childRef: React.RefObject<HTMLDivElement>;
}

export function useParentWidth(): UseParentWidthReturn;
