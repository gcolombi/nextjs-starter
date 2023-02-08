import { useState } from "react";
import FormCheckbox from "./FormCheckbox";
import classNames from "classnames";

export default function FormCheckboxList({
    title,
    items = ['Perspiciatis amet', 'Quibusdam', 'Recusandae sit', 'Consectetur'],
    className,
    name,
    register,
    errors
}) {
    const [selections, setSelections] = useState([]);

    const change = (element) => {
        const values = selections;
        const find = values.indexOf(element);

        if (find > -1)
            values.splice(find, 1);
        else
            values.push(element);

        setSelections(values);
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
                    <FormCheckbox
                        key={`${item.trim().replace( /\s+/g, '-').toLowerCase()}-${index}`}
                        htmlFor={`${item.trim().replace( /\s+/g, '-').toLowerCase()}-${index}`}
                        label={item}
                        id={`${item.trim().replace( /\s+/g, '-').toLowerCase()}-${index}`}
                        name={name}
                        value={item}
                        className="c-formElement--checkboxSvg"
                        onChange={() =>
                            change(item)
                        }
                        custom={name && {...register?.(name, {required: true})}}
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