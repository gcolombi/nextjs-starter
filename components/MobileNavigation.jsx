import styles from '@/styles/modules/MobileNavigation.module.scss';
import NavItem from './NavItem';
import useDelayedRender from 'use-delayed-render';
import classNames from 'classnames';
import useNavigationContext from '@/context/navigationContext';

export default function MobileNavigation() {
    const { open, toggle } = useNavigationContext();
    const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
        open,
        {
          enterDelay: 200,
          exitDelay: 350
        }
    );

    return (
        <>
            <Hamburger open={open} toggle={toggle} />
            {isMenuMounted &&
                <nav
                   className={classNames(
                        styles['c-mobileNav'],
                        {[styles['is-open']]: isMenuRendered}
                   )}
                >
                    <div className={styles['c-mobileNav__scroll']}>
                        <div className={styles['c-mobileNav__container']}>
                            <div className={styles['c-mobileNav__primary']}>
                                <div className={styles['c-mobileNav__primary--list']}>
                                    <ul>
                                        <li>
                                            <NavItem href="/blog" title="Blog" className={styles['is-current-page']} />
                                        </li>
                                        <li>
                                            <NavItem href="/form" title="Form" className={styles['is-current-page']} />
                                        </li>
                                        <li>
                                            <NavItem href="/contact" title="Contact" className={styles['is-current-page']} />
                                        </li>
                                        <li>
                                            <NavItem href="/career" title="Career" className={styles['is-current-page']} />
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

function Hamburger({
    open,
    toggle
}) {
    return (
        <button
            className={classNames(
                styles['m-hamburger'],
                {[styles['is-nav-active']]: open}
            )}
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