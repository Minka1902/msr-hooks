export interface UseStepHelpers {
    goToNextStep: () => void;
    goToPrevStep: () => void;
    setStep: (step: number | ((prev: number) => number)) => void;
    reset: () => void;
    canGoNext: boolean;
    canGoPrev: boolean;
}

export function useStep(maxStep: number, initialStep?: number): [number, UseStepHelpers];
