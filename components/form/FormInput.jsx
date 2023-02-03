import styles from '../../styles/modules/FormInput.module.scss';
import classNames from 'classnames';

export default function FormInput({
    htmlFor,
    label,
    type,
    id,
    name,
    placeholder=" ",
    value,
    required,
    wrapperClassName
}) {
    return(
        <div className={wrapperClassName}>
            <div
                className={classNames(
                    styles['c-formElement--bordered'],
                    styles['c-floatingLabel']
                )}
            >
                <input
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    required={required}
                />
                <label htmlFor={htmlFor}>{label}</label>
                <span className={styles['c-formElement--focusLine']} />
            </div>
        </div>
    );
}