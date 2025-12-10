export function useEffectAfterMount(
    effect: () => void | (() => void),
    deps?: React.DependencyList
): void;
