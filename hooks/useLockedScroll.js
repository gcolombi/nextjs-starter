import { useEffect, useState } from 'react';

export default function useLockedScroll(initialLocked) {
  const [locked, setLocked] = useState(initialLocked);

    /* Do the side effect before render */
    useEffect(() => {

        if (!locked) {
            return;
        }

        /* Save initial body style */
        const originalOverflow = document.documentElement.style.overflow;
        const originalHeight = document.documentElement.style.height;


        /* Lock body scroll */
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.height = `${100}px`;
        document.documentElement.classList.add('has-scroll-lock');

        return () => {
            document.documentElement.style.overflow = originalOverflow;
            document.documentElement.style.height = originalHeight;
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