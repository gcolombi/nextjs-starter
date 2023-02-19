import FormRadio from './FormRadio';
import classNames from 'classnames';

export default function FormRadioList({
    title,
    items = ['Temporibus nesciunt', 'Exercitationem', 'Velit eveniet', 'Quaerat'],
    className,
    name,
    register = {},
    errors
}) {
    return(
       <div className={className}>
            <p>{title}</p>
            <div
                className={classNames(
                    'c-formElement',
                    'c-formElement--marginNone',
                    {'has-error': errors?.message}
                )}
            >
                {items.map((item) => (
                    <FormRadio
                        key={`${item.trim().replace( /\s+/g, '-').toLowerCase()}`}
                        htmlFor={`${item.trim().replace( /\s+/g, '-').toLowerCase()}`}
                        label={item}
                        id={`${item.trim().replace( /\s+/g, '-').toLowerCase()}`}
                        name={name}
                        value={item}
                        className="c-formElement--radio"
                        // settings={name && register?.(name)}
                        register={name && register}
                    />
                ))}
            </div>
            {errors?.message &&
                <label htmlFor={name}>{errors?.message}</label>
            }
       </div>
    );
}