import { useState, useCallback } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export default function useScrollbar() {
    const [scrollbar, setScrollbar] = useState({
        scrollY: 0,
        scrollX: 0,
        directionY: undefined,
        directionX: undefined
    });

    const updateScrollbar = useCallback(() => {
        setScrollbar((prevState) => {
            const prevScrollY = prevState.scrollY;
            const prevScrollX = prevState.scrollX;

            return {
                scrollY: window.scrollY,
                scrollX: window.scrollX,
                directionY: prevScrollY < window.scrollY ? 1 : -1,
                directionX: prevScrollX < window.scrollX ? 1 : -1
            }
        })
    }, [scrollbar?.scrollY, scrollbar?.scrollX, scrollbar?.directionY, scrollbar?.directionX])

    useIsomorphicLayoutEffect(() => {
        /* Add event listener */
        window.addEventListener('scroll', updateScrollbar);

        /* Remove event listener on cleanup */
        return () => window.removeEventListener('scroll', updateScrollbar);
    }, [updateScrollbar]);

    return {
        ...scrollbar
    };
}