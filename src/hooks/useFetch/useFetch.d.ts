export interface UseFetchReturn<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useFetch<T = any>(
    url: string,
    options?: RequestInit
): UseFetchReturn<T>;
