import TransitionLayout from './TransitionLayout';
import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <>
            <TransitionLayout>
                <Navigation />
                <main>
                    <div className="c-spacer" />
                    {children}
                    <Footer />
                </main>
            </TransitionLayout>
        </>
    );
}