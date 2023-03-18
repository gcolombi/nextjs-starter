import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const AccordionContext = createContext({
    items: new Map(),
    setItem: () => {},
    deleteItem: () => {},
    toggle: () => {}
});

export function AccordionContextProvider({ children }) {
    // const [items, setItems] = useState([]);
    const [items, setItems] = useState(new Map());
    const latestItems = useRef(items);

    const setItem = useCallback((id, expanded, container, content) => {
        // setItems((state) => [...state, { id, expanded, container, content }]);
        const itemsMap = new Map(latestItems.current);
        itemsMap.set(id, {expanded, container, content });
        setItems(itemsMap);
        latestItems.current = itemsMap;
    }, [setItems]);

    const deleteItem = useCallback((id) => {
        // setItems((state) => state.filter((ap) => ap.id !== id));
        const newItemsMap = new Map(latestItems.current);

        if (newItemsMap.delete(id)) {
            setItems(newItemsMap);
            latestItems.current = newItemsMap;
            return true;
        }
        return false;
    }, []);

    const toggle = (id, expanded) => {
        console.log(id);
        console.log(expanded);

        const itemObj = latestItems.current.get(id);

        console.log(items);

        if (!itemObj) {
            process.env.NODE_ENV !== 'production' &&
            console.error(`[AccordionItem] invalid key: ${key}`);
            return;
        }

        if (typeof expanded !== 'boolean') expanded = !itemObj.expanded;

        if (expanded) {
            const itemsMap = new Map(latestItems.current);
            itemsMap.set(id, {expanded});
            setItems(itemsMap);
            latestItems.current = itemsMap;

            // itemObj.expanded = !itemObj.expanded;
            // console.log(itemObj);
            // console.log('enter');
        } else {
            const itemsMap = new Map(latestItems.current);
            itemsMap.set(id, {expanded});
            setItems(itemsMap);
            latestItems.current = itemsMap;

            // itemObj.expanded = !itemObj.expanded;
            // console.log(itemObj);
            // console.log('exit');
        }

        // const foundIndex = items.findIndex((ap) => ap.id === id);
        // const currentItem = items[foundIndex];
        // const flushedItems = items.map((ap) => ({
        //     ...ap,
        //     expanded: false
        // }));

        // setItems([
        //     ...flushedItems.slice(0, foundIndex),
        //     {
        //         ...currentItem,
        //         expanded: force ? force : !currentItem.expanded
        //     },
        //     ...flushedItems.slice(foundIndex + 1)
        // ]);
    };

    return (
        <AccordionContext.Provider
            value={{
                items,
                setItem,
                deleteItem,
                toggle
            }}
        >
            {children}
        </AccordionContext.Provider>
    );
};

export default function useAccordionContext() {
    const context = useContext(AccordionContext);

    if (!context)
        throw new Error(
            'AccordionItem must be used within an Accordion'
        );

    return context;
}

export function useAccordionItem({ id, container, content }) {
    const {
        items,
        setItem,
        deleteItem,
        toggle
    } = useAccordionContext();

    const currentItem = items.get(id);

    useEffect(() => {
        // console.log(container);
        // console.log(content);

        setItem(id, false, container, content);
        return () => deleteItem(id);
    }, [setItem, deleteItem, id]);

    return {
        expanded: currentItem ? currentItem.expanded : false,
        toggle: (expanded) => toggle(id, expanded)
    };
}