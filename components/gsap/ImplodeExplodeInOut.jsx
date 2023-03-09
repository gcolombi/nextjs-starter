import { gsap } from 'gsap';
import { SplitText } from 'gsap/dist/SplitText';
import { useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import useTransitionContext from '@/context/transitionContext';
import { randomNumber } from '@/utils/number';

if (typeof window !== "undefined"){
    gsap.registerPlugin(SplitText);
}

export default function ImplodeExplodeInOut({
    children,
    durationIn = 1,
    durationOut = 0.5,
    delay = 0,
    delayOut = 0,
    ease = 'power4.out',
    easeOut = 'power4.in',
    target,
    skipOutro
}) {
    const { timeline } = useTransitionContext();
    const element = useRef();

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const splitText = new SplitText(target);
            const chars = splitText.chars;

            chars.forEach(char => {
                /* Intro animation */
                gsap.fromTo(
                    char,
                    {
                        x: randomNumber(-2000, 2000),
                        y: randomNumber(-1000, 1000),
                        z: randomNumber(100, 100),
                        rotation: randomNumber(360, 720),
                        rotationX: randomNumber(-360, 360),
                        rotationY: randomNumber(-360, 360),
                        opacity: 0,
                        ease
                    },
                    {
                        x: 0,
                        y: 0,
                        z: 0,
                        rotation: 0,
                        rotationX: 0,
                        rotationY: 0,
                        opacity: 1,
                        ease,
                        delay,
                        duration: durationIn
                    }
                );

                /* Outro animation */
                if (!skipOutro) {
                    timeline.add(
                        gsap.to(
                            char,
                            {
                                x: randomNumber(-2000, 2000),
                                y: randomNumber(-1000, 1000),
                                z: randomNumber(100, 100),
                                rotation: randomNumber(360, 720),
                                rotationX: randomNumber(-360, 360),
                                rotationY: randomNumber(-360, 360),
                                opacity: 0,
                                ease: easeOut,
                                delay: delayOut,
                                duration: durationOut
                            }
                        ),
                        0
                    );
                }
            });

            gsap.to(element.current, {
                opacity: 1
            })

        }, element);
        return () => ctx.revert();
    }, [])

    return (
        <div ref={element} style={{ opacity: 0 }}>
            {children}
        </div>
    );
}