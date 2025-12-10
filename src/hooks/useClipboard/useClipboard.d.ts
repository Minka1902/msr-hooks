export function useClipboard(): [
    (text: string) => Promise<void>,
    boolean
];
