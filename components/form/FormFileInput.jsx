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
    rules,
    control
}) {
    const [labelTitle, setLabelTitle] = useState(label);
    const [file, setFile] = useState(null);
    const { field, fieldState: { error }, formState: { isSubmitSuccessful } } = useController({ control, name, rules });

    const update = (e) => {
        field.onChange(e.target.files);
        setFile(e.target.files[0]);
        setLabelTitle(e.target.files[0]?.name || label);
    };

    /* Reset label after successful submit */
    useEffect(() => {
      if (isSubmitSuccessful)
        setLabelTitle(label);
    }, [isSubmitSuccessful]);

    return(
        <>
            <div className={wrapperClassName}>
                <div
                    className={classNames(
                        styles['c-formElement'],
                        styles[className],
                        {
                            [styles['has-error']]: required && error?.type === "required" || error?.type === "pattern" || error?.message
                        }
                    )}
                >
                    <input
                        type="file"
                        id={id}
                        name={field.name}
                        required={required}
                        onChange={update}
                    />
                    <FileUpload />
                    {label && htmlFor &&
                        <label htmlFor={htmlFor}>{labelTitle}{required && labelTitle === label && ' *'}</label>
                    }
                    <span className={styles['c-formElement--focusLine']} />
                </div>
                {required && error?.type === "required" &&
                    <label htmlFor={htmlFor}>This field is required</label>
                }
                {error?.message &&
                    <label htmlFor={htmlFor}>{error?.message}</label>
                }
            </div>
        </>
    );
}