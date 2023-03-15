import AccordionItem from './AccordionItem';

export default function Accordion({
    items
}) {
    return (
        <>
            {items?.length > 0 &&
                <div className="c-accordions u-spacing--responsive--bottom">
                    <div className="o-container">
                        {items.map(({ header, content }, i) => (
                            <AccordionItem header={header} id={i} key={i}>
                                {content}
                            </AccordionItem>
                        ))}
                    </div>
                </div>
            }
        </>
    );
}