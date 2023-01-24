import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavItem({ href, title, onClick }) {
    const router = useRouter();
    const isActive = router.asPath === href;

    return (
        <span>
            <Link
                href={href}
                className={
                    isActive
                        ? 'is-current-page'
                        : ''
                }
                onClick={onClick}
            >
                {title}
            </Link>
        </span>
    );
}