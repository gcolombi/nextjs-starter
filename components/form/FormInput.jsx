import styles from '../../styles/modules/FormInput.module.scss';
import { useState } from 'react';
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
    custom
}) {
    const [labelTitle, setLabelTitle] = useState(label);
    const [file, setFile] = useState(null);

    const update = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setLabelTitle(e.target.files[0]?.name || label);
        }
    };

    return(
        <div className={wrapperClassName}>
            <div
                className={classNames(
                    styles['c-formElement'],
                    styles[className],
                    {[styles['c-floatingLabel']]: type !== 'file'}
                )}
            >
                <input
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    required={required}
                    onChange={update}
                    {...custom}
                />
                {type === 'file' &&
                    <FileUpload />
                }
                {label && htmlFor &&
                    <label htmlFor={htmlFor}>{labelTitle}</label>
                }
                <span className={styles['c-formElement--focusLine']} />
            </div>
        </div>
    );
}