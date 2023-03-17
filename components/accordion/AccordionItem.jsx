import styles from '@/styles/modules/AccordionItem.module.scss';
import { useRef } from 'react';
import useAccordionContext from '@/context/accordionContext';
import classNames from 'classnames';
// import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

export default function AccordionItem({
    header,
    headingTag = 'h3',
    id,
    children
}) {
    const { expanded, toggle } = useAccordionContext({ id });
    const containerRef = useRef();

    return (
        <div
            className={classNames(
                styles['c-accordions__item'],
                {
                    [styles['is-open']]: expanded,
                }
            )}
        >
            <Heading
                header={header}
                headingTag={headingTag}
                id={id}
                toggle={toggle}
            />
            <div className={styles['c-accordions__item__container']} ref={containerRef}>
                <div className={styles['c-accordions__item__container--content']}>
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
    toggle
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
                onClick={() => toggle()}
            >
                {header}
            </button>
        </Heading>
    );
}