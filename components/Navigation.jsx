import styles from '@/styles/modules/Navigation.module.scss';
import useNavigationContext from '@/context/navigationContext';
import useElementSize from '@/hooks/useElementSize';
import MobileNavigation from './MobileNavigation';
import NavItem from './NavItem';
import Button from './Button';
import classNames from 'classnames';

export default function Navigation() {
    const { open, sticky, hidden } = useNavigationContext();
    const [navigationRef, { height }] = useElementSize();

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
                        [styles['is-open']]: open
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
                                            <NavItem href="#" title="Sollicitudin" className={styles['is-current-page']} />
                                        </li>
                                        <li>
                                            <NavItem href="#" title="Tincidunt" className={styles['is-current-page']} />
                                        </li>
                                        <li>
                                            <NavItem href="/blog" title="Blog" className={styles['is-current-page']} />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}