import { useState } from 'react';
import FormRadio from './FormRadio';
import classNames from 'classnames';

export default function FormRadioList({
    title,
    items = ['Temporibus nesciunt', 'Exercitationem', 'Velit eveniet', 'Quaerat'],
    className,
    name,
    register,
    errors
}) {
    const [selected, setSelected] = useState('');

    const change = (e) => {
        setSelected(e.target.value);
    }

    return(
       <div className={className}>
            <p>{title}</p>
            <div
                className={classNames(
                    'c-formElement',
                    'c-formElement--marginNone',
                    {'has-error': errors?.type === "required"}
                )}
            >
                {items.map((item, index) => (
                    <FormRadio
                        key={`${item.trim().replace( /\s+/g, '-').toLowerCase()}-${index}`}
                        htmlFor={`${item.trim().replace( /\s+/g, '-').toLowerCase()}-${index}`}
                        label={item}
                        id={`${item.trim().replace( /\s+/g, '-').toLowerCase()}-${index}`}
                        name={name}
                        value={item}
                        className="c-formElement--radio"
                        onChange={change}
                        settings={name && {...register?.(name, {required: true})}}
                    />
                ))}
            </div>
            {errors?.type === "required" &&
                <label htmlFor={name}>This field is required</label>
            }
            {errors?.message &&
                <label htmlFor={name}>{errors?.message}</label>
            }
       </div>
    );
}