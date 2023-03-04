import { gsap } from 'gsap';
import React, { useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import useTransitionContext from '@/context/transitionContext';

function AnimateInOut({
    children,
    from,
    to,
    durationIn,
    durationOut,
    delay,
    delayOut,
    set,
    ease,
    skipOutro
}) {
    const { timeline } = useTransitionContext();
    const element = useRef();

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {

            /* Intro animation */
            if (set) {
                gsap.set(element.current, { ...set })
            }

            gsap.to(element.current, {
                ...to,
                delay: delay,
                duration: durationIn,
                ease
            })

            /* Outro animation */
            if (!skipOutro) {
                console.log('yo add from to timeline');
                timeline.add(
                    gsap.to(element.current, {
                        ...from,
                        delay: delayOut,
                        duration: durationOut,
                        ease
                    }),
                    0
                )
            }
        }, element);
        return () => ctx.revert();
    }, [])

    return (
        <div ref={element} style={from}>
            {children}
        </div>
    )
}

export default React.memo(AnimateInOut);