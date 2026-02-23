import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

export const useLocalState = <T>(
    key: string,
    initialValue?: T,
    onInit?: () => void
): [T, Dispatch<SetStateAction<T>>] => {
    const [state, setState] = useState<T>(() => {
        const storedValue = localStorage.getItem(key);

        onInit?.();

        return storedValue ? JSON.parse(storedValue) : initialValue || null;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
};

export const useDebounce = <T>(value: T, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
};
