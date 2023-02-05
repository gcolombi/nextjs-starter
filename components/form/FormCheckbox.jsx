import styles from '../../styles/modules/FormCheckbox.module.scss';
import classNames from 'classnames';

export default function FormCheckbox({
    htmlFor,
    label,
    id,
    name,
    placeholder=" ",
    required,
    className,
    wrapperClassName
}) {
    return(
        <div className={wrapperClassName}>
            {/* <div
                className={classNames(
                    styles['c-formElement'],
                    styles[className],
                    styles['c-floatingLabel']
                )}
            >
                <textarea
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                />
                {label && htmlFor &&
                    <label htmlFor={htmlFor}>{label}</label>
                }
                <span className={styles['c-formElement--focusLine']} />
            </div> */}
        </div>
    );
}