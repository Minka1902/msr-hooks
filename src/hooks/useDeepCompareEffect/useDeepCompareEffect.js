import { useEffect, useRef } from 'react';

function isObject(value) {
    return value !== null && typeof value === 'object';
}

function deepEqual(a, b) {
    if (Object.is(a, b)) return true;
    if (!isObject(a) || !isObject(b)) return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;

    for (const key of aKeys) {
        if (!bKeys.includes(key)) return false;
        if (!deepEqual(a[key], b[key])) return false;
    }

    return true;
}

/**
 * useEffect with deep comparison on dependencies.
 * @param {React.EffectCallback} effect
 * @param {React.DependencyList} deps
 */
export function useDeepCompareEffect(effect, deps) {
    const previousDepsRef = useRef();
    const signalRef = useRef(0);
    const dependencyList = deps || [];

    // Deep-compare-effect must track and bump a signal during render to decide
    // whether the deeply-equal dependencies actually changed; this render-time
    // ref access is fundamental to the hook.
    if (!previousDepsRef.current || !deepEqual(previousDepsRef.current, dependencyList)) {
        previousDepsRef.current = dependencyList;
        signalRef.current += 1;
    }

    // The effect is forwarded from the caller, so its deps can't be inferred
    // statically; the signal ref drives re-runs instead.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, [signalRef.current]);
}
