import React, { useState, createContext, useContext } from 'react';
import gsap from 'gsap';

const TransitionContext = createContext({
    timeline: {},
    background: '',
    setTimeline: () => {},
    setBackground: () => {}
});

export function TransitionContextProvider({ children }) {
    const [timeline, setTimeline] = useState(() =>
        gsap.timeline({ paused: true })
    );
    const [background, setBackground] = useState('white');

    return (
        <TransitionContext.Provider
            value={{
                timeline,
                setTimeline,
                background,
                setBackground
            }}
        >
            {children}
        </TransitionContext.Provider>
    )
}

export default function useTransitionContext() {
    return useContext(TransitionContext);
}