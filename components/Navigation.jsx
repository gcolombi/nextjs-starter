import styles from '@/styles/modules/Navigation.module.scss';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import useNavigationContext from '@/context/navigationContext';
import useElementSize from '@/hooks/useElementSize';
import useIsMounted from '@/hooks/useIsMounted';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import Logo from './icons/Logo';
import MobileNavigation from './MobileNavigation';
import NavItem from './NavItem';
import RotateInOut from './gsap/RotateInOut';
import classNames from 'classnames';

export default function Navigation() {
    const { isOpen, sticky, hidden } = useNavigationContext();
    const [navigationRef, { height }] = useElementSize();
    const isMounted = useIsMounted();
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <>
            <style jsx global>{`
                :root {
                    --navigation-height: ${height}px;
                }
            `}</style>
            <header
                className={classNames(
                    styles['c-navigation'],
                    {
                        [styles['is-sticky']]: sticky,
                        [styles['is-hidden']]: hidden,
                        [styles['is-open']]: isOpen
                    }
                )}
                ref={navigationRef}
            >
                <div className="o-container">
                    <div className={styles['c-navigation__row']}>
                        <div className={styles['c-navigation__logo']}>
                            <Link href="/">
                                <Logo />
                            </Link>
                        </div>
                        <MobileNavigation />
                        <nav className={styles['c-navigation__nav']}>
                            <div className={styles['c-navigation__nav__primary']}>
                                <div className={styles['c-navigation__nav__primary--list']}>
                                    <ul>
                                        <li>
                                            {/* <RotateInOut
                                                overflowHidden
                                                delay={0.7}
                                                ease="power.out"
                                                rotate={7}
                                                y="15px"
                                                skipOutro
                                            > */}
                                                <NavItem
                                                    href="/blog"
                                                    title="Blog"
                                                    className={styles['is-current-page']}
                                                    overflowHidden
                                                    delay={0.7}
                                                    ease="power.out"
                                                    y="15px"
                                                    rotate={7}
                                                />
                                            {/* </RotateInOut> */}
                                        </li>
                                        <li>
                                            {/* <RotateInOut
                                                overflowHidden
                                                delay={0.9}
                                                ease="power.out"
                                                rotate={7}
                                                y="15px"
                                                skipOutro
                                            > */}
                                                <NavItem
                                                    href="/form"
                                                    title="Form"
                                                    className={styles['is-current-page']}
                                                    overflowHidden
                                                    delay={0.9}
                                                    ease="power.out"
                                                    y="15px"
                                                    rotate={7}
                                                />
                                            {/* </RotateInOut> */}
                                        </li>
                                        <li>
                                            {/* <RotateInOut
                                                overflowHidden
                                                delay={1.1}
                                                ease="power.out"
                                                rotate={7}
                                                y="15px"
                                                skipOutro
                                            > */}
                                                <NavItem
                                                    href="/contact"
                                                    title="Contact"
                                                    className={styles['is-current-page']}
                                                    overflowHidden
                                                    delay={1.1}
                                                    ease="power.out"
                                                    y="15px"
                                                    rotate={7}
                                                />
                                            {/* </RotateInOut> */}
                                        </li>
                                        <li>
                                            {/* <RotateInOut
                                                overflowHidden
                                                delay={1.3}
                                                ease="power.out"
                                                rotate={7}
                                                y="15px"
                                                skipOutro
                                            > */}
                                                <NavItem
                                                    href="/career"
                                                    title="Career"
                                                    className={styles['is-current-page']}
                                                    overflowHidden
                                                    delay={1.3}
                                                    ease="power.out"
                                                    y="15px"
                                                    rotate={7}
                                                />
                                            {/* </RotateInOut> */}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <div className={styles['c-navigation__switch']}>
                            {isMounted() &&
                                <DarkModeSwitch
                                    checked={resolvedTheme === 'dark' ? true : false}
                                    onChange={() =>
                                        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
                                    }
                                    size={35}
                                />
                            }
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}