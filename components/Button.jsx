import styles from '@/styles/modules/Button.module.scss';
import Link from 'next/link';

export default function Button({
    label,
    href,
    isExternal,
    externalHref,
    anchor,
    onClick,
    disabled,
    className,
    wrapperClassName
}) {

    if (label && href) {
        return (
            <div className={wrapperClassName}>
                <Link
                    className={styles[className]}
                    href={href}
                    onClick={onClick}
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

    if (label) {
        return (
            <div className={wrapperClassName}>
                <button
                    className={styles[className]}
                    onClick={onClick}
                    disabled={disabled}
                >
                    {disabled ? 'Sending...' : label}
                </button>
            </div>
        );
    }
}