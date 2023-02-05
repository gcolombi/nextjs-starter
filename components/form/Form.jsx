import styles from '../../styles/modules/Form.module.scss';
import classNames from 'classnames';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormCheckboxList from './FormCheckboxList';
import FormRadioList from './FormRadioList';
import FormTextarea from './FormTextarea';
import Button from '../Button';

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
                    />
                    <FormInput
                        htmlFor="lastname"
                        label="Lastname"
                        id="lastname"
                        name="lastname"
                        required={true}
                        className="c-formElement--bordered"
                    />
                    <FormInput
                        htmlFor="resume"
                        label="Resume"
                        type="file"
                        id="resume"
                        name="resume"
                        required={true}
                        className="c-formElement--upload--bordered"
                    />
                    <FormSelect
                        htmlFor="subject"
                        label="Subject"
                        id="subject"
                        name="subject"
                        required={true}
                        className="c-formElement--select--bordered"
                    />
                </div>
                <FormCheckboxList
                    title="Quos fugiat assumenda dolore optio est, corporis sit similique ?"
                />
                <FormRadioList
                    title="Quos fugiat assumenda dolore optio est, corporis sit similique ?"
                    inputName="radio_field_name"
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