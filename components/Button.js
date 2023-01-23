import styles from '@/styles/modules/Button.module.scss';
import Link from 'next/link';

export default function Button({
    label,
    href,
    isExternal,
    externalHref,
    anchor,
    onClick,
    className,
    wrapperClassName
}) {

    if (label && href) {
        return (
            <div className={wrapperClassName}>
                <Link
                    className={styles[className]}
                    href={href}
                >
                    {label}
                </Link>
            </div>
        );
    }

    if (label && (isExternal && externalHref || anchor)) {
        return (
            <div className={wrapperClassName}>
                <a
                    className={styles[className]}
                    target={isExternal ? '_blank' : false}
                    rel={isExternal ? 'noopener noreferrer' : false}
                    href={externalHref ? externalHref : `#${anchor}`}
                >
                    {label}
                </a>
            </div>
        );
    }

    if (label && onClick) {
        return (
            <div className={wrapperClassName}>
                <button
                    className={styles[className]}
                    onClick={onClick}
                >
                    {label}
                </button>
            </div>
        );
    }
}