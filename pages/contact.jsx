import MetaData from '@/components/MetaData';
import HeaderBasic from '@/components/HeaderBasic';
import ContactForm from '@/components/form/ContactForm';

export default function Contact() {
    return(
        <>
            <MetaData
                title="Contact"
            />
            <HeaderBasic
                title="Contact"
                wysiwyg="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dicta saepe maxime ut! Ratione, fugit, neque expedita ex consequatur reiciendis sint praesentium ad quos, veniam nemo esse architecto impedit cum!"
            />
            <ContactForm />
        </>
    );
}