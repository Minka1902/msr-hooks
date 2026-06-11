import { MutableRefObject } from 'react';

export function useLatest<T>(value: T): MutableRefObject<T>;
