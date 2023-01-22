import styles from '@/styles/modules/Navigation.module.scss';
import { useEffect, useRef, useState } from 'react';
import Button from './Button';

export default function Navigation() {
    const [navigationHeight, setNavigationHeight] = useState(0);
    const navRef = useRef(null);

    useEffect(() => {
        /**
         * Defines navigation height
         * @returns {boolean} true when the navigationHeight has been setted
         */
        function setNavHeight() {
            setNavigationHeight(navRef.current?.getBoundingClientRect().height);
            console.log('once');
            return true
        };

        /**
         * Reports changes of the navigation element and updates navigationHeight
         */
        new ResizeObserver(setNavHeight.bind(this)).observe(navRef.current);
    }, [])

    return (
        <>
            <style jsx global>{`
                :root {
                    --navigation-height: ${navigationHeight}px;
                }
            `}</style>
            <header className={styles['c-navigation']} ref={navRef}>
                <div className="o-container">
                    <nav className={styles['c-navigation__row']}>
                        <Button
                            label="Home"
                            link="/"
                            className="c-btn"
                            wrapperClassName={styles['c-navigation__btn']}
                        />
                        <ul className={`u-margin--none ${styles['c-navigation__list']}`}>
                            <li className={styles['c-navigation__list--item']}>
                                <a href="#">Link</a>
                            </li>
                            <li className={styles['c-navigation__list--item']}>
                                <a href="#">Link</a>
                            </li>
                            <li className={styles['c-navigation__list--item']}>
                                <a href="#">Link</a>
                            </li>
                            <li className={styles['c-navigation__list--item']}>
                                <a href="#">Link</a>
                            </li>
                            <li className={styles['c-navigation__list--item']}>
                                <a href="#">Link</a>
                            </li>
                            <li className={styles['c-navigation__list--item']}>
                                <a href="#">Link</a>
                            </li>
                            <li className={styles['c-navigation__list--item']}>
                                <a href="#">Link</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className={styles['c-spacer']}></div>
        </>
    );
}

/**
 * Reports changes of the navigation element and updates css root variable
 */
// createResizeObserver() {
//     new ResizeObserver(this.setCssRootVar.bind(this)).observe(this.nav.element);
// }

/**
 * Defines a CSS variable for navigation height
 * @returns {boolean} true when variable has been setted
 */
// setCssRootVar() {
//     window.Store.app.theHtml.style.setProperty(
//         this.settings.rootCssVar,
//         `${this.height}px`
//     );

//     return true;
// }