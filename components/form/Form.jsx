import styles from '../../styles/modules/Form.module.scss';
import { useForm } from 'react-hook-form';
// import { ErrorMessage } from "@hookform/error-message"
import classNames from 'classnames';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import Button from '../Button';

async function saveFormData(data) {
    console.log(data);
    return await fetch("/api/form", {
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"},
        method: "POST"
    });
}

export default function Form() {
    const {register, handleSubmit, setError, formState: { isSubmitting, errors }} = useForm();

    const onSubmit = async (data) => {
        const response = await saveFormData(data);

        console.log(response);

        if (response.status === 400) {
            // Validation error
            // Expect response to be a JSON response with the structure:
            // {"fieldName": "error message for that field"}
            const fieldToErrorMessage = await response.json();
            for (const [fieldName, errorMessage] of Object.entries(fieldToErrorMessage)) {
                setError(fieldName, {type: 'custom', message: errorMessage})
            }
        } else if (response.ok) {
            // successful
        } else {
            // unknown error
        }
    };

    return(
        <form className={classNames('u-spacing--responsive--bottom', styles['c-form'])} onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* // <form className={classNames('u-spacing--responsive--bottom', styles['c-form'])} onSubmit={handleSubmit(onSubmit)}> */}
            <div className="o-container">
                <div className={styles['c-form__row']}>
                    <FormInput
                        htmlFor="firstname"
                        label="Firstname"
                        id="firstname"
                        name="firstname"
                        required={true}
                        className="c-formElement--bordered"
                        custom={{...register("firstname", {required: true})}}
                        errors={errors}
                        // custom={{...register("firstname", {required: 'This field is required'})}}
                    />
                    {/* <ErrorMessage
                        errors={errors}
                        name="multipleErrorInput"
                        render={({ messages }) => {
                        console.log("messages", messages);
                        return messages
                            ? Object.entries(messages).map(([type, message]) => (
                                <p key={type}>{message}</p>
                            ))
                            : null;
                        }}
                    /> */}
                    {/* <FormInput
                        htmlFor="lastname"
                        label="Lastname"
                        id="lastname"
                        name="lastname"
                        required={true}
                        className="c-formElement--bordered"
                    /> */}
                </div>
                {/* <FormInput
                    htmlFor="email"
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    required={true}
                    className="c-formElement--bordered"
                />
                <FormTextarea
                    htmlFor="message"
                    label="Message"
                    id="message"
                    name="message"
                    required={true}
                    className="c-formElement--bordered"
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