import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Merge controlled and uncontrolled state into a single API.
 * When `value` is provided the hook is controlled and the setter only
 * forwards to `onChange`; otherwise it manages internal state.
 * @param {object} config - Configuration object
 * @param {*} [config.value] - Controlled value (omit/undefined for uncontrolled)
 * @param {*} [config.defaultValue] - Initial value when uncontrolled
 * @param {Function} [config.onChange] - Called with the next value on every change
 * @returns {[*, Function]} [value, setValue] where setValue accepts a value or updater
 */
export function useControllableState({ value, defaultValue, onChange } = {}) {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const currentValue = isControlled ? value : internalValue;

    // Keep latest values in refs so the setter identity stays stable.
    const onChangeRef = useRef(onChange);
    const isControlledRef = useRef(isControlled);
    const currentValueRef = useRef(currentValue);

    useEffect(() => {
        onChangeRef.current = onChange;
        isControlledRef.current = isControlled;
        currentValueRef.current = currentValue;
    });

    const setValue = useCallback((next) => {
        const resolved =
            typeof next === 'function' ? next(currentValueRef.current) : next;

        if (!isControlledRef.current) {
            setInternalValue(resolved);
        }

        if (onChangeRef.current) {
            onChangeRef.current(resolved);
        }
    }, []);

    return [currentValue, setValue];
}
