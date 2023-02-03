import styles from '../../styles/modules/Form.module.scss';
import FormInput from './FormInput';
import classNames from 'classnames';

export default function Form() {
    return(
        <form className={classNames('u-spacing--responsive--bottom', styles['c-form'])}>
            <div className="o-container">
                <div className={styles['c-form__row']}>
                    <FormInput
                        htmlFor="firstname"
                        type="text"
                        id="firstname"
                        required={true}
                        wrapperClassName={styles['c-form__item']}
                    />

                </div>
            </div>
        </form>
    );
}