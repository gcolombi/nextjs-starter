import { createContext, useContext, useEffect, useState } from 'react';


const NavigationContext = createContext({
    items: null,
    isOpen: false,
    setIsOpen: () => {}
})

export function NavigationContextProvider({ children }) {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <NavigationContext.Provider
            value={{
                isOpen: isNavOpen,
                setIsOpen: setIsNavOpen
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};


export function useNavigationContext() {
    return useContext(NavigationContext);
}