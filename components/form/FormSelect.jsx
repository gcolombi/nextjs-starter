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
    wrapperClassName
}) {
    const [selected, setSelected] = useState();

    const change = (e) => {
        console.log(e);
    }

    return(
        <div className={wrapperClassName}>
            <div
                className={classNames(
                    'c-formElement',
                    styles[className],
                    styles['c-floatingLabel']
                )}
            >
                {/* <label htmlFor={htmlFor}>{label}</label> */}
                <div
                    className={classNames(
                        styles[className],
                    )}
                >
                    <Chevron />
                    <select
                        id={id}
                        name={name}
                        required={required}
                        onChange={change}
                    >
                        {defaultValue &&
                            <option selected disabled value="">{defaultValue}</option>
                        }
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                        <option value="option 3">option 3</option>
                    </select>
                    <span className={styles['c-formElement--focusLine']} />
                </div>
            </div>
        </div>
    );
}