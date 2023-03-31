import gsap from 'gsap';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import Link from 'next/link';
import classNames from 'classnames';

export default function NavItem({
    href,
    title,
    onClick,
    className,
    overflowHidden,
    durationIn = 0.35,
    delay = 0.5,
    ease = 'sine.out',
    rotate = 0,
    scale = 1,
    x = 0,
    y = 0
}) {
    const router = useRouter();
    const isActive = router.asPath === href;
    const element = useRef()

    const from = {
        opacity: 0,
        transform: `translate(${x}, ${y}) rotate(${rotate}deg) scale(${scale})`
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