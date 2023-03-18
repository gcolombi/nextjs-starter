import styles from '@/styles/modules/AccordionItem.module.scss';
import gsap from 'gsap';
import { useRef } from 'react';
import { useAccordionItem } from '@/context/accordionContext';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import classNames from 'classnames';

export default function AccordionItem({
    header,
    headingTag = 'h3',
    id,
    children
}) {
    const container = useRef();
    const content = useRef();
    const { expanded, toggle } = useAccordionItem({ id, container, content });
    const timeline = useRef();

    const toggleTransition = () => {
        timeline.current.reversed(!timeline.current.reversed());
    };

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            timeline.current = gsap
            .timeline()
            .to(container.current, {
                duration: 0.45,
                height: content.current.getBoundingClientRect().height,
                opacity: 1,
                ease: 'expo.inOut',
                onComplete: () => {
                    gsap.set(container.current, {height: 'auto'})

                    /* update ScrollTrigger */
                    // @todo
                }
            })
            .reverse();
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <div
            className={classNames(
                styles['c-accordions__item'],
                {
                    [styles['is-open']]: expanded
                }
            )}
        >
            <Heading
                header={header}
                headingTag={headingTag}
                id={id}
                toggle={toggle}
                toggleTransition={toggleTransition}
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
    toggleTransition
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
                    toggle();
                    toggleTransition();
                }}
            >
                {header}
            </button>
        </Heading>
    );
}