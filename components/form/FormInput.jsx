import styles from '../../styles/modules/FormInput.module.scss';
import classNames from 'classnames';

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
    return(
        <div className={wrapperClassName}>
            <div className={classNames(styles['c-formElement--bordered'], styles['m-label'])}>
                <label htmlFor={htmlFor}>Firstname</label>
                <input type={type} id={id} name={name} placeholder={placeholder} value={value} required={required} />
                <span className={styles['c-formElement--focusLine']}></span>
            </div>
        </div>
    );
}