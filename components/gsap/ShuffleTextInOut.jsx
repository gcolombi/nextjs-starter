import { gsap } from 'gsap';
import { SplitText } from 'gsap/dist/SplitText';
import { ScrambleTextPlugin } from 'gsap/dist/ScrambleTextPlugin';
import { useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import useTransitionContext from '@/context/transitionContext';
import { shuffle } from '@/utils/array';
import { randomNumber } from '@/utils/number';

if (typeof window !== "undefined"){
    gsap.registerPlugin(SplitText, ScrambleTextPlugin);
}

export default function ShuffleTextInOut({
    children,
    durationIn = 0.5,
    durationOut = 0.25,
    delay = 0,
    delayOut = 0,
    ease = 'power4.out',
    target,
    skipOutro
}) {
    const { timeline } = useTransitionContext();
    const element = useRef();


    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const splitWord = new SplitText(target, {
                type: 'words'
            });
            const words = splitWord.words;

            /* Intro animation */
            words.forEach((word, index) => {
                const splitText = new SplitText(word);
                const chars = shuffle(splitText.chars);
                let string = '';

                chars.forEach(char => {
                    string += char.innerText;
                });

                console.log(string);

                const tween = gsap.to(word, {
                    duration: .45,
                    // delay: .5,
                    scrambleText:{
                        text: '{original}',
                        // text: string,
                        chars: string,
                        // rightToLeft: true
                    },
                    onComplete: () => tween.reverse()
                    // paused: true
                });

                /* Outro animation */
                if (!skipOutro) {
                    timeline.add(
                        gsap.to(word, {
                            duration: .25,
                            // delay: .5,
                            scrambleText:{
                                text: '{original}',
                                // text: string,
                                chars: string,
                                // rightToLeft: true
                            },
                            onComplete: () => tween.reverse()
                            // paused: true
                        })
                    )
                }
            });

            // /* Outro animation */
            // if (!skipOutro) {
            //     timeline.add(
            //         tween.reverse()
            //     )
            // }

            // gsap.to(element.current, {
            //     opacity: 1
            // })

        }, element);
        return () => ctx.revert();
    }, [])

    return (
        // <div ref={element} style={{ opacity: 0 }}>
        <div ref={element}>
            {children}
        </div>
    );
};