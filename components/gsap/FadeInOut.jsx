import AnimateInOut from './AnimateInOut';

export default function FadeInOut({
    children,
    delay,
    x,
    y,
    durationIn,
    durationOut
}) {
    return (
        <AnimateInOut
            durationIn={durationIn}
            // durationIn={durationIn || 1}
            durationOut={durationOut}
            // durationOut={durationOut || 0.25}
            delay={delay}
            from={{
                transform: `translate(${x}px, ${y}px)`,
                opacity: 0,
                duration: 0.25,
                ease: "power4.out",
            }}
            to={{
                opacity: 1,
                x: 0,
                y: 0,
                ease: "power4.inOut",
            }}
        >
            {children}
        </AnimateInOut>
    );
}