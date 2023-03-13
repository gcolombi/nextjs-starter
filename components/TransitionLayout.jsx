import useTransitionContext from '@/context/transitionContext';
import { useState } from 'react';
import { useRouter } from 'next/router';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

export default function TransitionLayout({
    children
}) {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState({
        route: router.asPath,
        children
    });
    const { timeline, resetTimeline } = useTransitionContext();

    useIsomorphicLayoutEffect(() => {
        if (currentPage.route !== router.asPath) {
            if (timeline.duration() === 0) {
                /* There are no outro animations, so immediately transition */
                setCurrentPage({
                    route: router.asPath,
                    children
                });
            } else {
                timeline.play().then(() => {
                    /* outro complete so reset to an empty paused timeline */
                    resetTimeline();
                    setCurrentPage({
                        route: router.asPath,
                        children
                    });
                });
            }
        }
    }, [router.asPath]);

    return (
        <div
            className='u-overflow--hidden'
        >
            {currentPage.children}
        </div>
    );
}