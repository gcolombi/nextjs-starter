import { createContext, useContext, useEffect, useState } from 'react';
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

    const toggleNavigation = () => {
        setIsOpen(!isOpen);
        setLocked(!locked);
    }

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