import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

export default function NavItem({ href, title, onClick }) {
    const router = useRouter();
    const isActive = router.asPath === href;

    return (
        <span>
            <Link
                href={href}
                className={classNames(
                    {'is-current-page': isActive}
                )}
                onClick={onClick}
            >
                {title}
            </Link>
        </span>
    );
}