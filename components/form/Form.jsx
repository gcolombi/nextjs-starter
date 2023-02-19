import styles from '../../styles/modules/Form.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { useTheme } from 'next-themes';
import useIsMounted from '@/hooks/useIsMounted';



import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';




import useUnsavedChanges from '@/hooks/useUnsavedChanges';
import classNames from 'classnames';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import Button from '../Button';
import { toast, ToastContainer, Zoom } from 'react-toastify';

import FormSelect from './FormSelect';
import FormCheckboxList from './FormCheckboxList';
import FormRadioList from './FormRadioList';
import FormFileInput from './FormFileInput';

function getFormSchema() {
    /* override the email method */
    yup.addMethod(yup.string, 'email', function validateEmail(message){
        return this.matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, {
            message,
            name: 'email',
        });
    });

    return yup.object().shape({
        firstname: yup.string().required('This field is required'),
        lastname: yup.string().required('This field is required'),
        email: yup.string().required('This field is required').email('Invalid email address'),
        resume: yup.mixed().test('required', 'This field is required', (files) => files?.length)
        .test('fileType', 'Unauthorized format, only jpeg, jpg, png, doc, docx and pdf are valid', (files) => new RegExp(/[^\s]+(.*?).(jpe?g|png|docx?|pdf)$/i).test(files[0]?.name))
        .test('fileSize', 'Max file size 4MB exceeded', (files) => files[0]?.size <= 4 * 1024 * 1024 ),
        subject: yup.string().required('This field is required'),
        choices: yup.array().of(yup.string()).min(1, 'Please select one of these choices'),
        question: yup.string().required('Please select one of these answers'),
        message: yup.string().required('This field is required'),
    });
}

async function sendFormData(data, setError) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value instanceof FileList) {
            formData.set(key, value[0]);
        } else {
            formData.set(key, value);
        }
    });

    const response = await fetch('/api/form', {
        method: 'POST',
        body: formData
    });

    const _data = await response.json();

    if (!response.ok) {
        /* API returns validation errors, this type of error will not persist with each submission */
        setError('root.serverError', {
            type: response.status,
        });
        throw new Error(_data.message || 'Something went wrong');
    }

    return _data;
}

export default function Form() {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { isSubmitting, isSubmitSuccessful, errors, isDirty }
    } = useForm({
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            resume: [],
            subject: '',
            choices: [],
            question: '',
            message: ''
        },
        resolver: yupResolver(getFormSchema())
    });
    const isMounted = useIsMounted();
    const { resolvedTheme } = useTheme();

    /* Prompt the user if they try and leave with unsaved changes */
    useUnsavedChanges(isDirty);

    const onSubmit = async (data) => {

        const toastConfig = {
            isLoading: false,
            autoClose: 3000,
            closeButton: true,
            draggable: true
        }
        const toastId = toast.loading('Your message is on its way !');

        try {
            const response = await sendFormData(data, setError);

            toast.update(toastId, {
                render: response.message,
                type: 'success',
                ...toastConfig
            });

            /* Resets form after success */
            reset();

        } catch (error) {
            toast.update(toastId, {
                render: error.message,
                type: 'error',
                ...toastConfig
            });
        }
    };

    return(
        <>
            <form className={classNames('u-spacing--responsive--bottom', styles['c-form'])} onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="o-container">
                    <div className={styles['c-form__row']}>
                        <FormInput
                            htmlFor="firstname"
                            label="Firstname"
                            id="firstname"
                            name="firstname"
                            required={true}
                            className="c-formElement--bordered"
                            settings={register('firstname')}
                            errors={errors['firstname']}
                        />
                        <FormInput
                            htmlFor="lastname"
                            label="Lastname"
                            id="lastname"
                            name="lastname"
                            required={true}
                            className="c-formElement--bordered"
                            settings={register('lastname')}
                            errors={errors['lastname']}
                        />
                    </div>
                    <FormInput
                        htmlFor="email"
                        label="Email"
                        type="email"
                        id="email"
                        name="email"
                        required={true}
                        className="c-formElement--bordered"
                        settings={register('email')}
                        errors={errors['email']}
                    />
                    <FormFileInput
                        htmlFor="resume"
                        label="Resume"
                        type="file"
                        id="resume"
                        name="resume"
                        required={true}
                        className="c-formElement--upload--bordered"
                        register={register('resume')}
                        errors={errors['resume']}
                        isSubmitSuccessful={isSubmitSuccessful}
                    />
                    <FormSelect
                        htmlFor="subject"
                        label="Subject"
                        id="subject"
                        name="subject"
                        required={true}
                        className="c-formElement--select--bordered"
                        settings={register('subject')}
                        errors={errors['subject']}
                    />
                    <FormCheckboxList
                        title="Quos fugiat assumenda dolore optio est, corporis sit similique ?"
                        name="choices"
                        register={register('choices')}
                        errors={errors['choices']}
                    />
                    <FormRadioList
                        title="Quos fugiat assumenda dolore optio est, corporis sit similique ?"
                        name="question"
                        register={register('question')}
                        errors={errors['question']}
                    />
                    <FormTextarea
                        htmlFor="message"
                        label="Message"
                        id="message"
                        name="message"
                        required={true}
                        className="c-formElement--bordered"
                        settings={register('message')}
                        errors={errors['message']}
                    />
                    <Button
                        label="Send"
                        className="c-btn"
                        wrapperClassName={classNames(styles['c-form__btn'], {'c-formElement--submit': isSubmitting})}
                        type="submit"
                        disabled={isSubmitting}
                    />
                </div>
            </form>
            {isMounted() &&
                <ToastContainer
                    position={toast.POSITION.BOTTOM_CENTER}
                    transition={Zoom}
                    theme={resolvedTheme}
                    className="c-toastify"
                />
            }
        </>
    );
}