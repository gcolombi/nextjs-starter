import styles from '../styles/modules/Button.module.scss';
import Link from 'next/link';

export default function Button({
    label,
    link,
    isExternal,
    externalLink,
    anchor,
    onClick,
    cssClass
}) {

    if (label && link) {
        return (
            <Link
                className={styles[cssClass]}
                href={link}
            >
                {label}
            </Link>
        );
    }

    if (label && isExternal && externalLink) {
        return (
            <a
                className={styles[cssClass]}
                target='_blank'
                rel='noopener noreferrer'
                href={externalLink}
            >
                {label}
            </a>
        );
    }

    if (label && anchor) {
        return (
            <a
                className={styles[cssClass]}
                href={`#${anchor}`}
            >
                {label}
            </a>
        );
    }

    if (label && onClick) {
        return (
            <button
                className={styles[cssClass]}
                onClick={onClick}
            >
                {label}
            </button>
        );
    }
}