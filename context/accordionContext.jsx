import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const AccordionContext = createContext({
    items: null,
    setItem: () => {},
    deleteItem: () => {},
    toggle: () => {}
});

const updateItem = (id, expanded, container, content, latestItems, setItems) => {
    const itemsMap = new Map(latestItems.current);

    itemsMap.set(id, {expanded, container, content});
    setItems(itemsMap);
    latestItems.current = itemsMap;
};

const updateItemHeight = (expanded, container, content) => {
    if (expanded) {
        gsap.to(container.current, {
            duration: 0.45,
            height: content.current.getBoundingClientRect().height,
            opacity: 1,
            ease: 'expo.inOut',
            onComplete: () => {
                gsap.set(container.current, {height: 'auto'})
                ScrollTrigger.refresh(true);
            }
        });
    } else {
        gsap.to(container.current, {
            duration: 0.45,
            height: 0,
            opacity: 0,
            ease: 'expo.inOut',
            onComplete: () => {
                ScrollTrigger.refresh(true);
            }
        });
    }
};

export function AccordionContextProvider({ children, allowMultiple }) {
    const [items, setItems] = useState(new Map());
    const latestItems = useRef(items);

    const setItem = useCallback((id, expanded, container, content) => {
        updateItem(id, expanded, container, content, latestItems, setItems);
        if (expanded) updateItemHeight(expanded, container, content);
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

    const toggle = (id, expanded, container, content) => {
        const itemObj = latestItems.current.get(id);

        if (!itemObj) {
            process.env.NODE_ENV !== 'production' &&
            console.error(`[AccordionItem] invalid key: ${key}`);
            return;
        }

        if (typeof expanded !== 'boolean') expanded = !itemObj.expanded;

        if (expanded) {
            updateItem(id, expanded, container, content, latestItems, setItems);
            updateItemHeight(expanded, container, content);
            !allowMultiple &&
            latestItems.current.forEach(({ expanded, container, content }, _id) => _id !== id && expanded && toggle(_id, false, container, content));
        } else {
            updateItem(id, expanded, container, content, latestItems, setItems);
            updateItemHeight(expanded, container, content);
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

export function useAccordionContext() {
    const context = useContext(AccordionContext);

    if (process.env.NODE_ENV !== 'production' && !context.items)
        throw new Error(
            'AccordionItem must be used within an Accordion'
        );

    return context;
}

export default function useAccordionItem({ id, initialExpanded, container, content }) {
    const {
        items,
        setItem,
        deleteItem,
        toggle
    } = useAccordionContext();
    const currentItem = items.get(id);
    const initialState = initialExpanded ? initialExpanded : false;

    useEffect(() => {
        setItem(id, initialState, container, content);
        return () => deleteItem(id);
    }, [setItem, deleteItem, id]);

    return {
        expanded: currentItem ? currentItem.expanded : false,
        toggle: (expanded) => toggle(id, expanded, container, content)
    };
}