import AnimateInOut from './AnimateInOut';

export default function FadeInOut({
    children,
    durationIn = .5,
    durationOut = 0.35,
    delay = 0,
    delayOut = 0,
    x = 0,
    y = 0,
    ease = 'power4.out',
    skipOutro
}) {
    return (
        <AnimateInOut
            durationIn={durationIn}
            durationOut={durationOut}
            delay={delay}
            delayOut={delayOut}
            from={{
                transform: `translate(${x}px, ${y}px)`,
                opacity: 0
            }}
            to={{
                opacity: 1,
                x: 0,
                y: 0
            }}
            ease={ease}
            skipOutro={skipOutro}
        >
            {children}
        </AnimateInOut>
    );
}