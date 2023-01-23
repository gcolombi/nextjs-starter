import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavItem({ href, text }) {
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
            <span className="capsize">{text}</span>
        </Link>
    );
}