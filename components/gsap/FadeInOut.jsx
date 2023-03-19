import classNames from 'classnames';
import AnimateInOut from './AnimateInOut';

export default function FadeInOut({
    children,
    overflowHidden,
    durationIn = 0.5,
    durationOut = 0.25,
    delay = 0,
    delayOut = 0,
    ease = 'power4.out',
    skipOutro,
    watch,
    start = 'top 90%',
    end = 'bottom top',
    scrub = false,
    markers
}) {
    return (
        <div
            className={classNames({
                'u-overflow--hidden': overflowHidden
            })}
        >
            <AnimateInOut
                durationIn={durationIn}
                durationOut={durationOut}
                delay={delay}
                delayOut={delayOut}
                from={{
                    opacity: 0
                }}
                to={{
                    ease,
                    opacity: 1
                }}
                skipOutro={skipOutro}
                watch={watch}
                start={start}
                end={end}
                scrub={scrub}
                markers={markers}
            >
                {children}
            </AnimateInOut>
        </div>
    );
}