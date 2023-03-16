import styles from '@/styles/modules/Accordion.module.scss';
import AccordionItem from './AccordionItem';

export default function Accordion({
    items,
    headingTag = 'h3'
}) {
    return (
        <>
            {items?.length > 0 &&
                <div className={styles['c-accordions']}>
                    <div className="o-container">
                        {items.map(({ header, content }, i) => (
                            <AccordionItem headingTag={headingTag} header={header} id={i} key={i}>
                                {content}
                            </AccordionItem>
                        ))}
                    </div>
                </div>
            }
        </>
    );
}