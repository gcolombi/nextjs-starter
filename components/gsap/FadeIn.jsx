import gsap from 'gsap';
import { useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

export default function FadeIn({
    children,
    delay = 0,
    duration = 0.5,
    ease = 'power4.out',
    x = 0,
    y = 0,
    xTo = 0,
    yTo = 0
}) {
    const element = useRef();

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(element.current, {
                opacity: 1,
                delay,
                duration,
                ease,
                x: xTo,
                y: yTo
            });
        }, element);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={element} style={{ opacity: 0, transform: `translate(${x}px, ${y}px)` }}>
            {children}
        </div>
    );
};