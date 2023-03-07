import AnimateInOut from './AnimateInOut';
import { randomNumber } from '@/utils/number';

export default function RotateInOut3D({
    children,
    durationIn = 0.5,
    durationOut = 0.25,
    delay = 0,
    delayOut = 0,
    ease = 'power4.out',
    rotationX = randomNumber(-80, 80),
    rotationY = randomNumber(-40, 40),
    rotationZ = randomNumber(-10, 10),
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
            set={{
                opacity: 0,
                scale: 0.8,
                transformOrigin: '50% 50%',
                perspective: 10,
                rotationX: randomNumber(-80, 80),
                rotationY: randomNumber(-40, 40),
                rotationZ: randomNumber(-10, 10),
                // rotationX,
                // rotationY,
                // rotationZ,
                x,
                y
            }}
            from={{
                opacity: 0,
                rotationX: -35,
                rotationY: -21,
                rotationZ: -23,
                // rotationX: randomNumber(-80, 80),
                // rotationY: randomNumber(-40, 40),
                // rotationZ: randomNumber(-10, 10),
                // transform: `translate(${x}px, ${y}px) rotate3d(${randomNumber(-80, 80)}, ${randomNumber(-40, 40)}, ${randomNumber(-10, 10)}, 0)`
                // transform: `translate(${x}px, ${y}px) rotate3d(${rotationX}, ${rotationY}, ${rotationZ}, 0)`
            }}
            to={{
                ease,
                opacity: 1,
                scale: 1,
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                x: xTo,
                y: yTo
            }}


            skipOutro={skipOutro}
        >
            {children}
        </AnimateInOut>
    );
};