import AnimateInOut from './AnimateInOut';

export default function ScaleInOut({
    children,
    durationIn = .5,
    durationOut = 0.25,
    delay = 0,
    delayOut = 0,
    ease = 'power4.out',
    scale = 0.01,
    scaleTo = 1,
    x = 0,
    y = 0,
    xTo = 0,
    yTo = 0,
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
                transform: `translate(${x}px, ${y}px) scale(${scale})`
            }}
            to={{
                ease,
                opacity: 1,
                scale: scaleTo,
                x: xTo,
                y: yTo
            }}
            skipOutro={skipOutro}
        >
            {children}
        </AnimateInOut>
    );
};