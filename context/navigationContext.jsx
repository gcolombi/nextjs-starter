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
    const { windowSize, isDesktop } = useWindowSize();
    const [locked, setLocked] = useLockedScroll(false);
    const router = useRouter();

    const toggle = () => {
        setIsOpen(!isOpen);
        setLocked(!locked);
    }

    /**
     * Closes navigation if viewport is larger than 1200px
     */
    useEffect(() => {
        if (isDesktop) {
            setIsOpen(false);
            setLocked(false);
        }
    }, [isDesktop])

    /**
     * Closes navigation on route change
     */
    useEffect(() => {
        if (isOpen) {
            setIsOpen(false);
            setLocked(false);
        }
    }, [router.asPath]);

    return (
        <NavigationContext.Provider
            value={{
                isOpen,
                sticky: scrollY > 0,
                hidden: directionY > 0 && scrollY > windowSize.height,
                setIsOpen,
                toggle
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export default function useNavigationContext() {
    return useContext(NavigationContext);
}