export type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface UseScriptOptions {
    removeOnUnmount?: boolean;
}

export function useScript(src: string, options?: UseScriptOptions): ScriptStatus;
