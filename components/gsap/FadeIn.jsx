import gsap from 'gsap';
import { useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

export default function FadeIn({
    children,
    delay = 1,
    duration = 0.4,
    stagger = 0,
    ease = 'power4.out',
    x = 0,
    y = 0
}) {
    const element = useRef();

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(element.current, {
                opacity: 1,
                delay,
                duration,
                stagger,
                ease,
                x: 0,
                y: 0
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