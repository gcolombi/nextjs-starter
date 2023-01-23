import styles from '@/styles/modules/Footer.module.scss';
import Link from 'next/link';
import NavItem from './NavItem';

export default function Footer() {
    return (
        <footer className={styles['c-footer']}>
            <div className="o-container">
                <div className={styles['c-footer__row']}>
                    <div className={styles['c-footer__list']}>
                        <ul className="unstyled">
                            <li>
                                <NavItem href="/" title="Home" />
                            </li>
                            <li>
                                <NavItem href="/" title="Sollicitudin" />
                            </li>
                            <li>
                                <NavItem href="/" title="Tincidunt" />
                            </li>
                            <li>
                                <NavItem href="/blog" title="Blog" />
                            </li>
                        </ul>
                    </div>
                    <div className={`o-wysiwyg ${styles['c-footer__copyright']}`}>
                        <p>&copy; {new Date().getFullYear()} Faucibus. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}