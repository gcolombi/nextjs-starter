import { createContext, useContext } from 'react';

const AccordionContext = createContext({
})

export function AccordionContextProvider({ children }) {
    return (
        <AccordionContext.Provider
            value={{

            }}
        >
            {children}
        </AccordionContext.Provider>
    );
};

export default function useAccordionContext() {
    return useContext(AccordionContext);
}