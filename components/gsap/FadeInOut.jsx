import AnimateInOut from './AnimateInOut';

export default function FadeInOut({
    children,
    durationIn = 0.5,
    durationOut = 0.25,
    delay = 0,
    delayOut = 0,
    ease = 'power4.out',
    x = 0,
    y = 0,
    skipOutro
}) {
    return (
        <AnimateInOut
            durationIn={durationIn}
            durationOut={durationOut}
            delay={delay}
            delayOut={delayOut}
            from={{
                opacity: 0,
                transform: `translate(${x}px, ${y}px)`
            }}
            to={{
                ease,
                opacity: 1,
                x: 0,
                y: 0
            }}
            skipOutro={skipOutro}
        >
            {children}
        </AnimateInOut>
    );
}