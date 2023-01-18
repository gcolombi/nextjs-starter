import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Container(props) {
    const { children, ...customMeta } = props;
    const router = useRouter();
    const meta = {
        title: 'Lorem ipsum dolor sit',
        description: `Nulla posuere sollicitudin aliquam ultrices sagittis orci a. Fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque.`,
        image: 'http://localhost:3000/static/example.jpg',
        type: 'website',
        ...customMeta
    };

    return (
        <main>
            <Head>
                <title>{meta.title}</title>
                <meta name="description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:description" content={meta.description} />
                <meta property="og:url" content={`http://localhost:3000${router.asPath}`} />
                <meta property="og:site_name" content="Lorem ipsum dolor sit" />
                <meta property="og:type" content={meta.type} />
                <meta property="og:image" content={meta.image} />
                {meta.date && (
                    <meta property="article:published_time" content={meta.date} />
                )}
                <meta name="robots" content="follow, index" />
                <link rel="canonical" href={`http://localhost:3000${router.asPath}`} />
            </Head>
            {children}
        </main>
    );
}
