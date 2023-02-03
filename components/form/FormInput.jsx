import styles from '../../styles/modules/FormInput.module.scss';
import classNames from 'classnames';
import { useState } from 'react';

export default function FormInput({
    htmlFor,
    type,
    id,
    name,
    placeholder,
    value,
    required,
    wrapperClassName
}) {
    const [isFocus, setIsFocus] = useState(false);

    return(
        <div className={wrapperClassName}>
            <div
                className={classNames(
                    styles['c-formElement--bordered'],
                    styles['m-label'],
                    {
                        [styles['is-up']]: isFocus
                    }
                )}
            >
                <label htmlFor={htmlFor}>Firstname</label>
                <input
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    required={required}
                    onFocus={() =>
                        setIsFocus(true)
                    }
                    onBlur={() =>
                        setIsFocus(false)
                    }
                />
                <span className={styles['c-formElement--focusLine']} />
            </div>
        </div>
    );
}