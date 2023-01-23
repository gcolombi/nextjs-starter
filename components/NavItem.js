import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavItem({ href, title }) {
    const router = useRouter();
    const isActive = router.asPath === href;

    return (
        <Link
            href={href}
            className={
                isActive
                    ? 'is-current-page'
                    : ''
            }
        >
            {title}
        </Link>
    );
}