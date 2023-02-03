import styles from '../../styles/modules/FormTextarea.module.scss';
import classNames from 'classnames';

export default function FormTextarea({
    htmlFor,
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
            Textarea
        </div>
    );
}