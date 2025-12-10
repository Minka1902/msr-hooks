import React from 'react';

export function useEventListener(
    target: EventTarget | null | undefined | React.RefObject<EventTarget>,
    type: string,
    listener: (event: Event) => void,
    options?: boolean | AddEventListenerOptions
): void;
