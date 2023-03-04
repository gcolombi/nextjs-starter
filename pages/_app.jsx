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

import '@/styles/style.scss';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { TransitionContextProvider } from '@/context/transitionContext';
import { NavigationContextProvider } from '@/context/navigationContext';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        document.activeElement && document.activeElement.blur();
    }, [router]);

    return (
        <>
            <ThemeProvider disableTransitionOnChange>
                <GoogleReCaptchaProvider
                    reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    scriptProps={{
                        async: true,
                        defer: true,
                        appendTo: 'body'
                    }}
                >
                    <TransitionContextProvider>
                        <NavigationContextProvider>
                            <style jsx global>
                                {`
                                    :root {
                                        --font-primary: ${roboto.style.fontFamily};
                                        --font-secondary: ${victorMono.style.fontFamily};
                                    }
                                `}
                            </style>
                            <div style={{ overflow: 'hidden' }}>
                                <Layout>
                                    <Component {...pageProps} />
                                </Layout>
                            </div>
                        </NavigationContextProvider>
                    </TransitionContextProvider>
                </GoogleReCaptchaProvider>
            </ThemeProvider>
        </>
    )
}