import styles from '../../styles/modules/Form.module.scss';
import classNames from 'classnames';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import Button from '../Button';

export default function Form() {

    const onSubmit = (e) => {
        e.preventDefault();
        // saveFormData()
    }

    return(
        <form className={classNames('u-spacing--responsive--bottom', styles['c-form'])} onSubmit={onSubmit}>
            <div className="o-container">
                <div className={styles['c-form__row']}>
                    <FormInput
                        htmlFor="firstname"
                        label="Firstname"
                        id="firstname"
                        name="firstname"
                        required={true}
                        className="c-formElement--bordered"
                    />
                    <FormInput
                        htmlFor="lastname"
                        label="Lastname"
                        id="lastname"
                        name="lastname"
                        required={true}
                        className="c-formElement--bordered"
                    />
                </div>
                <FormInput
                    htmlFor="email"
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    required={true}
                    className="c-formElement--bordered"
                />
                <FormTextarea
                    htmlFor="message"
                    label="Message"
                    id="message"
                    name="message"
                    required={true}
                    className="c-formElement--bordered"
                />
                <Button
                    label="Send"
                    className="c-btn"
                    wrapperClassName={styles['c-form__btn']}
                />
            </div>
        </form>
    );
}