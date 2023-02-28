import { TransitionContext } from '@/context/TransitionContext';
import { useState, useContext, useEffect } from 'react';

export default function TransitionLayout({ children }) {
    const [displayChildren, setDisplayChildren] = useState(children);
    const { timeline } = useContext(TransitionContext);

    useEffect(() => {
        if (children !== displayChildren) {
            if (timeline.duration() === 0) {
                /* There are no outro animations, so immediately transition */
                setDisplayChildren(children);
            } else {
                timeline.play().then(() => {
                    /* Outro complete so reset to an empty paused timeline */
                    timeline.seek(0).pause().clear();
                    setDisplayChildren(children);
                });
            }
        }
    }, [children]);

    return (
        <div>{displayChildren}</div>
    );
}