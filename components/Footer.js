import styles from '@/styles/modules/Footer.module.scss';
import NavItem from './NavItem';
import classNames from 'classnames';

export default function Footer() {
    return (
        <footer className={classNames('u-blockColor--white', styles['c-footer'])}>
            <div className="o-container">
                <div className={styles['c-footer__row']}>
                    <div className={styles['c-footer__list']}>
                        <ul className="unstyled">
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
                    <div className={classNames('o-wysiwyg' , styles['c-footer__copyright'])}>
                        <p>&copy; {new Date().getFullYear()} Faucibus. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}