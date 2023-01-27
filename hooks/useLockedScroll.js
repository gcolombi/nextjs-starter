import { useEffect, useState } from 'react';

export default function useLockedScroll(initialLocked) {
  const [locked, setLocked] = useState(initialLocked);

    /* Do the side effect before render */
    useEffect(() => {

        if (!locked) {
            return;
        }

        /* Save initial body style */
        const originalOverflow = document.body.style.overflow;
        const originalHeight = document.body.style.height;


        /* Lock body scroll */
        document.body.style.overflow = 'hidden';
        document.body.style.height = `${100}vh`;
        document.body.classList.add('has-scroll-lock');

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.height = originalHeight;
            document.body.classList.remove('has-scroll-lock');
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