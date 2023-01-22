import { useState, useEffect, useCallback } from 'react'

export default function useScrollbar() {
    const [scrollbar, setScrollbar] = useState({
        scrollY: 0,
        scrollX: 0,
        directionY: undefined,
        directionX: undefined,
    });

    const updateScrollbar = useCallback(() => {
        setScrollbar((prevState) => {
            const prevScrollY = prevState.scrollY;
            const prevScrollX = prevState.scrollX;

            return {
                scrollY: window.scrollY,
                scrollX: window.scrollX,
                directionY: prevScrollY < window.scrollY ? 'down' : 'up',
                directionX: prevScrollX < window.scrollX ? 'right' : 'left',
            }
        })
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', updateScrollbar);

        return () => {
            window.removeEventListener('scroll', updateScrollbar);
        }
    }, [updateScrollbar]);

    return {
        ...scrollbar
    };
}