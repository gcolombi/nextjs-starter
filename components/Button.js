import styles from '../styles/modules/Button.module.scss';
import Link from 'next/link';

export default function Button({
    label,
    link,
    isExternal,
    externalLink,
    anchor,
    onClick,
    className,
    wrapperClassName
}) {

    if (label && link) {
        return (
            <>
                <div className={wrapperClassName}>
                    <Link
                        className={styles[className]}
                        href={link}
                    >
                        {label}
                    </Link>
                </div>
            </>
        );
    }

    if (label && (isExternal && externalLink || anchor)) {
        return (
            <>
                <div className={wrapperClassName}>
                    <a
                        className={styles[className]}
                        target={isExternal ? '_blank' : false}
                        rel={isExternal ? 'noopener noreferrer' : false}
                        href={externalLink ? externalLink : `#${anchor}`}
                    >
                        {label}
                    </a>
                </div>
            </>
        );
    }

    if (label && onClick) {
        return (
            <>
                <div className={wrapperClassName}>
                    <button
                        className={styles[className]}
                        onClick={onClick}
                    >
                        {label}
                    </button>
                </div>
            </>
        );
    }
}