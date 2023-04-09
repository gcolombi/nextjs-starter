import styles from '../../styles/modules/Form.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import useIsMounted from '@/hooks/useIsMounted';
import { useTheme } from 'next-themes';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { formSchema } from '@/schemas/form';
import { yupResolver } from '@hookform/resolvers/yup';
import useUnsavedChanges from '@/hooks/useUnsavedChanges';
import classNames from 'classnames';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormCheckboxList from './FormCheckboxList';
import FormRadioList from './FormRadioList';
import FormTextarea from './FormTextarea';
import FormRecaptchaNote from './FormRecaptchaNote';
import Button from '../Button';
import TranslateInOut from '../gsap/TranslateInOut';
import FadeInOut from '../gsap/FadeInOut';
import ScaleInOut from '../gsap/ScaleInOut';
import { toast, ToastContainer, Zoom } from 'react-toastify';

const labels = {
    firstname: 'Firstname',
    lastname: 'Lastname',
    email: 'Email',
    subject: 'Subject',
    choices: 'Choices',
    question: 'Question',
    message: 'Message'
}

async function sendFormData(data, recaptchaToken) {
    return await fetch('/api/form', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            data,
            labels,
            recaptchaToken
        })
    });
}

export default function Form() {
    const {
        register,
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
        resolver: yupResolver(formSchema)
    });
    const isMounted = useIsMounted();
    const { resolvedTheme } = useTheme();
    const { executeRecaptcha } = useGoogleReCaptcha();

    /* Prompt the user if they try and leave with unsaved changes */
    useUnsavedChanges(isDirty);

    const submitForm = async (data, recaptchaToken) => {
        const toastConfig = {
            isLoading: false,
            autoClose: 3000,
            closeButton: true,
            draggable: true
        }

        const toastId = toast.loading('Your message is on its way !');

        try {
            const response = await sendFormData(data, recaptchaToken);

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

    const handleSubmitForm = async (data) => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        await executeRecaptcha('submit')
        .then((recaptchaToken) => {
            submitForm(data, recaptchaToken);
        })
        .catch(error => console.error(`Form - Recaptcha Error : ${error}`));
    }

    return(
        <>
            <form className={classNames('u-spacing--responsive--bottom', styles['c-form'])} onSubmit={handleSubmit(handleSubmitForm)} noValidate>
                <div className="o-container--small">
                    <div className={styles['c-form__inner']}>
                        <div className={styles['c-form__row']}>
                            <TranslateInOut
                                delay={0.1}
                                y="100%"
                                start="-100% bottom"
                                end="top top"
                                watch
                            >
                                <FormInput
                                    htmlFor="firstname"
                                    label="Firstname"
                                    id="firstname"
                                    required={true}
                                    className="c-formElement--bordered"
                                    register={register('firstname')}
                                    errors={errors['firstname']}
                                />
                            </TranslateInOut>
                            <TranslateInOut
                                delay={0.15}
                                y="100%"
                                start="-100% bottom"
                                end="top top"
                                watch
                            >
                                <FormInput
                                    htmlFor="lastname"
                                    label="Lastname"
                                    id="lastname"
                                    required={true}
                                    className="c-formElement--bordered"
                                    register={register('lastname')}
                                    errors={errors['lastname']}
                                />
                            </TranslateInOut>
                            <TranslateInOut
                                delay={0.20}
                                y="100%"
                                start="-100% bottom"
                                end="top top"
                                watch
                            >
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
                            </TranslateInOut>
                            <TranslateInOut
                                delay={0.25}
                                y="100%"
                                start="-100% bottom"
                                end="top top"
                                watch
                            >
                                <FormSelect
                                    htmlFor="subject"
                                    label="Subject"
                                    id="subject"
                                    required={true}
                                    className="c-formElement--select--bordered"
                                    register={register('subject')}
                                    errors={errors['subject']}
                                />
                            </TranslateInOut>
                        </div>
                        <TranslateInOut
                            delay={0.30}
                            y="100%"
                            start="-100% bottom"
                            end="top top"
                            watch
                        >
                            <FormCheckboxList
                                title="Quos fugiat assumenda dolore optio est, corporis sit similique ?"
                                register={register('choices')}
                                errors={errors['choices']}
                            />
                        </TranslateInOut>
                        <TranslateInOut
                            delay={0.35}
                            y="100%"
                            start="-100% bottom"
                            end="top top"
                            watch
                        >
                            <FormRadioList
                                title="Quos fugiat assumenda dolore optio est, corporis sit similique ?"
                                register={register('question')}
                                errors={errors['question']}
                            />
                        </TranslateInOut>
                        <TranslateInOut
                            delay={0.40}
                            y="100%"
                            start="-100% bottom"
                            end="top top"
                            watch
                        >
                            <FormTextarea
                                htmlFor="message"
                                label="Message"
                                id="message"
                                required={true}
                                className="c-formElement--bordered"
                                register={register('message')}
                                errors={errors['message']}
                            />
                        </TranslateInOut>
                        <FadeInOut
                            delay={0.25}
                            watch
                        >
                            <FormRecaptchaNote />
                        </FadeInOut>
                        <div className={styles['c-form__btn']}>
                            <ScaleInOut
                                durationIn={1}
                                delay={0.25}
                                ease="elastic.out"
                                watch
                            >
                                <Button
                                    label="Send"
                                    className="c-btn"
                                    wrapperClassName={classNames({'c-formElement--submit': isSubmitting})}
                                    type="submit"
                                    disabled={isSubmitting}
                                />
                            </ScaleInOut>
                        </div>
                    </div>
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