import { AccordionContextProvider } from '@/context/accordionContext';
import styles from '@/styles/modules/Accordion.module.scss';

export default function Accordion({
    children,
}) {

    return (
        <AccordionContextProvider>
            <div className={styles['c-accordions']}>
                {children}
            </div>
        </AccordionContextProvider>
    );
}