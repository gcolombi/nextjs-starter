import gsap from 'gsap';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const AccordionContext = createContext({
    items: new Map(),
    setItem: () => {},
    deleteItem: () => {},
    toggle: () => {}
});

const updateItem = (id, expanded, container, content, latestItems, setItems) => {
    const itemsMap = new Map(latestItems.current);
    itemsMap.set(id, {expanded, container, content });
    setItems(itemsMap);
    latestItems.current = itemsMap;
};

export function AccordionContextProvider({ children, allowMultiple }) {
    const [items, setItems] = useState(new Map());
    const latestItems = useRef(items);

    const setItem = useCallback((id, expanded, container, content) => {
        updateItem(id, expanded, container, content, latestItems, setItems);
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
        // const { toggleTransition } = useHeightTransition({ container, content });

        const itemObj = latestItems.current.get(id);

        if (!itemObj) {
            process.env.NODE_ENV !== 'production' &&
            console.error(`[AccordionItem] invalid key: ${key}`);
            return;
        }

        if (typeof expanded !== 'boolean') expanded = !itemObj.expanded;

        if (expanded) {
            updateItem(id, expanded, container, content, latestItems, setItems);

            !allowMultiple &&
            latestItems.current.forEach((_, _id) => _id !== id && toggle(_id, false, container, content));

        } else {
            updateItem(id, expanded, container, content, latestItems, setItems);

            console.log(id);
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
        toggle: (expanded) => toggle(id, expanded, container, content)
    };
}

// function useHeightTransition({ container, content }) {
//     const timeline = useRef();

//     const toggleTransition = () => {
//         timeline.current.reversed(!timeline.current.reversed());
//     };

//     useIsomorphicLayoutEffect(() => {
//         const ctx = gsap.context(() => {
//             timeline.current = gsap
//             .timeline()
//             .to(container.current, {
//                 duration: 0.45,
//                 height: content.current.getBoundingClientRect().height,
//                 opacity: 1,
//                 ease: 'expo.inOut',
//                 onComplete: () => {
//                     gsap.set(container.current, {height: 'auto'})

//                     /* update ScrollTrigger */
//                     // @todo
//                 }
//             })
//             .reverse();
//         }, container);
//         return () => ctx.revert();
//     }, []);

//     return toggleTransition();
// }