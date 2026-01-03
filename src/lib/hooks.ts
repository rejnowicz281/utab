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
