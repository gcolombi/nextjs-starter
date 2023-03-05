import { gsap } from 'gsap';
import useTransitionContext from '@/context/transitionContext';
import { useMemo, useState, useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

export default function TransitionLayout({
    children
}) {
    const [displayChildren, setDisplayChildren] = useState(children);
    // const { timeline, background } = useTransitionContext();
    const { timeline, setTimeline, background } = useTransitionContext();
    const element = useRef();

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (children !== displayChildren) {
                if (timeline.duration() === 0) {
                    console.log('intro');
                    /* There are no outro animations, so immediately transition */
                    setDisplayChildren(children);
                } else {
                    timeline.play().then(() => {
                        console.log(timeline.duration());
                        console.log('outro');
                        /* outro complete so reset to an empty paused timeline */
                        // timeline.seek(0).pause().clear();
                        // setTimeline(() => gsap.timeline({ paused: true }));
                        setTimeline(gsap.timeline({ paused: true }));
                        setDisplayChildren(children);
                    })
                }
            }
        }, element);
        return () => ctx.revert();
    }, [children]);

    // useIsomorphicLayoutEffect(() => {
    //     gsap.to(element.current, {
    //         background,
    //         duration: 1,
    //     });
    // }, [background]);

    return (
        <div
            ref={element}
        >
            {displayChildren}
        </div>
    );
}