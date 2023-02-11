import styles from '../../styles/modules/Form.module.scss';
import { useController, useForm } from 'react-hook-form';
import useUnsavedChanges from '@/hooks/useUnsavedChanges';
import classNames from 'classnames';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import Button from '../Button';

import FormSelect from './FormSelect';
import FormCheckboxList from './FormCheckboxList';
import FormRadioList from './FormRadioList';
import FormFileInput from './FormFileInput';

async function saveFormData(data) {
    console.log('request');
    const formData = new FormData();

    for (const key in data) {
        if (data[key] instanceof FileList) {
            formData.append(key, data[key][0]);
        } else {
            formData.append(key, data[key]);
        }
    }

    console.log(formData);

    return await fetch("/api/form", {
        // body: JSON.stringify(data),
        // body: data,
        // body: formData,
        method: "POST",
        body: formData
        // headers: {"Content-Type": "application/json"},
        // headers: {"Content-Type": "multipart/form-data"},
    });
}

export default function Form() {
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors, isDirty }
    } = useForm();

    useUnsavedChanges(isDirty);

    const onSubmit = async (data) => {
        const response = await saveFormData(data);

        console.log(response);

        if (response.status === 400) {
            // Validation error
            // Expect response to be a JSON response with the structure:
            // {"fieldName": "error message for that field"}
            const fieldToErrorMessage = await response.json();
            for (const [fieldName, errorMessage] of Object.entries(fieldToErrorMessage)) {
                setError(fieldName, {type: 'custom', message: errorMessage});
            }
        } else if (response.ok) {
            // successful

            /* reset the form values */
            reset();
        } else {
            // unknown error
        }
    };

    // const onSubmit = (data) => console.log(data);

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
                {/* <FormInput
                    htmlFor="email"
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    required={true}
                    className="c-formElement--bordered"
                    settings={{...register("email", {required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})}}
                    errors={errors['email']}
                /> */}
                {/* <FormFileInput
                    htmlFor="resume"
                    label="Resume"
                    type="file"
                    id="resume"
                    name="resume"
                    required={true}
                    className="c-formElement--upload--bordered"
                    rules={{
                        required: true,
                        validate: (files) => {
                            const regex = new RegExp(/[^\s]+(.*?).(jpe?g|png|docx?|pdf)$/i);

                            if (!files.length)
                                return 'This field is required';

                            return regex.test(files[0]?.name) || 'Unauthorized format, only jpeg, jpg, png, doc, docx and pdf are valid';
                        }
                    }}
                    control={control}
                /> */}
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