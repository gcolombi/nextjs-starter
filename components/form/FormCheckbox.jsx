import styles from '../../styles/modules/FormCheckbox.module.scss';
import classNames from 'classnames';
import Cross from '../icons/Cross';

export default function FormCheckbox({
    htmlFor,
    label,
    id,
    value,
    className,
    register,
}) {
    return(
        <div
            className={classNames(
                styles['c-formElement'],
                styles[className]
            )}
        >
            <input
                type="checkbox"
                id={id}
                value={value}
                {...register}
            />
            <label htmlFor={htmlFor}>
                <Cross />
                {label}
            </label>
        </div>
    );
}