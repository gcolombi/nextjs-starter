import React, { useState, createContext, useContext } from 'react';
import gsap from 'gsap';

const TransitionContext = createContext({
    timeline: {},
    background: '',
    setTimeline: () => {},
    setBackground: () => {}
});

export function TransitionContextProvider({ children }) {
    const [timeline, setTimeline] = useState(
        gsap.timeline({ paused: true })
    );
    const [background, setBackground] = useState('white');

    const resetTimeline = () => {
        timeline.pause().clear();
    }

    return (
        <TransitionContext.Provider
            value={{
                timeline,
                setTimeline,
                resetTimeline,
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