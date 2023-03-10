import gsap from 'gsap';
import Link from 'next/link';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import useTransitionContext from '@/context/transitionContext';

export default function NavItem({
    href,
    title,
    onClick,
    className,
    overflowHidden,
    durationIn = 0.35,
    durationOut = 0.25,
    delay = 0.5,
    delayOut = 0,
    ease = 'sine.out',
    rotate = 0,
    scale = 1,
    x = 0,
    y = 0,
    skipOutro
}) {
    const router = useRouter();
    const isActive = router.asPath === href;
    const { timeline } = useTransitionContext();
    const element = useRef()

    const from = {
        opacity: 0,
        transform: `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`
    }

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {

            /* Intro animation */
            gsap.to(element.current, {
                x: 0,
                y: 0,
                rotate: 0,
                opacity: 1,
                ease,
                delay,
                duration: durationIn
            });

            /* Outro animation */
            // if (!skipOutro) {
            //     timeline.add(
            //         gsap.to(element.current,{
            //             ...from,
            //             delay: delayOut,
            //             duration: durationOut
            //         }),
            //         0
            //     );
            // }
        }, element);
        return () => ctx.revert();
    }, []);

    return (
        <div
            className={classNames({
                'u-overflow--hidden': overflowHidden
            })}
        >
            <span ref={element} style={{ ...from }}>
                <Link
                    href={href}
                    className={classNames({
                        [className]: isActive
                    })}
                    onClick={onClick}
                >
                    {title}
                </Link>
            </span>
        </div>
    );
}