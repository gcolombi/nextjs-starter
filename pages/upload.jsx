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
                wysiwyg="Complete and flexible form with Google ReCaptcha V3, ready to use. Form fields are handled by React Hook Form and validated by Yup on the client/server side. The form request is managed by an API route with formidable (Node.js module for parsing form data). SendGrid and a custom HTML template are used to send the email."
            />
            <UploadForm />
        </>
    );
}