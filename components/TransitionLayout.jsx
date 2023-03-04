import useTransitionContext from '@/context/transitionContext';
import { gsap } from 'gsap';
import { useState, useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

export default function TransitionLayout({
    children
}) {
    const [displayChildren, setDisplayChildren] = useState(children);
    const { timeline, background } = useTransitionContext();
    const element = useRef();

    useIsomorphicLayoutEffect(() => {
        if (children !== displayChildren) {
            if (timeline.duration() === 0) {
                /* There are no outro animations, so immediately transition */
                setDisplayChildren(children);
            } else {
                timeline.play().then(() => {
                    /* outro complete so reset to an empty paused timeline */
                    timeline.seek(0).pause().clear();
                    setDisplayChildren(children);
                })
            }
        }
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