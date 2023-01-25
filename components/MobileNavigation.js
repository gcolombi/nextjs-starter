import styles from '@/styles/modules/MobileNavigation.module.scss';
import { useState } from 'react';
import useLockedScroll from '@/hooks/useLockedScroll';
import NavItem from './NavItem';
import useDelayedRender from 'use-delayed-render';

export default function MobileNavigation({
    onClick
}) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
        isNavOpen,
        {
          enterDelay: 200,
          exitDelay: 350
        }
    );
    const [locked, setLocked] = useLockedScroll(false);

    function toggle() {
        setIsNavOpen(!isNavOpen);
        setLocked(!locked);
        onClick(!isNavOpen);
    }
    return (
        <>
            <Hamburger open={isNavOpen} toggle={toggle} />
            {isMenuMounted &&
                <nav
                    className={`${
                        styles['c-mobileNav']
                        } ${
                        isMenuRendered
                            ? styles['is-open']
                            : ''
                        }`}
                >
                    <div className={styles['c-mobileNav__scroll']}>
                        <div className={styles['c-mobileNav__container']}>
                            <div className={styles['c-mobileNav__primary']}>
                                <div className={styles['c-mobileNav__primary--list']}>
                                    <ul>
                                        <li>
                                            <NavItem href="/" title="Home" onClick={toggle} />
                                        </li>
                                        <li>
                                            <NavItem href="/" title="Sollicitudin" onClick={toggle} />
                                        </li>
                                        <li>
                                            <NavItem href="/" title="Tincidunt" onClick={toggle} />
                                        </li>
                                        <li>
                                            <NavItem href="/blog" title="Blog" onClick={toggle} />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            }
        </>
    )
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
            className={`${styles['m-hamburger']} ${open ? styles['is-nav-active'] : ''}`}
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