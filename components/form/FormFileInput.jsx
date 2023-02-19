import styles from '../../styles/modules/FormInput.module.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import FileUpload from '../icons/FileUpload';

export default function FormFileInput({
    htmlFor,
    label,
    id,
    required,
    className,
    wrapperClassName,
    register = {},
    errors,
    isSubmitSuccessful,
}) {
    const [labelTitle, setLabelTitle] = useState(label);
    const [file, setFile] = useState(null);
    const { onChange, ...params } = register;

    /* Reset label after successful submit */
    useEffect(() => {
      if (isSubmitSuccessful)
        setLabelTitle(label);
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
                    required={required}
                    {...params}
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                        setLabelTitle(e.target.files[0]?.name || label);

                        /* react hook form event */
                        onChange(e);
                    }}
                />
                <FileUpload />
                {label && htmlFor &&
                    <label htmlFor={htmlFor}>{labelTitle}{required && labelTitle === label && ' *'}</label>
                }
                <span className={styles['c-formElement--focusLine']} />
            </div>
            {errors?.message &&
                <label htmlFor={htmlFor}>{errors?.message}</label>
            }
        </div>
    );
}