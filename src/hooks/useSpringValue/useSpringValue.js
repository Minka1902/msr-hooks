import { useEffect, useRef, useState } from 'react';

/**
 * Spring-animate a numeric value toward a target.
 * @param {number} target
 * @param {{ stiffness?: number; damping?: number; mass?: number; precision?: number }} config
 */
export function useSpringValue(target, config = {}) {
    const { stiffness = 170, damping = 26, mass = 1, precision = 0.001 } = config;
    const [value, setValue] = useState(target);
    const velocityRef = useRef(0);
    const frameRef = useRef();
    const lastTimeRef = useRef();

    useEffect(() => {
        if (typeof window === 'undefined') {
            // No requestAnimationFrame available: snap straight to the target.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setValue(target);
            return undefined;
        }

        let cancelled = false;

        const step = (timestamp) => {
            if (cancelled) return;
            if (lastTimeRef.current == null) {
                lastTimeRef.current = timestamp;
            }
            const delta = (timestamp - lastTimeRef.current) / 1000;
            lastTimeRef.current = timestamp;

            setValue((current) => {
                const displacement = current - target;
                const springForce = -stiffness * displacement;
                const dampingForce = -damping * velocityRef.current;
                const acceleration = (springForce + dampingForce) / mass;

                velocityRef.current += acceleration * delta;
                const next = current + velocityRef.current * delta;

                const settled = Math.abs(velocityRef.current) < precision && Math.abs(next - target) < precision;
                if (settled) {
                    velocityRef.current = 0;
                    frameRef.current = undefined;
                    lastTimeRef.current = undefined;
                    return target;
                }

                frameRef.current = window.requestAnimationFrame(step);
                return next;
            });
        };

        frameRef.current = window.requestAnimationFrame(step);

        return () => {
            cancelled = true;
            if (frameRef.current) {
                window.cancelAnimationFrame(frameRef.current);
            }
            frameRef.current = undefined;
            lastTimeRef.current = undefined;
        };
    }, [target, stiffness, damping, mass, precision]);

    return value;
}
