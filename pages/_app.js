import { Roboto } from '@next/font/google';
import localFont from '@next/font/local';

/**
 * Fonts
 */
const roboto = Roboto({
    fallback: ['sans-serif'],
    weight: ['300', '400', '500', '700', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
});

const victorMono = localFont({
    fallback: ['sans-serif'],
    src: [
        {
            path: '../public/fonts/VictorMono-Regular.woff',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/VictorMono-Regular.woff2',
            weight: '400',
            style: 'normal'
        }
    ],
    display: 'swap'
});

/**
 * Global styles
 */
import '@/styles/style.scss';

export default function App({ Component, pageProps }) {
    return (
        <>
            <style jsx global>{`
                :root {
                    --font-primary: ${roboto.style.fontFamily};
                    --font-secondary: ${victorMono.style.fontFamily};
                }
            `}</style>
            <Component {...pageProps} />
        </>
    )
}