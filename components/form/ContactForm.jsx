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
import FormSelect from './FormSelect';
import FormCheckboxList from './FormCheckboxList';
import FormRadioList from './FormRadioList';
import FormTextarea from './FormTextarea';
import Button from '../Button';
import { toast, ToastContainer, Zoom } from 'react-toastify';

export const labels = {
    firstname: 'Firstname',
    lastname: 'Lastname',
    email: 'Email',
    subject: 'Subject',
    choices: 'Choices',
    question: 'Question',
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
        subject: string().required('This field is required'),
        choices: array().of(string()).min(1, 'Please select one of these choices'),
        question: string().required('Please select one of these answers'),
        message: string().required('This field is required'),
    });
}

async function sendFormData(data) {
    console.log(data);
    return await fetch('/api/contactform', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    });
}

export default function Form() {
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
            subject: '',
            choices: [],
            question: '',
            message: ''
        },
        // resolver: yupResolver(getFormSchema())
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

    return(
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
                    </div>
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
                    <FormSelect
                        htmlFor="subject"
                        label="Subject"
                        id="subject"
                        required={true}
                        className="c-formElement--select--bordered"
                        register={register('subject')}
                        errors={errors['subject']}
                    />
                    <FormCheckboxList
                        title="Quos fugiat assumenda dolore optio est, corporis sit similique ?"
                        register={register('choices')}
                        errors={errors['choices']}
                    />
                    <FormRadioList
                        title="Quos fugiat assumenda dolore optio est, corporis sit similique ?"
                        register={register('question')}
                        errors={errors['question']}
                    />
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