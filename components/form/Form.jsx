import styles from '../../styles/modules/Form.module.scss';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormTextarea from './FormTextarea';
import classNames from 'classnames';

export default function Form() {
    return(
        <form className={classNames('u-spacing--responsive--bottom', styles['c-form'])}>
            <div className="o-container">
                <div className={styles['c-form__row']}>
                    <FormInput
                        htmlFor="firstname"
                        label="Firstname"
                        id="firstname"
                        name="firstname"
                        required={true}
                        className="c-formElement--bordered"
                        wrapperClassName={styles['c-form__item']}
                    />
                    <FormInput
                        htmlFor="lastname"
                        label="Lastname"
                        id="lastname"
                        name="lastname"
                        required={true}
                        className="c-formElement--bordered"
                        wrapperClassName={styles['c-form__item']}
                    />
                    <FormInput
                        htmlFor="resume"
                        label="Resume"
                        type="file"
                        id="resume"
                        name="resume"
                        required={true}
                        className="c-formElement--upload--bordered"
                        wrapperClassName={styles['c-form__item']}
                    />
                    <FormSelect
                        defaultValue="Subject"
                        id="subject"
                        name="subject"
                        required={true}
                        className="c-formElement--select--bordered"
                        wrapperClassName={styles['c-form__item']}
                    />
                </div>
                <FormTextarea
                    htmlFor="message"
                    label="Message"
                    id="message"
                    name="message"
                    required={true}
                    className="c-formElement--bordered"
                    wrapperClassName={styles['c-form__item']}
                />
            </div>
        </form>
    );
}