import styles from '../../styles/modules/FormTextarea.module.scss';
import classNames from 'classnames';

export default function FormTextarea({
    htmlFor,
    label,
    id,
    name,
    placeholder=" ",
    required,
    className,
    wrapperClassName,
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
                        [styles['has-error']]: required && errors?.type === "required" || errors?.message
                    }
                )}
            >
                <textarea
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    {...settings}
                />
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