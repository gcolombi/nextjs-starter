import useTransitionContext from '@/context/transitionContext';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

export default function TransitionLayout({
    children
}) {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState({
        route: router.asPath,
        children
    })
    const { timeline, resetTimeline, background } = useTransitionContext();
    const element = useRef();

    useIsomorphicLayoutEffect(() => {
        console.log('route changed');
        if (currentPage.route !== router.asPath) {
            if (timeline.duration() === 0) {
                console.log('intro');
                /* There are no outro animations, so immediately transition */
                setCurrentPage({
                    route: router.asPath,
                    children
                })
            } else {
                timeline.play().then(() => {
                    console.log(timeline.duration());
                    console.log('outro');
                    /* outro complete so reset to an empty paused timeline */
                    resetTimeline();
                    setCurrentPage({
                        route: router.asPath,
                        children
                    })
                })
            }
        }
    }, [router.asPath]);

    // useIsomorphicLayoutEffect(() => {
    //     gsap.to(element.current, {
    //         background,
    //         duration: 1,
    //     });
    // }, [background]);

    return (
        <div
            className='u-overflow--hidden'
            ref={element}
        >
            {currentPage.children}
        </div>
    );
}