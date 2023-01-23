import { useState, useEffect, useCallback } from 'react'

export default function useNextSibling() {
    /**
     * Mutable values like 'ref.current' aren't valid dependencies
     * because mutating them doesn't re-render the component.
     * Instead, we use a state as a ref to be reactive.
     */
    const [ref, setRef] = useState(null);
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });

    /* Prevent too many rendering using useCallback */
    const handleSize = useCallback(() => {
        setSize({
            width: ref?.getBoundingClientRect().width || 0,
            height: ref?.getBoundingClientRect().height || 0,
        })
    }, [ref?.getBoundingClientRect().height, ref?.getBoundingClientRect().width])

    useEffect(() => {
        window.addEventListener('resize', handleSize);

        /* Call handler right away so state gets updated with initial element size */
        handleSize();

        return () => window.removeEventListener('resize', handleSize);
    }, [handleSize]);

    return [
        setRef,
        size
    ];
}