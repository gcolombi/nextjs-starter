import { gsap } from 'gsap';
import React, { useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import useTransitionContext from '@/context/transitionContext';

function AnimateInOut({
    children,
    durationIn,
    durationOut,
    delay,
    delayOut,
    set,
    from,
    to,
    skipOutro
}) {
    const { timeline } = useTransitionContext();
    const element = useRef();

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {

            /* Intro animation */
            if (set) {
                gsap.set(element.current, { ...set });
            }

            gsap.to(element.current, {
                ...to,
                delay: delay,
                duration: durationIn
            })

            /* Outro animation */
            if (!skipOutro) {
                timeline.add(
                    gsap.to(element.current, {
                        ...from,
                        delay: delayOut,
                        duration: durationOut
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