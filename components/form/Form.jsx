import styles from '../../styles/modules/Form.module.scss';
import FormInput from './FormInput';
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
                        type="text"
                        id="firstname"
                        required={true}
                        wrapperClassName={styles['c-form__item']}
                    />
                    <FormInput
                        htmlFor="lastname"
                        label="Lastname"
                        type="text"
                        id="lastname"
                        required={true}
                        wrapperClassName={styles['c-form__item']}
                    />
                    <FormTextarea

                    />
                </div>
            </div>
        </form>
    );
}