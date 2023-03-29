import styles from '@/styles/modules/AccordionItem.module.scss';
import gsap from 'gsap';
import { useId, useRef } from 'react';
import useAccordionItem from '@/context/accordionContext';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import useTransitionContext from '@/context/transitionContext';
import { slugify } from '@/utils/string';
import Chevron from '../icons/Chevron';
import classNames from 'classnames';

export default function AccordionItem({
    children,
    header,
    headingTag = 'h3',
    headingClassName='',
    id,
    initialExpanded,
    durationIn = 0.5,
    durationOut = 0.25,
    delay = 0,
    delayOut = 0,
    ease = 'sine.out',
    skipOutro,
    watch,
    start = 'top bottom',
    end = 'bottom top',
    scrub = false,
    markers
}) {
    const element = useRef();
    const container = useRef();
    const content = useRef();
    const { expanded, toggle } = useAccordionItem({ id, initialExpanded, container, content });
    const buttonId = `${slugify(header)}-${useId()}`;
    const panelId = `${slugify(header)}-${useId()}`;
    const { timeline } = useTransitionContext();
    const from = {
        opacity: 0,
        transform: `translate(0, 100%)`
    };

    useIsomorphicLayoutEffect(() => {
        const scrollTrigger = watch ? {
            scrollTrigger: {
                trigger: element.current,
                start,
                end,
                scrub,
                markers: markers
            }
        } : {};

        const ctx = gsap.context(() => {

            /* Intro animation */
            gsap.to(element.current, {
                ease,
                opacity: 1,
                x: 0,
                y: 0,
                delay,
                duration: durationIn,
                ...scrollTrigger
            });

            /* Outro animation */
            if (!skipOutro) {
                timeline.add(
                    gsap.to(element.current, {
                        ...from,
                        delay: delayOut,
                        duration: durationOut
                    }),
                    0
                );
            }
        }, element);
        return () => ctx.revert();
    }, []);

    return (
        <li
            ref={element}
            className={styles['c-accordions__item']}
            style={{...from}}
        >
            <Heading
                header={header}
                headingTag={headingTag}
                headingClassName={headingClassName}
                id={id}
                buttonId={buttonId}
                panelId={panelId}
                expanded={expanded}
                toggle={toggle}
            />
            <div
                className={styles['c-accordions__item__container']}
                id={panelId}
                aria-labelledby={buttonId}
                ref={container}
            >
                <div className={styles['c-accordions__item__container--content']} ref={content}>
                    {children}
                </div>
            </div>
        </li>
    );
}

function Heading({
    header,
    headingTag,
    headingClassName,
    buttonId,
    panelId,
    expanded,
    toggle
}) {
    const validHeadingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const safeHeading = headingTag ? headingTag.toLowerCase() : '';
    const Heading = validHeadingTags.includes(safeHeading) ? safeHeading : 'h3';

    return(
        <Heading className={headingClassName}>
            <button
                type="button"
                id={buttonId}
                aria-controls={panelId}
                aria-expanded={expanded}
                onClick={() => toggle()}
                className={classNames(
                    styles['c-accordions__item__button'],
                    {
                        [styles['is-expanded']]: expanded
                    }
                )}
            >
                {header}
                <Chevron />
            </button>
        </Heading>
    );
}