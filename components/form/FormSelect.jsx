import styles from '../../styles/modules/FormSelect.module.scss';
import { useState } from 'react';
import classNames from 'classnames';
import Chevron from '../icons/Chevron';

export default function FormSelect({
    defaultValue,
    htmlFor,
    label,
    id,
    name,
    required,
    className,
    wrapperClassName,
    options = ['Option 1', 'Option 2', 'Option 3'],
    settings,
    errors
}) {
    const [selected, setSelected] = useState('');

    const change = (e) => {
        setSelected(e.target.value);
    }

    return(
        <div className={wrapperClassName}>
            <div
                className={classNames(
                    styles['c-formElement'],
                    styles[className],
                    {
                        [styles['c-floatingLabel']]: label,
                        [styles['has-error']]: required && errors?.type === "required" || errors?.message
                    }
                )}
            >
                <Chevron />
                <select
                    defaultValue={defaultValue ?? ''}
                    id={id}
                    name={name}
                    required={required}
                    onChange={change}
                    {...settings}
                >
                    {defaultValue &&
                        <option value={defaultValue} disabled>{defaultValue}</option>
                    }
                    {!defaultValue &&
                        <option value="" disabled></option>
                    }
                    {options?.map((option, index) => (
                        <option key={`${option.trim().replace( /\s+/g, '-').toLowerCase()}-${index}`} value={option}>{option}</option>
                    ))}
                </select>
                {label && htmlFor &&
                    <label htmlFor={htmlFor}>{label}{required && ' *'}</label>
                }
                <span className={styles['c-formElement--focusLine']} />
            </div>
            {required && errors?.type === "required" &&
                <label htmlFor={htmlFor}>This field is required</label>
            }
            {errors?.message &&
                <label htmlFor={htmlFor}>{errors?.message}</label>
            }
        </div>
    );
}