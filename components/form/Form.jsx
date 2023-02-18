import styles from '../../styles/modules/Form.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
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
        control,
        handleSubmit,
        reset,
        setError,
        formState: { isSubmitting, errors, isDirty }
    } = useForm();
    const [mounted, setMounted] = useState(false);
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

    /* After mounting, we have access to the theme */
    useEffect(() => {
        setMounted(true);
    }, [])

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
                            settings={{...register("firstname", {required: true})}}
                            errors={errors['firstname']}
                        />
                        <FormInput
                            htmlFor="lastname"
                            label="Lastname"
                            id="lastname"
                            name="lastname"
                            required={true}
                            className="c-formElement--bordered"
                            settings={{...register("lastname", {required: true})}}
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
                        settings={{...register("email", {required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})}}
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
                        rules={{
                            required: true,
                            validate: {
                                acceptedFormats: (files) => {
                                    const regex = new RegExp(/[^\s]+(.*?).(jpe?g|png|docx?|pdf)$/i);

                                    if (!files.length)
                                        return 'This field is required';

                                    return regex.test(files[0]?.name) || 'Unauthorized format, only jpeg, jpg, png, doc, docx and pdf are valid';
                                },
                                lessThan5MB: (files) => files[0]?.size < 4 * 1024 * 1024 || 'Max file size 5MB exceeded'
                            }
                        }}
                        control={control}
                    />
                    {/* <FormSelect
                        htmlFor="subject"
                        label="Subject"
                        id="subject"
                        name="subject"
                        required={true}
                        className="c-formElement--select--bordered"
                        settings={{...register("subject", {required: true})}}
                        errors={errors['subject']}
                    />
                    <FormCheckboxList
                        title="Quos fugiat assumenda dolore optio est, corporis sit similique ?"
                        name="choices"
                        register={register}
                        errors={errors['choices']}
                    />
                    <FormRadioList
                        title="Quos fugiat assumenda dolore optio est, corporis sit similique ?"
                        name="question"
                        register={register}
                        errors={errors['question']}
                    />
                    <FormTextarea
                        htmlFor="message"
                        label="Message"
                        id="message"
                        name="message"
                        required={true}
                        className="c-formElement--bordered"
                        settings={{...register("message", {required: true})}}
                        errors={errors['message']}
                    /> */}
                    <Button
                        label="Send"
                        className="c-btn"
                        wrapperClassName={classNames(styles['c-form__btn'], {'c-formElement--submit': isSubmitting})}
                        type="submit"
                        disabled={isSubmitting}
                    />
                </div>
            </form>
            {mounted &&
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