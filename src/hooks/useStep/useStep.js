import { useCallback, useMemo, useState } from 'react';

/**
 * Multi-step / wizard navigation state.
 * @param {number} maxStep - Highest step index (steps run 0..maxStep)
 * @param {number} [initialStep] - Starting step index
 * @returns {[number, { goToNextStep: Function, goToPrevStep: Function, setStep: Function, reset: Function, canGoNext: boolean, canGoPrev: boolean }]}
 */
export function useStep(maxStep, initialStep = 0) {
    const clamp = useCallback(
        (value) => Math.min(Math.max(value, 0), maxStep),
        [maxStep]
    );

    const [currentStep, setCurrentStep] = useState(() => clamp(initialStep));

    const goToNextStep = useCallback(() => {
        setCurrentStep((prev) => clamp(prev + 1));
    }, [clamp]);

    const goToPrevStep = useCallback(() => {
        setCurrentStep((prev) => clamp(prev - 1));
    }, [clamp]);

    const setStep = useCallback((step) => {
        setCurrentStep((prev) => clamp(step instanceof Function ? step(prev) : step));
    }, [clamp]);

    const reset = useCallback(() => setCurrentStep(clamp(initialStep)), [clamp, initialStep]);

    const helpers = useMemo(
        () => ({
            goToNextStep,
            goToPrevStep,
            setStep,
            reset,
            canGoNext: currentStep < maxStep,
            canGoPrev: currentStep > 0
        }),
        [goToNextStep, goToPrevStep, setStep, reset, currentStep, maxStep]
    );

    return [currentStep, helpers];
}
