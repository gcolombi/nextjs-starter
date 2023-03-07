import { gsap } from 'gsap';
import AnimateInOut from './AnimateInOut';
import { useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import useTransitionContext from '@/context/transitionContext';
import { randomNumber } from '@/utils/number';

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
    skipOutro
}) {
    const { timeline } = useTransitionContext();
    const element = useRef();

    useIsomorphicLayoutEffect(() => {
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
                    transformOrigin: '50% 50%',
                    perspective: 10,
                    scale: 0.8,
                    opacity: 0
                    // x: randomNumber(-2000, 2000),
                    // y: randomNumber(-1000, 1000),
                    // z: randomNumber(100, 100),
                    // opacity: 0,
                    // rotation: randomNumber(360, 720),
                    // rotationX: randomNumber(-360, 360),
                    // rotationY: randomNumber(-360, 360),
                    // ease
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
                    duration: durationIn
                    // x: 0,
                    // y: 0,
                    // z: 0,
                    // rotation: 0,
                    // rotationX: 0,
                    // rotationY: 0,
                    // opacity: 1,
                    // ease,
                    // delay,
                    // duration: durationIn
                }
            )

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
                            // x: randomNumber(-2000, 2000),
                            // y: randomNumber(-1000, 1000),
                            // z: randomNumber(100, 100),
                            // opacity: 0,
                            // rotation: randomNumber(360, 720),
                            // rotationX: randomNumber(-360, 360),
                            // rotationY: randomNumber(-360, 360),
                            // ease: easeOut,
                            // delay: delayOut,
                            // duration: durationOut
                        }
                    ),
                    0
                )
            }
        }, element);
        return () => ctx.revert();
    }, [])

    return (

        <div ref={element} style={{ opacity: 0 }}>
            {children}
        </div>

        // <AnimateInOut
        //     durationIn={durationIn}
        //     durationOut={durationOut}
        //     delay={delay}
        //     delayOut={delayOut}
        //     set={{
        //         opacity: 0,
        //         scale: 0.8,
        //         transformOrigin: '50% 50%',
        //         perspective: 10,
        //         rotationX: randomNumber(-80, 80),
        //         rotationY: randomNumber(-40, 40),
        //         rotationZ: randomNumber(-10, 10),
        //         x,
        //         y
        //     }}
        //     from={{
        //         opacity: 0,
        //         rotationX: randomNumber(-80, 80),
        //         rotationY: randomNumber(-40, 40),
        //         rotationZ: randomNumber(-10, 10),
        //         x,
        //         y
        //         // transform: `translate(${x}px, ${y}px) rotate3d(${randomNumber(-80, 80)}, ${randomNumber(-40, 40)}, ${randomNumber(-10, 10)}, 0)`
        //     }}
        //     to={{
        //         ease,
        //         opacity: 1,
        //         scale: 1,
        //         rotationX: 0,
        //         rotationY: 0,
        //         rotationZ: 0,
        //         x: xTo,
        //         y: yTo
        //     }}


        //     skipOutro={skipOutro}
        // >
        //     {children}
        // </AnimateInOut>
    );
};