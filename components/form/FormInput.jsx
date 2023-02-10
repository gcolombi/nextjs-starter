import styles from '../../styles/modules/FormInput.module.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import FileUpload from '../icons/FileUpload';

export default function FormInput({
    htmlFor,
    label,
    type="text",
    id,
    name,
    placeholder=" ",
    value,
    required,
    className,
    wrapperClassName,
    custom,
    resetField,
    setError,
    clearErrors,
    errors,
    isSubmitSuccessful
}) {
    const [labelTitle, setLabelTitle] = useState(label);
    const [file, setFile] = useState(null);

    const update = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0] || null);
            setLabelTitle(e.target.files[0]?.name || label);

            // const regex = new RegExp(/[^\s]+(.*?).(jpe?g|png|docx?|pdf)$/i);

            // if (regex.test(e.target.files[0]?.name)) {
                // console.log('passed');
                // setFile(e.target.files[0]);
                // setLabelTitle(e.target.files[0]?.name);
                // clearErrors?.(custom?.name);
            // } else {
                // console.log('not passed');
                // setFile(null);
                // setLabelTitle(label);
                // resetField?.(custom?.name);
                // setError?.(custom?.name, {
                //     type: 'filetype',
                //     message: 'Unauthorized format, only jpeg, jpg, png, doc, docx and pdf are valid'
                // });
            // }
        }
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
                            [styles['c-floatingLabel']]: type !== 'file',
                            [styles['has-error']]: required && errors?.type === "required" || errors?.type === "pattern" || errors?.message
                        }
                    )}
                >
                    <input
                        type={type}
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        required={required}
                        {...custom }
                        onChange={(e) => {
                            custom.onChange(e);
                            update(e);
                        }}
                    />
                    {type === 'file' &&
                        <FileUpload />
                    }
                    {label && htmlFor &&
                        <label htmlFor={htmlFor}>{labelTitle}{required && labelTitle === label && ' *'}</label>
                    }
                    <span className={styles['c-formElement--focusLine']} />
                </div>
                {required && errors?.type === "required" &&
                    <label htmlFor={htmlFor}>This field is required</label>
                }
                {errors?.type === "pattern" &&
                    <label htmlFor={htmlFor}>Invalid email address</label>
                }
                {errors?.message &&
                    <label htmlFor={htmlFor}>{errors?.message}</label>
                }
            </div>
        </>
    );
}