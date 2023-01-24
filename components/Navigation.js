import styles from '@/styles/modules/Navigation.module.scss';
import { useState } from 'react';
import useScrollbar from '@/hooks/useScrollbar';
import useWindowSize from '@/hooks/useWindowSize';
import useElementSize from '@/hooks/useElementSize';
import useLockedScroll from '@/hooks/useLockedScroll';
import NavItem from './NavItem';
import Button from './Button';

/**
 * Navigation
 */
export default function Navigation() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { scrollY, directionY } = useScrollbar();
    const windowSize = useWindowSize();
    const [navigationRef, { height }] = useElementSize();
    const [locked, setLocked] = useLockedScroll(false);

    function toggle() {
        setIsNavOpen(!isNavOpen);
        setLocked(!locked);
    }

    return (
        <>
            <style jsx global>{`
                :root {
                    --navigation-height: ${height}px;
                }
            `}</style>
            <header
                className={`${styles['c-navigation']} ${scrollY > 0 ? styles['is-sticky'] : ''} ${directionY > 0 && scrollY > windowSize.height ? styles['is-hidden'] : ''} ${isNavOpen ? styles['is-open'] : ''}`}
                ref={navigationRef}
            >
                <div className={styles['c-navigation__container']}>
                    <nav className={styles['c-navigation__row']}>
                        <Button
                            label="Home"
                            href="/"
                            className="c-btn"
                            wrapperClassName={styles['c-navigation__logo']}
                        />
                        <div className={styles['c-navigation__hamburger']}>
                            <Hamburger open={isNavOpen} toggle={toggle} />
                        </div>
                        <nav className={styles['c-navigation__nav']}>
                            <div className={styles['c-navigation__nav__scroll']}>
                                <div className={styles['c-navigation__nav__container']}>
                                    <div className={styles['c-navigation__nav__primary']}>
                                        <Button
                                            label="Home"
                                            href="/"
                                            className="c-btn"
                                            wrapperClassName={styles['c-navigation__nav__primary--logo']}
                                        />
                                        <div className={styles['c-navigation__nav__primary--list']}>
                                            <ul>
                                                <li>
                                                    <NavItem href="/" title="Home" />
                                                </li>
                                                <li>
                                                    <NavItem href="/" title="Sollicitudin" />
                                                </li>
                                                <li>
                                                    <NavItem href="/" title="Tincidunt" />
                                                </li>
                                                <li>
                                                    <NavItem href="/blog" title="Blog" />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </nav>
                </div>
            </header>
        </>
    );
}

/**
 * Hamburger
 */
function Hamburger({
    open,
    toggle
}) {
    return (
        <button
            className={`${styles['m-hamburger']}
                ${open ? styles['is-nav-active'] : ''}
            `}
            type="button"
            aria-label="Toggle menu"
            onClick={toggle}
        >
            <div className={styles['m-hamburger__lines']}>
                <span></span>
            </div>
        </button>
    );
}