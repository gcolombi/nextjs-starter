import styles from '../../styles/modules/Form.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { useTheme } from 'next-themes';
import useIsMounted from '@/hooks/useIsMounted';
import { object, string, mixed, array, addMethod } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useUnsavedChanges from '@/hooks/useUnsavedChanges';
import classNames from 'classnames';
import FormInput from './FormInput';
import FormFileInput from './FormFileInput';
import FormSelect from './FormSelect';
import FormCheckboxList from './FormCheckboxList';
import FormRadioList from './FormRadioList';
import FormTextarea from './FormTextarea';
import Button from '../Button';
import { toast, ToastContainer, Zoom } from 'react-toastify';

export default function CareerForm() {
    return (
        <>
            <form className={classNames('u-spacing--responsive--bottom', styles['c-form'])} noValidate>
                <div className="o-container">
                    <div className={styles['c-form__row']}>
                    </div>
                </div>
            </form>
        </>
    );
}