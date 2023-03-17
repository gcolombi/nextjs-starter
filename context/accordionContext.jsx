import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const AccordionContext = createContext({
    items: [],
    registerAccordionItem: () => {},
    unregisterAccordionItem: () => {},
    toggle: () => {}
});

export function AccordionContextProvider({ children }) {
    const [items, setItems] = useState([]);
    const latestItems = useRef(items);

    const registerAccordionItem = useCallback((id, expanded = false, container, content) => {
        setItems((state) => [...state, { id, expanded, container, content }]);
    }, [setItems]);

    const unregisterAccordionItem = useCallback((id) => {
        setItems((state) => state.filter((ap) => ap.id !== id));
    }, [setItems]);

    const toggle = (id, force = false) => {
        const foundIndex = items.findIndex((ap) => ap.id === id);
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

export default function useAccordionContext({ id, container, content }) {
    const context = useContext(AccordionContext);

    if (!context)
        throw new Error(
            'AccordionItem must be used within an Accordion'
        );

    const {
        items,
        registerAccordionItem,
        unregisterAccordionItem,
        toggle
    } = context;
    // } = useContext(AccordionContext);

    const currentAccordionItem = items.find(
        (ap) => ap.id === id
    );

    useEffect(() => {
        console.log(container);
        console.log(content);

        registerAccordionItem(id, false, container, content);
        return () => {
            unregisterAccordionItem(id);
        };
    }, [id, registerAccordionItem, unregisterAccordionItem]);

    return {
        expanded: currentAccordionItem ? currentAccordionItem.expanded : false,
        toggle: (force = false) => toggle(id, force)
    };
    // return context;
}

// export default function useAccordionContext() {
//     const context = useContext(AccordionContext);
//     if (!context)
//         throw new Error(
//             'AccordionItem must be used within an Accordion'
//         );

//     return context;
// }