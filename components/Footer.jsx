import styles from '@/styles/modules/Footer.module.scss';
import gsap from 'gsap';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import NavItem from './NavItem';
import classNames from 'classnames';

export default function Footer() {
    const router = useRouter();
    const element = useRef();
    const from = {
        opacity: 0,
        transform: `translate(0, 100%)`
    }

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {

            /* Intro animation */
            gsap.to(element.current, {
                opacity: 1,
                y: 0,
                delay: 0.5,
                duration: 0.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: element.current,
                    start: '-100% bottom',
                    end: 'top top'
                }
            });
        }, element);
        return () => ctx.revert();
    }, [router.asPath]);

    return (
        <footer className={styles['c-footer']} ref={element} style={{...from}}>
            <div className="o-container">
                <div className={styles['c-footer__row']}>
                    <div className={styles['c-footer__list']}>
                        <ul className="unstyled">
                            <li>
                                <NavItem
                                    href="/accordion"
                                    title="Accordion"
                                    className={styles['is-current-page']}
                                />
                            </li>
                            <li>
                                <NavItem
                                    href="/form"
                                    title="Form"
                                    className={styles['is-current-page']}
                                />
                            </li>
                            <li>
                                <NavItem
                                    href="/upload"
                                    title="File upload form"
                                    className={styles['is-current-page']}
                                />
                            </li>
                        </ul>
                    </div>
                    <div className={classNames('o-wysiwyg' , styles['c-footer__copyright'])}>
                        <p>&copy; {new Date().getFullYear()} Next.js starter. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}