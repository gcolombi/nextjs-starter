import { gsap } from 'gsap';
import { TransitionContext } from '@/context/TransitionContext';
import { useState, useContext, useRef } from 'react';

export default function TransitionLayout({ children }) {
    const [displayChildren, setDisplayChildren] = useState(children);
    const { timeline } = useContext(TransitionContext);
    const element = useRef();

    return (
        <div ref={element}>{displayChildren}</div>
    );
}