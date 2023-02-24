import styles from '../../styles/modules/FormInput.module.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import FileUpload from '../icons/FileUpload';

export default function FormFileInput({
    htmlFor,
    label,
    id,
    name,
    required,
    className,
    wrapperClassName,
    errors,
    controller
}) {
    const [labelValue, setLabelValue] = useState(label);
    const [file, setFile] = useState(null);

    /* Sets input and label value */
    const updateOnChange = (e) => {
        controller?.field.onChange(e.target.files.length && e.target.files || '');
        setFile(e.target.files[0] ?? null);
        setLabelValue(e.target.files[0]?.name ?? label);
    };

    /* Reset label after successful submit */
    useEffect(() => {
        if (controller?.formState.isSubmitSuccessful)
            setLabelValue(label);
    }, [controller?.formState.isSubmitSuccessful, label]);

    return(
        <div className={wrapperClassName}>
            <div
                className={classNames(
                    styles['c-formElement'],
                    styles[className],
                    {
                        [styles['has-error']]: required && errors?.message
                    }
                )}
            >
                <input
                    type="file"
                    id={id}
                    name={controller?.field.name || name}
                    required={required}
                    ref={controller?.field.ref}
                    onBlur={controller?.field.onBlur}
                    onChange={updateOnChange}
                />
                <FileUpload />
                {label && htmlFor &&
                    <label htmlFor={htmlFor}>{labelValue}{required && labelValue === label && ' *'}</label>
                }
                <span className={styles['c-formElement--focusLine']} />
            </div>
            {errors?.message &&
                <label htmlFor={htmlFor}>{errors?.message}</label>
            }
        </div>
    );
}