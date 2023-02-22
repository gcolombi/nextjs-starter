import styles from '../../styles/modules/Form.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { useTheme } from 'next-themes';
import useIsMounted from '@/hooks/useIsMounted';
import { object, string, mixed, array, addMethod } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useUnsavedChanges from '@/hooks/useUnsavedChanges';
import classNames from 'classnames';
import FormInput from './FormInput';
import FormFileInput from './FormFileInput';
import FormTextarea from './FormTextarea';
import Button from '../Button';
import { toast, ToastContainer, Zoom } from 'react-toastify';

export const labels = {
    firstname: 'Firstname',
    lastname: 'Lastname',
    email: 'Email',
    message: 'Message'
}

function getFormSchema() {
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
        resume: mixed().test('required', 'This field is required', (files) => files?.length)
        .test('fileType', 'Unauthorized format, only jpeg, jpg, png, doc, docx and pdf are valid', (files) => new RegExp(/[^\s]+(.*?).(jpe?g|png|docx?|pdf)$/i).test(files[0]?.name))
        .test('fileSize', 'Max file size 4MB exceeded', (files) => files[0]?.size <= 4 * 1024 * 1024 ),
        message: string().required('This field is required'),
    });
}

async function sendFormData() {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value instanceof FileList) {
            formData.set(key, value[0] || []);
        } else {
            formData.set(key, value);
        }
    });

    const response = await fetch('/api/careerform', {
        method: 'POST',
        body: formData
    });

    return await response.json();
}

export default function CareerForm() {
    const {
        register,
        control,
        handleSubmit,
        reset,
        setError,
        formState: { isSubmitting, errors, isDirty }
    } = useForm({
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            resume: [],
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
            const response = await sendFormData(data);

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

    return (
        <>
            <form className={classNames('u-spacing--responsive--bottom', styles['c-form'])} onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="o-container">
                    <div className={styles['c-form__row']}>
                        <FormInput
                            htmlFor="firstname"
                            label="Firstname"
                            id="firstname"
                            required={true}
                            className="c-formElement--bordered"
                            register={register('firstname')}
                            errors={errors['firstname']}
                        />
                        <FormInput
                            htmlFor="lastname"
                            label="Lastname"
                            id="lastname"
                            required={true}
                            className="c-formElement--bordered"
                            register={register('lastname')}
                            errors={errors['lastname']}
                        />
                        <FormInput
                            htmlFor="email"
                            label="Email"
                            type="email"
                            id="email"
                            required={true}
                            className="c-formElement--bordered"
                            register={register('email')}
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
                            control={control}
                            errors={errors['resume']}
                        />
                    </div>
                    <FormTextarea
                        htmlFor="message"
                        label="Message"
                        id="message"
                        required={true}
                        className="c-formElement--bordered"
                        register={register('message')}
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