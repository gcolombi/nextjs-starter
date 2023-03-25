import MetaData from '@/components/MetaData';
import HeaderBasic from '@/components/HeaderBasic';
import UploadForm from '@/components/form/UploadForm';

export default function FileUploadForm() {
    return(
        <>
            <MetaData
                title="File upload form"
            />
            <HeaderBasic
                title="File upload form"
                wysiwyg="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dicta saepe maxime ut! Ratione, fugit, neque expedita ex consequatur reiciendis sint praesentium ad quos, veniam nemo esse architecto impedit cum!"
            />
            <UploadForm />
        </>
    );
}