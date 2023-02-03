import styles from '../../styles/modules/FormInput.module.scss';

export default function FormInput({
    wrapperClassName
}) {
    return(
        <div className={wrapperClassName}>
            <div className="c-formElement--bordered m-label js-label">
                <label for="firstname1">Firstname</label>
                <input type="text" id="firstname1" />
                <span className="c-formElement--focusLine"></span>
            </div>
        </div>
    );
}