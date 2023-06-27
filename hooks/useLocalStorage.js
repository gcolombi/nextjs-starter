import { useCallback, useEffect, useState } from 'react';

export default function useLocalStorage(
    key,
    initialValue
) {
    /**
     * Retrieves from the localStorage the value saved with the key argument
     * then parse stored json or return initialValue
     */
    const loadStoredValue = useCallback(() => {
        /* Prevent build error "window is undefined" but keeps working */
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    }, [initialValue, key]);

    /* State to store the value */
    const [storedValue, setStoredValue] = useState(loadStoredValue);

    /**
     * Sets the value in localStorage
     */
    const setValue = (value) => {
        /* Prevent build error "window is undefined" but keeps working */
        if (typeof window === 'undefined') {
            console.warn(`Tried setting localStorage key "${key}" even though environment is not a client`);
        }

        try {
            /* Allow value to be a function */
            const newValue = value instanceof Function ? value(storedValue) : value;
            /* Save to local storage */
            window.localStorage.setItem(key, JSON.stringify(newValue));
            /* Save state */
            setStoredValue(newValue);
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    };

    useEffect(() => {
        setStoredValue(loadStoredValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);/* Empty array ensures that effect is only run on mount */

    return [storedValue, setValue];
}