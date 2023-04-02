import MetaData from '@/components/MetaData';
import HeaderBasic from '@/components/HeaderBasic';
import Form from '@/components/form/Form';

export default function FormPage() {
    return(
        <>
            <MetaData
                title="Form"
            />
            <HeaderBasic
                title="Form"
                wysiwyg="Complete and flexible form, ready to use. Form fields and validation are handled using React Hook Form and Yup. The Form request is managed by api route, Yup and Google Recaptcha are used for server validation. The email is sent using custom html template and SendGrid."
            />
            <Form />
        </>
    );
}