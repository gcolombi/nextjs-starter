import AccordionItem from './AccordionItem';

const items = [
    {
        header: 'What is Lorem Ipsum?',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing...'
    },
    {
        header: 'Where does it come from?',
        content: 'Quisque eget luctus mi, vehicula mollis lorem...'
    },
    {
        header: 'Why do we use it?',
        content: 'Suspendisse massa risus, pretium id interdum in...'
    }
];
export default function Accordion({
    items
}) {
    return (
        <div className="c-accordions">
            {items.map(({ header, content }, i) => (
                <AccordionItem header={header} id={i}>
                    {content}
                </AccordionItem>
            ))}
        </div>
    );
}