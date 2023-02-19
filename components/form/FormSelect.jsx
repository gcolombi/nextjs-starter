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
    return(
        <div className={wrapperClassName}>
            <div
                className={classNames(
                    styles['c-formElement'],
                    styles[className],
                    {
                        [styles['c-floatingLabel']]: label,
                        [styles['has-error']]: required && errors?.message
                    }
                )}
            >
                <Chevron />
                <select
                    defaultValue={defaultValue ?? ''}
                    id={id}
                    name={name}
                    required={required}
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
            {errors?.message &&
                <label htmlFor={htmlFor}>{errors?.message}</label>
            }
        </div>
    );
}