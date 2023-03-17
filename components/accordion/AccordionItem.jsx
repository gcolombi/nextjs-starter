import styles from '@/styles/modules/AccordionItem.module.scss';

export default function AccordionItem({
    header,
    headingTag = 'h3',
    id,
    children,
}) {
    return (
        <div className={styles['c-accordions__item']}>
            <Heading
                header={header}
                headingTag={headingTag}
                id={id}
            />
            <div className={styles['c-accordions__container']}>
                <div className={styles['c-accordions__content']}>
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
    id
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
                onClick={() => console.log('clicked')}
            >
                {header}
            </button>
        </Heading>
    );
}