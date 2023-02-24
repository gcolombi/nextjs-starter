import styles from '../../styles/modules/Form.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useTheme } from 'next-themes';
import useIsMounted from '@/hooks/useIsMounted';
import { careerSchema } from '@/schemas/career';
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

async function sendFormData(data) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value instanceof FileList) {
            formData.set(key, value[0]);
        } else {
            formData.set(key, value);
        }
    });

    return await fetch('/api/careerform', {
        method: 'POST',
        body: formData
    });
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
            resume: '',
            message: ''
        },
        // resolver: yupResolver(careerSchema)
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

            const _data = await response.json();

            if (!response.ok) {
                /* API returns validation errors, this type of error will not persist with each submission */
                setError('root.serverError', {
                    type: response.status,
                });
                if (_data.errors) {
                    /* Validation error, expect response to be a JSON response {"field": "error message for that field"} */
                    for (const [fieldName, errorMessage] of Object.entries(_data.errors)) {
                        setError(fieldName, {type: 'custom', message: errorMessage});
                    }
                }
                throw new Error(_data.message || 'Form has errors');
            }

            toast.update(toastId, {
                render: _data.message,
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
                            required={true}
                            className="c-formElement--upload--bordered"
                            controller={useController({ control, name: 'resume' })}
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