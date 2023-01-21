import styles from '../styles/modules/Button.module.scss';
import Link from 'next/link';

export default function Button({
    label,
    link,
    isExternal,
    externalLink,
    anchor,
    onClick,
    className
}) {

    if (label && link) {
        return (
            <Link
                className={styles[className]}
                href={link}
            >
                {label}
            </Link>
        );
    }

    if (label && isExternal && externalLink) {
        return (
            <a
                className={styles[className]}
                target="_blank"
                rel="noopener noreferrer"
                href={externalLink}
            >
                {label}
            </a>
        );
    }

    if (label && anchor) {
        return (
            <a
                className={styles[className]}
                href={`#${anchor}`}
            >
                {label}
            </a>
        );
    }

    if (label && onClick) {
        return (
            <button
                className={styles[className]}
                onClick={onClick}
            >
                {label}
            </button>
        );
    }
}