import styles from '../../styles/modules/FormCheckbox.module.scss';
import classNames from 'classnames';
import Cross from '../icons/Cross';

export default function FormCheckbox({
    htmlFor,
    label,
    id,
    name,
    value,
    className,
    wrapperClassName
}) {
    return(
        <div className={wrapperClassName}>
            <div
                className={classNames(
                    styles['c-formElement'],
                    styles[className]
                )}
            >
                <input
                    type="checkbox"
                    id={id}
                    name={name}
                    value={value}
                />
                <label htmlFor={htmlFor}>
                    <Cross />
                    {label}
                </label>
            </div>
        </div>
    );
}