import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import useTransitionContext from '@/context/transitionContext';
import { randomNumber } from '@/utils/number';

// gsap.registerPlugin(ScrollTrigger);

export default function RotateInOut3D({
    children,
    durationIn = 0.5,
    durationOut = 0.25,
    delay = 0,
    delayOut = 0,
    ease = 'power4.inOut',
    easeOut = 'power4.out',
    x = 0,
    y = 0,
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
            gsap.fromTo(
                element.current,
                {
                    x,
                    y,
                    rotationX: randomNumber(-80, 80),
                    rotationY: randomNumber(-40, 40),
                    rotationZ: randomNumber(-10, 10),
                    scale: 0.8,
                    opacity: 0
                },
                {
                    x: 0,
                    y: 0,
                    rotationX: 0,
                    rotationY: 0,
                    rotationZ: 0,
                    scale: 1,
                    opacity: 1,
                    ease,
                    delay,
                    duration: durationIn,
                    ...scrollTrigger
                }
            );

            /* Outro animation */
            if (!skipOutro) {
                timeline.add(
                    gsap.to(
                        element.current,
                        {
                            x,
                            y,
                            rotationX: randomNumber(-80, 80),
                            rotationY: randomNumber(-40, 40),
                            rotationZ: randomNumber(-10, 10),
                            opacity: 0,
                            ease: easeOut,
                            delay: delayOut,
                            duration: durationOut
                        }
                    ),
                    0
                );
            }
        }, element);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={element} style={{ opacity: 0 }}>
            {children}
        </div>
    );
};