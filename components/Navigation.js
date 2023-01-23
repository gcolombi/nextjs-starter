import styles from '@/styles/modules/Navigation.module.scss';
import useScrollbar from '@/hooks/useScrollbar';
import useWindowSize from '@/hooks/useWindowSize';
import useElementSize from '@/hooks/useElementSize';
import NavItem from './NavItem';
import Button from './Button';

export default function Navigation() {
    const { scrollY, directionY } = useScrollbar();
    const windowSize = useWindowSize();
    const [navigationRef, { height }] = useElementSize();

    return (
        <>
            <style jsx global>{`
                :root {
                    --navigation-height: ${height}px;
                }
            `}</style>
            <header
                className={`${styles['c-navigation']}
                    ${scrollY > 0
                        ? styles['is-sticky']
                        : ''
                    }
                    ${directionY > 0 && scrollY > windowSize.height
                        ? styles['is-hidden']
                        : ''
                }`}
                ref={navigationRef}
            >
                <div className="o-container">
                    <nav className={styles['c-navigation__row']}>
                        <Button
                            label="Home"
                            href="/"
                            className="c-btn"
                            wrapperClassName={styles['c-navigation__btn']}
                        />
                        <ul className={`u-margin--none ${styles['c-navigation__list']}`}>
                            <li className={styles['c-navigation__list--item']}>
                                <NavItem href="/" title="Home" />
                            </li>
                            <li className={styles['c-navigation__list--item']}>
                                <NavItem href="/" title="Sollicitudin" />
                            </li>
                            <li className={styles['c-navigation__list--item']}>
                                <NavItem href="/" title="Tincidunt" />
                            </li>
                            <li className={styles['c-navigation__list--item']}>
                                <NavItem href="/blog" title="Blog" />
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}