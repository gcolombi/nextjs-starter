import gsap from 'gsap';
import { useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

export default function FadeIn({
    children,
    delay = 1,
    stagger = 0,
    x = 0
}) {
    const element = useRef();

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(element.current.children, {
            // gsap.from(element.current, {
                opacity: 0,
                delay,
                stagger,
                x
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