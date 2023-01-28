import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

export default function NavItem({
     href,
     title,
     onClick,
     className
}) {
    const router = useRouter();
    const isActive = router.asPath === href;

    return (
        <span>
            <Link
                href={href}
                className={classNames({
                    [className]: isActive
                })}
                onClick={onClick}
            >
                {title}
            </Link>
        </span>
    );
}