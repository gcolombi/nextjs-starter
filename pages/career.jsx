import MetaData from '@/components/MetaData';
import HeaderBasic from '@/components/HeaderBasic';
import CareerForm from '@/components/form/CareerForm';

export default function Career() {
    return(
        <>
            <MetaData
                title="Career"
                description="Lorem ipsum dolor sit career."
            />
            <HeaderBasic
                title="Career"
                wysiwyg="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dicta saepe maxime ut! Ratione, fugit, neque expedita ex consequatur reiciendis sint praesentium ad quos, veniam nemo esse architecto impedit cum!"
            />
            <CareerForm />
        </>
    );
}