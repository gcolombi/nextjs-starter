import styles from '@/styles/modules/AccordionItem.module.scss';
import gsap from 'gsap';
import { useRef } from 'react';
import useAccordionContext from '@/context/accordionContext';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

export default function AccordionItem({
    header,
    headingTag = 'h3',
    id,
    children
}) {
    const container = useRef();
    const content = useRef();
    const { expanded, toggle } = useAccordionContext({ id, container, content });

    // useIsomorphicLayoutEffect(() => {
    // }, []);

    const setAccordionTransition = () => {

        const ctx = gsap.context(() => {

            if (!expanded) {
                gsap.to(container.current, {
                    duration: 1,
                    height: content.current.getBoundingClientRect().height,
                    opacity: 1,
                    ease: 'expo.inOut',
                    onComplete: () => {
                        gsap.set(container.current, {height: 'auto'})

                        /* update ScrollTrigger */
                    }
                });
                return;
            }

            gsap.to(container.current, {
                duration: 1,
                height: 0,
                opacity: 0,
                ease: 'expo.inOut',
                onComplete: () => {
                    /* update ScrollTrigger */
                }
            });

        }, container);
        return () => ctx.revert();
    }

    return (
        <div
            className={styles['c-accordions__item']}
        >
            <Heading
                header={header}
                headingTag={headingTag}
                id={id}
                toggle={toggle}
                setAccordionTransition={setAccordionTransition}
            />
            <div className={styles['c-accordions__item__container']} ref={container}>
                <div className={styles['c-accordions__item__container--content']} ref={content}>
                    <div className="o-wysiwyg">
                        <p>{children}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Heading({
    header,
    headingTag,
    id,
    toggle,
    setAccordionTransition
}) {
    const validHeadingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const safeHeading = headingTag ? headingTag.toLowerCase() : '';
    const Heading = validHeadingTags.includes(safeHeading) ? safeHeading : 'h3';

    return(
        <Heading>
            <button
                type="button"
                id={id}
                aria-expanded=""
                onClick={() => {
                    toggle()
                    setAccordionTransition()
                }}
            >
                {header}
            </button>
        </Heading>
    );
}