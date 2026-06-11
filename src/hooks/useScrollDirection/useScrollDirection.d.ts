export interface UseScrollDirectionOptions {
    threshold?: number;
}

export function useScrollDirection(
    options?: UseScrollDirectionOptions
): 'up' | 'down' | null;
