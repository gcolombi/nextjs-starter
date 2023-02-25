import { object, string, mixed, addMethod } from 'yup';

const getFormSchema = () => {
    /* override the email method */
    addMethod(string, 'email', function validateEmail(message){
        return this.matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, {
            message,
            name: 'email',
        });
    });

    return object({
        firstname: string().required('This field is required'),
        lastname: string().required('This field is required'),
        email: string().required('This field is required').email('Invalid email address'),
        resume: mixed().test('required', 'This field is required', (files) => files)
        .test('fileType', 'Unauthorized format, only jpeg, jpg, png, doc, docx and pdf are valid', (files) => new RegExp(/[^\s]+(.*?).(jpe?g|png|docx?|pdf)$/i).test(files[0]?.name || files.originalFilename))
        .test('fileSize', 'Max file size 4MB exceeded', (files) => (files[0]?.size || files.size) <= 4 * 1024 * 1024 ),
        coverletter: mixed().test('required', 'This field is required', (files) => files)
        .test('fileType', 'Unauthorized format, only doc, docx and pdf are valid', (files) => new RegExp(/[^\s]+(.*?).(docx?|pdf)$/i).test(files[0]?.name || files.originalFilename))
        .test('fileSize', 'Max file size 4MB exceeded', (files) => (files[0]?.size || files.size) <= 4 * 1024 * 1024 ),
        message: string().required('This field is required'),
    });
}

export const careerSchema = getFormSchema();