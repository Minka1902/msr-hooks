import React from 'react';

export function useAsyncEffect(
    effect: (signal: AbortSignal) => void | (() => void) | Promise<void | (() => void)>,
    deps?: React.DependencyList
): void;
