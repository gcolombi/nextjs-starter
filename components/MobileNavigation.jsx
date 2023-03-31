import styles from '@/styles/modules/MobileNavigation.module.scss';
import NavItem from './NavItem';
import classNames from 'classnames';
import useNavigationContext from '@/context/navigationContext';

export default function MobileNavigation() {
    const { isOpen, toggle } = useNavigationContext();

    return (
        <>
            <Hamburger
                isOpen={isOpen}
                toggle={toggle}
            />
            {isOpen &&
                <nav
                   className={classNames(
                        styles['c-mobileNav'],
                        {[styles['is-open']]: isOpen}
                   )}
                >
                    <div className={styles['c-mobileNav__scroll']}>
                        <div className={styles['c-mobileNav__container']}>
                            <div className={styles['c-mobileNav__primary']}>
                                <div className={styles['c-mobileNav__primary--list']}>
                                    <ul>
                                        <li>
                                            <NavItem
                                                href="/accordion"
                                                title="Accordion"
                                                className={styles['is-current-page']}
                                                overflowHidden
                                                delay={0.2}
                                                ease="slow"
                                                y="100%"
                                                rotate={7}
                                            />
                                        </li>
                                        <li>
                                            <NavItem
                                                href="/form"
                                                title="Form"
                                                className={styles['is-current-page']}
                                                overflowHidden
                                                delay={0.4}
                                                ease="slow"
                                                y="100%"
                                                rotate={7}
                                            />
                                        </li>
                                        <li>
                                            <NavItem
                                                href="/upload"
                                                title="File upload form"
                                                className={styles['is-current-page']}
                                                overflowHidden
                                                delay={0.6}
                                                ease="slow"
                                                y="100%"
                                                rotate={7}
                                            />
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
    isOpen,
    toggle
}) {
    return (
        <button
            className={classNames(
                styles['m-hamburger'],
                {[styles['is-nav-active']]: isOpen}
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