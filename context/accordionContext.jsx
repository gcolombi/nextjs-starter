import { createContext, useCallback, useContext, useState } from 'react';

const AccordionContext = createContext();

export function AccordionContextProvider({ children }) {
    const [items, setItems] = useState([]);

    const registerAccordionItem = useCallback((index, expanded = false) => {
          setItems((state) => [...state, { index, expanded }]);
    }, [setItems]);

    const unregisterAccordionItem = useCallback((index) => {
          setItems((state) => state.filter((ap) => ap.index !== index));
    }, [setItems]);

    const toggle = (index, force = false) => {
        const foundIndex = items.findIndex((ap) => ap.index === index);
        const currentItem = items[foundIndex];
        const flushedItems = items.map((ap) => ({
            ...ap,
            expanded: false
        }));
        setItems([
            ...flushedItems.slice(0, foundIndex),
            {
                ...currentItem,
                expanded: force ? force : !currentItem.expanded
            },
            ...flushedItems.slice(foundIndex + 1)
        ]);
    };

    return (
        <AccordionContext.Provider
            value={{
                items,
                registerAccordionItem,
                unregisterAccordionItem,
                toggle
            }}
        >
            {children}
        </AccordionContext.Provider>
    );
};

export default function useAccordionContext() {

}

// export default function useAccordionContext() {
//     const context = useContext(AccordionContext);
//     if (!context)
//         throw new Error(
//             'AccordionItem must be used within an Accordion'
//         );

//     return context;
// }