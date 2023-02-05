import styles from '../../styles/modules/FormRadio.module.scss';
import classNames from 'classnames';

export default function FormRadio({
    htmlFor,
    label,
    id,
    name,
    value,
    className,
    onChange
}) {
    return(
        <div
            className={classNames(
                styles['c-formElement'],
                styles[className]
            )}
        >
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            />
            <label htmlFor={htmlFor}>
                {label}
            </label>
        </div>
    );
}