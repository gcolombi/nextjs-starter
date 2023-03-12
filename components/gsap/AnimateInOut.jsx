import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import React, { useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import useTransitionContext from '@/context/transitionContext';

if (typeof window !== "undefined"){
    gsap.registerPlugin(ScrollTrigger);
}

function AnimateInOut({
    children,
    durationIn,
    durationOut,
    delay,
    delayOut,
    from,
    to,
    skipOutro,
    watch = false,
    start = 'top 90%',
    end = '',
    scrub = false,
    markers
}) {
    const { timeline } = useTransitionContext();
    const element = useRef();

    useIsomorphicLayoutEffect(() => {
        const scrollTrigger = watch ? {
            scrollTrigger: {
                trigger: element.current,
                start,
                end,
                scrub,
                markers: markers
            }
        } : {};

        const ctx = gsap.context(() => {

            /* Intro animation */
            gsap.to(element.current, {
                ...to,
                delay: delay,
                duration: durationIn,
                ...scrollTrigger
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
                );
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