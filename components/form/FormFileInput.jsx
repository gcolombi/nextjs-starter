import styles from '../../styles/modules/FormInput.module.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import FileUpload from '../icons/FileUpload';
import { useController } from 'react-hook-form';

export default function FormFileInput({
    htmlFor,
    label,
    id,
    name,
    required,
    className,
    wrapperClassName,
    errors,
    control
}) {
    const [labelValue, setLabelValue] = useState(label);
    const [file, setFile] = useState(null);
    const { field, formState: { isSubmitSuccessful }} = useController({ control, name });

    /* Sets input and label value */
    const updateOnChange = (e) => {
        field.onChange(e.target.files.length && e.target.files || '');
        setFile(e.target.files[0] || null);
        setLabelValue(e.target.files[0]?.name || label);
    };

    /* Reset label after successful submit */
    useEffect(() => {
      if (isSubmitSuccessful)
        setLabelValue(label);
    }, [isSubmitSuccessful, label]);

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
                    name={field?.name}
                    required={required}
                    ref={field.ref}
                    onBlur={field.onBlur}
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