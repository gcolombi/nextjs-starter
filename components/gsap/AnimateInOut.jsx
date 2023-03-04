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
    delay = 0,
    delayOut = 0,
    set,
    skipOutro,
}) {
    const { timeline } = useTransitionContext();
    const element = useRef();

    useIsomorphicLayoutEffect(() => {
        /* Intro animation */
        if (set) {
            gsap.set(element.current, { ...set });
        }

        gsap.to(element.current, {
            ...to,
            delay: delay,
            duration: durationIn
        });

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
    }, [])

    return (
        <div ref={element}>
            {children}
        </div>
    )
}

export default React.memo(AnimateInOut);