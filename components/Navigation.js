import styles from '@/styles/modules/Navigation.module.scss';
import { useState } from 'react';
import useScrollbar from '@/hooks/useScrollbar';
import useWindowSize from '@/hooks/useWindowSize';
import useElementSize from '@/hooks/useElementSize';
// import useLockedScroll from '@/hooks/useLockedScroll';
// import NavItem from './NavItem';
import MobileNavigation from './MobileNavigation';
import Button from './Button';
// import useDelayedRender from 'use-delayed-render';

/**
 * Navigation
 */
export default function Navigation() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    // const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    //     isNavOpen,
    //     {
    //       enterDelay: 200,
    //       exitDelay: 1000
    //     }
    // );
    const { scrollY, directionY } = useScrollbar();
    const windowSize = useWindowSize();
    const [navigationRef, { height }] = useElementSize();
    // const [locked, setLocked] = useLockedScroll(false);

    // function toggle() {
    //     setIsNavOpen(!isNavOpen);
    //     setLocked(!locked);
    // }

    function callBack(state) {
        setIsNavOpen(state)
    }

    return (
        <>
            <style jsx global>{`
                :root {
                    --navigation-height: ${height}px;
                }
            `}</style>
            <header
                className={`${
                    scrollY > 0
                        ? styles['is-sticky']
                        : ''
                    } ${
                    directionY > 0 && scrollY > windowSize.height
                        ? styles['is-hidden']
                        : ''
                    } ${
                    isNavOpen
                        ? styles['is-open']
                        : ''
                    } ${styles['c-navigation']} `}
                ref={navigationRef}
            >
                <div className={styles['c-navigation__container']}>
                    <div className={styles['c-navigation__row']}>
                        <Button
                            label="Home"
                            href="/"
                            className="c-btn"
                            wrapperClassName={styles['c-navigation__logo']}
                        />
                        {/* <div className={styles['c-navigation__hamburger']}>
                            <Hamburger open={isNavOpen} toggle={toggle} />
                        </div> */}

                        <MobileNavigation onClick={callBack} />


                        {/* <nav className={styles['c-navigation__nav']}>
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
                        </nav> */}
                    </div>
                </div>
            </header>
        </>
    );
}

/**
 * Mobile navigation
 */

// function MobileNavigation({
//     open,
//     toggle
// }) {
//     return (
//         <nav className={styles['c-navigation__nav']}>
//             <div className={styles['c-navigation__nav__scroll']}>
//                 <div className={styles['c-navigation__nav__container']}>
//                     <div className={styles['c-navigation__nav__primary']}>
//                         <Button
//                             label="Home"
//                             href="/"
//                             className="c-btn"
//                             wrapperClassName={styles['c-navigation__nav__primary--logo']}
//                         />
//                         <div className={styles['c-navigation__nav__primary--list']}>
//                             <ul>
//                                 <li>
//                                     <NavItem href="/" title="Home" onClick={toggle} />
//                                 </li>
//                                 <li>
//                                     <NavItem href="/" title="Sollicitudin" onClick={toggle} />
//                                 </li>
//                                 <li>
//                                     <NavItem href="/" title="Tincidunt" onClick={toggle} />
//                                 </li>
//                                 <li>
//                                     <NavItem href="/blog" title="Blog" onClick={toggle} />
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     )
// }