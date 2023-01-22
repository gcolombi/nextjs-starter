import styles from '@/styles/modules/Navigation.module.scss';
import Button from './Button';

export default function Navigation() {
    return (
        <header className={styles['c-navigation']}>
            <div className={styles['o-container']}>
                <nav className={styles['c-navigation__row']}>
                    <Button
                        label="Home"
                        link="/"
                        className="c-btn"
                        wrapperClassName={styles['c-navigation__btn']}
                    />
                    <ul className={`u-margin--none ${styles['c-navigation__list']}`}>
                        <li className={styles['c-navigation__list--item']}>
                        </li>
                        <li className={styles['c-navigation__list--item']}>
                        </li>
                        <li className={styles['c-navigation__list--item']}>
                        </li>
                        <li className={styles['c-navigation__list--item']}>
                        </li>
                        <li className={styles['c-navigation__list--item']}>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}