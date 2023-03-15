export default function AccordionItem({
    header,
    id,
    children
}) {
    return (
        <div className="c-accordions__item">
            <Heading
                header={header}
                id={id}
            />
            <div className="c-accordions__inner">
                <div>
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
    headingTag = 'h3',
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