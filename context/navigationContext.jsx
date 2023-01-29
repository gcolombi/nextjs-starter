import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useScrollbar from '@/hooks/useScrollbar';
import useWindowSize from '@/hooks/useWindowSize';
import useLockedScroll from '@/hooks/useLockedScroll';


const NavigationContext = createContext({
    items: null,
    open: false,
    sticky: false,
    hidden: false,
    setOpen: () => {},
    toggle: () => {}
})

export function NavigationContextProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const { scrollY, directionY } = useScrollbar();
    const { windowSize } = useWindowSize();
    const [locked, setLocked] = useLockedScroll(false);
    const router = useRouter();

    const toggleNavigation = () => {
        setIsOpen(!isOpen);
        setLocked(!locked);
    }

    /**
     * Closes navigation if viewport is larger than 1200px
     */
    useEffect(() => {
        const close = () => {
            if (window.innerWidth >= 1200) {
                setIsOpen(false);
                setLocked(false);
            }
        }

        /* Add event listener */
        window.addEventListener('resize', close);

        /* Remove event listener on cleanup */
        return () => window.removeEventListener('resize', close);
    }, []);

    /**
     * Closes navigation on route change
     */
    useEffect(() => {
        if (isOpen) {
            setIsOpen(false);
            setLocked(false);
        }
    }, [router.asPath])


    return (
        <NavigationContext.Provider
            value={{
                open: isOpen,
                sticky: scrollY > 0,
                hidden: directionY > 0 && scrollY > windowSize.height,
                setOpen: setIsOpen,
                toggle: toggleNavigation
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};


export default function useNavigationContext() {
    return useContext(NavigationContext);
}