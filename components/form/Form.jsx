import styles from '../../styles/modules/Form.module.scss';
import { useForm } from 'react-hook-form';
import useUnsavedChanges from '@/hooks/useUnsavedChanges';
import classNames from 'classnames';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import Button from '../Button';

import FormSelect from './FormSelect';
import FormCheckboxList from './FormCheckboxList';
import FormRadioList from './FormRadioList';
import FormFileInput from './FormFileInput';

async function sendFormData(data, setError) {
    const formData = new FormData();

    for (const key in data) {
        if (data[key] instanceof FileList) {
            formData.set(key, data[key][0]);
        } else {
            formData.set(key, data[key]);
        }
    }

    const response = await fetch("/api/form", {
        method: "POST",
        body: formData
    });

    const _data = await response.json();

    console.log(response);
    console.log(_data);

    if (!response.ok) {
        /* API returns validation errors, this type of error will not persist with each submission */
        setError('root.serverError', {
            type: response.status,
        });
        throw new Error(_data.message || 'Something went wrong');
    }
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

    /* Prompt the user if they try and leave with unsaved changes */
    useUnsavedChanges(isDirty);

    const onSubmit = async (data) => {

        try {
            const response = await sendFormData(data, setError);

            console.log(response);

            // @todo success toast notification

            /* Resets form after success */
            reset();
        } catch (error) {
            console.log(error);

            // @todo error toast notification
        }


        // if (response.status === 400) {
        //     // Validation error
        //     // Expect response to be a JSON response with the structure:
        //     // {"fieldName": "error message for that field"}
        //     const fieldToErrorMessage = await response.json();
        //     for (const [fieldName, errorMessage] of Object.entries(fieldToErrorMessage)) {
        //         setError(fieldName, {type: 'custom', message: errorMessage});
        //     }
        // } else if (response.ok) {
        //     // successful

        //     /* reset the form values */
        //     reset();
        // } else {
        //     // unknown error
        // }
    };

    return(
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
                            lessThan5MB: (files) => files[0]?.size < 5 * 1024 * 1024 || 'Max file size 5MB exceeded'
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
    );
}