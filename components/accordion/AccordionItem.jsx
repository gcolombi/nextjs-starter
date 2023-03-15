export default function AccordionItem({
    header,
    id,
    children
}) {
    return (
        <div class="c-accordions__item">
            <Heading
                header={header}
                id={id}
            />
            <div class="c-accordions__inner">
                <div>
                    <div class="o-wysiwyg">
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
    const Heading = validHeadingTags.includes(safeHeading) || 'h3';

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