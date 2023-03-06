import { gsap } from 'gsap';
import { SplitText } from 'gsap/dist/SplitText';
import { ScrambleTextPlugin } from 'gsap/dist/ScrambleTextPlugin';
import { useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import useTransitionContext from '@/context/transitionContext';
import { shuffle } from '@/utils/array';

if (typeof window !== "undefined"){
    gsap.registerPlugin(SplitText, ScrambleTextPlugin);
}

export default function ShuffleTextInOut({
    children,
    durationIn = 0.8,
    durationOut = 0.5,
    revealDelayIn = 0.5,
    revealDelayOut = 0.35,
    ease = 'none',
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
            words.forEach(word => {
                const splitText = new SplitText(word);
                const chars = shuffle(splitText.chars);
                let string = '';

                chars.forEach(char => {
                    string += char.innerText;
                });

                gsap.to(word, {
                    duration: durationIn,
                    ease,
                    scrambleText:{
                        text: '{original}',
                        chars: string,
                        revealDelay: revealDelayIn
                    }
                });

                /* Outro animation */
                if (!skipOutro) {
                    timeline.add(
                        gsap.to(word, {
                            duration: durationOut,
                            ease,
                            scrambleText:{
                                text: '{original}',
                                chars: string,
                                revealDelay: revealDelayOut
                            }
                        }),
                        0
                    )
                }
            });
        }, element);
        return () => ctx.revert();
    }, [])

    return (
        <div ref={element}>
            {children}
        </div>
    );
};