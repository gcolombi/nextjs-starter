import styles from '@/styles/modules/Footer.module.scss';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles['c-footer']}>
            <div className="o-container">
                <div className={styles['c-footer__row']}>
                    <div className={styles['c-footer__list']}>
                        <ul className="unstyled">
                            <li><Link href="/">Sollicitudin</Link></li>
                            <li><Link href="/">Tincidunt</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
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