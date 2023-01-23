import { useEffect, useState } from 'react';

export default function useLockedScroll(initialLocked) {
  const [locked, setLocked] = useState(initialLocked);

    /* Do the side effect before render */
    useEffect(() => {

        if (!locked) {
            return;
        }

        /* Lock body scroll */
        document.documentElement.classList.add('has-scroll-lock');

        return () => {
            document.documentElement.classList.remove('has-scroll-lock');
        }
    }, [locked]);

    /* Update state if initialValue changes */
    useEffect(() => {
        if (locked !== initialLocked) {
            setLocked(initialLocked);
        }
    }, [initialLocked]);

    return [locked, setLocked];
}