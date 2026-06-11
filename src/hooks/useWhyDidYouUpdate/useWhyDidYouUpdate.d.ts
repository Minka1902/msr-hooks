export interface PropChange {
    from: unknown;
    to: unknown;
}

export function useWhyDidYouUpdate(
    name: string,
    props: Record<string, unknown>
): Record<string, PropChange> | null;
