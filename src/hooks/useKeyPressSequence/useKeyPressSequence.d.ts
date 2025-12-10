export function useKeyPressSequence(
    sequence: string | string[],
    handler: (event: KeyboardEvent) => void,
    options?: { timeout?: number }
): void;
