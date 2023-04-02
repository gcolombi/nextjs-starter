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
                wysiwyg="Complete and flexible form, ready to use. Form fields and validation are handled using React Hook Form and Yup. The Form request is managed by an api route using formidable (Node.js module for parsing form data), Yup and Google Recaptcha are used for server validation. The email is sent using custom html template and SendGrid."
            />
            <UploadForm />
        </>
    );
}