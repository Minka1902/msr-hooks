import { useEffect, useRef } from 'react';

/**
 * Log which props changed between renders (debugging aid).
 * @param {string} name - Label for the component being inspected
 * @param {object} props - The props/values to track between renders
 * @returns {object|null} A map of changed keys to { from, to }, or null if nothing changed
 */
export function useWhyDidYouUpdate(name, props) {
    const previousProps = useRef();
    const changesRef = useRef(null);

    useEffect(() => {
        if (previousProps.current) {
            const allKeys = Object.keys({ ...previousProps.current, ...props });
            const changes = {};

            allKeys.forEach((key) => {
                if (previousProps.current[key] !== props[key]) {
                    changes[key] = {
                        from: previousProps.current[key],
                        to: props[key]
                    };
                }
            });

            if (Object.keys(changes).length) {
                changesRef.current = changes;
                console.log('[why-did-you-update]', name, changes);
            } else {
                changesRef.current = null;
            }
        }

        previousProps.current = props;
    });

    return changesRef.current;
}
