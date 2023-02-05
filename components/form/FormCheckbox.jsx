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
            <div
                className={classNames(
                    styles[className]
                )}
            >
                <input type="checkbox" id={id} name={name} />
                <label htmlFor={htmlFor}>
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 10 10 L 90 90"></path>
                        <path d="M 90 10 L 10 90"></path>
                    </svg>
                    {label}
                </label>
            </div>
        </div>
    );
}