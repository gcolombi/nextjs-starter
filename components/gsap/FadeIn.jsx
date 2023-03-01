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
            gsap.from(element.current, {
                opacity: 0,
                delay,
                duration,
                stagger,
                ease,
                x,
                y
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div ref={element}>
            {children}
        </div>
    );
};