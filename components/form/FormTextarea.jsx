import styles from '../../styles/modules/FormTextarea.module.scss';
import classNames from 'classnames';

export default function FormTextarea({
    htmlFor,
    id,
    name,
    placeholder=" ",
    required,
    wrapperClassName
}) {
    return(
        <div className={wrapperClassName}>
            <div className="c-formElement--bordered">
                <textarea>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiuSMod tempor incididunt.</textarea>
                <span className="c-formElement--focusLine"></span>
            </div>
        </div>
    );
}