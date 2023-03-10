import styles from '@/styles/modules/Navigation.module.scss';
import { useTheme } from 'next-themes';
import useNavigationContext from '@/context/navigationContext';
import useElementSize from '@/hooks/useElementSize';
import useIsMounted from '@/hooks/useIsMounted';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import MobileNavigation from './MobileNavigation';
import NavItem from './NavItem';
import Button from './Button';
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
                        <Button
                            label="Home"
                            href="/"
                            className="c-btn"
                            wrapperClassName={styles['c-navigation__logo']}
                        />
                        <MobileNavigation />
                        <nav className={styles['c-navigation__nav']}>
                            <div className={styles['c-navigation__nav__primary']}>
                                <div className={styles['c-navigation__nav__primary--list']}>
                                    <ul>
                                        <li>
                                            <NavItem
                                                href="/blog"
                                                title="Blog"
                                                className={styles['is-current-page']}
                                                overflowHidden
                                                delay={.7}
                                                ease="power.out"
                                                y={15}
                                                rotate={7}
                                            />
                                        </li>
                                        <li>
                                            <NavItem
                                                href="/form"
                                                title="Form"
                                                className={styles['is-current-page']}
                                                overflowHidden
                                                delay={.9}
                                                ease="power.out"
                                                y={15}
                                                rotate={7}
                                            />
                                        </li>
                                        <li>
                                            <NavItem
                                                href="/contact"
                                                title="Contact"
                                                className={styles['is-current-page']}
                                                overflowHidden
                                                delay={1.1}
                                                ease="power.out"
                                                y={15}
                                                rotate={7}
                                            />
                                        </li>
                                        <li>
                                            <NavItem
                                                href="/career"
                                                title="Career"
                                                className={styles['is-current-page']}
                                                overflowHidden
                                                delay={1.3}
                                                ease="power.out"
                                                y={15}
                                                rotate={7}
                                            />
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