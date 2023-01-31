import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <>
            <Navigation />
            <main>
                <div className="c-spacer"></div>
                {children}
                <Footer />
            </main>
        </>
    );
}