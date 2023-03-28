import styles from '@/styles/modules/AccordionItem.module.scss';
import { useId, useRef } from 'react';
import useAccordionItem from '@/context/accordionContext';
import { slugify } from '@/utils/string';
import classNames from 'classnames';
import Chevron from '../icons/Chevron';

export default function AccordionItem({
    children,
    header,
    headingTag = 'h3',
    headingClassName='',
    id,
    initialExpanded
}) {
    const container = useRef();
    const content = useRef();
    const { expanded, toggle } = useAccordionItem({ id, initialExpanded, container, content });
    const buttonId = `${slugify(header)}-${useId()}`;
    const panelId = `${slugify(header)}-${useId()}`;

    return (
        <li
            className={styles['c-accordions__item']}
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