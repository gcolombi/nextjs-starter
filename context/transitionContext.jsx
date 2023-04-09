import React, { useState, createContext, useContext } from 'react';
import gsap from 'gsap';

const TransitionContext = createContext({
    timeline: {},
    setTimeline: () => {},
    resetTimeline: () => {}
});

export function TransitionContextProvider({ children }) {
    const [timeline, setTimeline] = useState(
        gsap.timeline({ paused: true })
    );

    const resetTimeline = () => {
        timeline.pause().clear();
    };

    return (
        <TransitionContext.Provider
            value={{
                timeline,
                setTimeline,
                resetTimeline
            }}
        >
            {children}
        </TransitionContext.Provider>
    );
}

export default function useTransitionContext() {
    return useContext(TransitionContext);
}