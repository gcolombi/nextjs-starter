import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const AccordionContext = createContext({
    items: new Map(),
    setItem: () => {},
    deleteItem: () => {},
    toggle: () => {}
});

const updateItem = (id, expanded, timeline, latestItems, setItems) => {
    const itemsMap = new Map(latestItems.current);
    itemsMap.set(id, {expanded, timeline });
    setItems(itemsMap);
    latestItems.current = itemsMap;
};

export function AccordionContextProvider({ children, allowMultiple }) {
    const [items, setItems] = useState(new Map());
    const latestItems = useRef(items);

    const setItem = useCallback((id, expanded, timeline) => {
        updateItem(id, expanded, timeline, latestItems, setItems);
    }, [setItems]);

    const deleteItem = useCallback((id) => {
        const newItemsMap = new Map(latestItems.current);

        if (newItemsMap.delete(id)) {
            setItems(newItemsMap);
            latestItems.current = newItemsMap;
            return true;
        }
        return false;
    }, []);

    const toggle = (id, expanded, timeline) => {
        const itemObj = latestItems.current.get(id);

        if (!itemObj) {
            process.env.NODE_ENV !== 'production' &&
            console.error(`[AccordionItem] invalid key: ${key}`);
            return;
        }

        if (typeof expanded !== 'boolean') expanded = !itemObj.expanded;

        if (expanded) {
            console.log(id);
            console.log('enter');
            updateItem(id, expanded, timeline, latestItems, setItems);

            timeline.current.reversed(!timeline.current.reversed());

            !allowMultiple &&
            latestItems.current.forEach(({ expanded, timeline }, _id) => {
                if (_id !== id) {
                    // console.log(_id);
                    // console.log(_.expanded);
                    if (expanded) toggle(_id, false, timeline);
                }
            });

        } else {
            updateItem(id, expanded, timeline, latestItems, setItems);
            timeline.current.reversed(!timeline.current.reversed());

            // console.log(id);
            // console.log(id);
            console.log('exit');
        }
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

export function useAccordionItem({ id, timeline }) {
    const {
        items,
        setItem,
        deleteItem,
        toggle
    } = useAccordionContext();

    const currentItem = items.get(id);

    useEffect(() => {
        setItem(id, false, timeline);
        return () => deleteItem(id);
    }, [setItem, deleteItem, id]);

    return {
        expanded: currentItem ? currentItem.expanded : false,
        toggle: (expanded) => toggle(id, expanded, timeline)
    };
}