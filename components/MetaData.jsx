import Head from 'next/head';
import useWindowLocation from '@/hooks/useWindowLocation';

export default function MetaData({ ...customMeta }) {
    const { currentURL } = useWindowLocation();
    const meta = {
        title: 'Next.js starter',
        description: 'A starter for Next.js that includes a collection of reusable components, hooks, and utilities to build amazing projects with complex animated page transitions using GSAP.',
        image: `${process.env.NEXT_PUBLIC_BASE_URL}/static/example.jpg`,
        type: 'website',
        ...customMeta
    };

    return (
        <Head>
            <meta charSet="utf-8" />
        	<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:url" content={currentURL} />
            <meta property="og:site_name" content={process.env.NEXT_PUBLIC_SITE_NAME} />
            <meta property="og:type" content={meta.type} />
            <meta property="og:image" content={meta.image} />
            {meta.date && (
                <meta property="article:published_time" content={meta.date} />
            )}
            <meta name="robots" content="follow, index" />
            <link rel="canonical" href={currentURL} />
        </Head>
    );
}
