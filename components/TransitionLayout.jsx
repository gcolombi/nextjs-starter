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

// export default function TransitionLayout({ children }) {
//     const [displayChildren, setDisplayChildren] = useState(children);
//     const memoizedChildren = useMemo(() => children, [children]);
//     // const { timeline, resetTimeline } = useTransitionContext();
//     const { timeline, setTimeline } = useTransitionContext();
//     const element = useRef();

//     useIsomorphicLayoutEffect(() => {
//         const ctx = gsap.context(() => {
//             console.log('enter');
//             if (memoizedChildren !== displayChildren) {
//                 if (timeline.duration() === 0) {
//                     console.log('intro');
//                     // there are no outro animations, so immediately transition
//                     setDisplayChildren(children);
//                 } else {
//                     console.log(timeline);
//                     timeline.play().then(() => {
//                         console.log("page transition played");
//                         // outro complete so reset to an empty paused timeline
//                         // resetTimeline();

//                         // timeline.seek(0).pause().clear();

//                         setTimeline(() => gsap.timeline({ paused: true }));

//                         setDisplayChildren(children);

//                         // timeline.seek(0).pause().clear();

//                         // if (element.current) {
//                         //     element.current.style.opacity = `0`;
//                         // }

//                         /**
//                          * Avoid flashy
//                          */
//                         // setTimeout(() => {
//                         //     setDisplayChildren(children);
//                         //     if (element.current) {
//                         //         element.current.style.opacity = `1`;
//                         //     }
//                         // }, 200);

//                     });
//                 }
//             }
//         }, element);
//         return () => ctx.revert();
//     }, [memoizedChildren]);

//     return <div ref={element}>{displayChildren}</div>;
// }