import React, { useRef, useContext } from 'react';
import { gsap } from 'gsap';
import { TransitionContext } from '@/context/TransitionContext';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

const AnimateInOut = ({
    children,
    as,
    from,
    to,
    durationIn,
    durationOut,
    delay,
    delayOut,
    set,
    skipOutro,
}) => {
  const { timeline } = useContext(TransitionContext);
  const element = useRef();

    useIsomorphicLayoutEffect(() => {
        // intro animation
        if (set) {
            gsap.set(element.current, { ...set });
        }
        gsap.to(element.current, {
            ...to,
            delay: delay || 0,
            duration: durationIn,
        });

        // outro animation
        if (!skipOutro) {
            timeline.add(
                gsap.to(element.current, {
                    ...from,
                    delay: delayOut || 0,
                    duration: durationOut,
                }),
                0
            );
        }
    }, []);

    return (
        // <div as={as} sx={from} ref={element}>
        <div ref={element}>
            {children}
        </div>
    )
}

export default React.memo(AnimateInOut)