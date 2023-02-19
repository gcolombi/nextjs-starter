import FormCheckbox from './FormCheckbox';
import classNames from 'classnames';

export default function FormCheckboxList({
    title,
    items = ['Perspiciatis amet', 'Quibusdam', 'Recusandae sit', 'Consectetur'],
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
                    <FormCheckbox
                        key={`${item.trim().replace( /\s+/g, '-').toLowerCase()}`}
                        htmlFor={`${item.trim().replace( /\s+/g, '-').toLowerCase()}`}
                        label={item}
                        id={`${item.trim().replace( /\s+/g, '-').toLowerCase()}`}
                        name={name}
                        value={item}
                        className="c-formElement--checkboxSvg"
                        // register={name && register?.(name)}
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