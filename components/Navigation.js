import styles from '@/styles/modules/Navigation.module.scss';
import { useEffect, useRef, useState } from 'react';
import useScrollbar from '@/hooks/useScrollbar';
import Button from './Button';

export default function Navigation() {
    const [navigationHeight, setNavigationHeight] = useState(0);
    const navRef = useRef(null);
    const { scrollY, directionY } = useScrollbar();

    // console.log(directionY);

    useEffect(() => {
        /**
         * Defines navigation height
         * @returns {boolean} true when the navigationHeight has been setted
         */
        function setNavHeight() {
            setNavigationHeight(navRef.current?.getBoundingClientRect().height);
            return true
        };

        /**
         * Reports changes of the navigation element and updates navigationHeight
         */
        new ResizeObserver(setNavHeight).observe(navRef.current);
    }, [])

    return (
        <>
            <style jsx global>{`
                :root {
                    --navigation-height: ${navigationHeight}px;
                }
            `}</style>
            <header
                className={`${styles['c-navigation']}
                    ${scrollY > 0
                        ? styles['is-sticky']
                        : ''
                    }
                    ${directionY > 0
                        ? styles['is-hidden']
                        : ''
                }`}
                ref={navRef}
            >
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