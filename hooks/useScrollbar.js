import { useState, useEffect, useCallback } from 'react'

export default function useScrollbar() {
    const [scrollbar, setScrollbar] = useState({
        y: 0,
        x: 0,
        directionY: undefined,
        directionX: undefined,
    });

    const updateScrollbar = useCallback(() => {
        setScrollbar((prevState) => {
            const prevScrollY = prevState.y;
            const prevScrollX = prevState.x;

            return {
                y: window.scrollY,
                x: window.scrollX,
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