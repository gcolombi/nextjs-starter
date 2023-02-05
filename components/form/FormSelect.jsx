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
    options = [{label: 'Option 1', value: 'option-1'}, {label: 'Option 2', value: 'option-2'}, {label: 'Option 3', value: 'option-3'}]
}) {
    const [selected, setSelected] = useState();

    const change = (e) => {
        setSelected(e.target.value);
    }

    return(
        <div className={wrapperClassName}>
            {label && htmlFor &&
                <label htmlFor={htmlFor}>{label}</label>
            }
            <div
                className={classNames(
                    styles['c-formElement'],
                    styles[className],
                )}
            >

                <div
                    className={classNames(
                        styles[className],
                    )}
                >
                    <Chevron />
                    <select
                        defaultValue={defaultValue}
                        id={id}
                        name={name}
                        required={required}
                        onChange={change}
                    >
                        {defaultValue &&
                            <option value={defaultValue} disabled>{defaultValue}</option>
                        }
                        {options?.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <span className={styles['c-formElement--focusLine']} />
                </div>
            </div>
        </div>
    );
}