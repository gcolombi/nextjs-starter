import { useState } from "react";
import FormCheckbox from "./FormCheckbox";

export default function FormCheckboxList({
    title,
    items = ['Perspiciatis amet', 'Quibusdam', 'Recusandae sit', 'Consectetur'],
    className
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
            <div>
                {items.map((item, index) => (
                    <FormCheckbox
                        key={`${item.trim().replace( /\s+/g, '-').toLowerCase()}-${index}`}
                        htmlFor={`${item.trim().replace( /\s+/g, '-').toLowerCase()}-${index}`}
                        label={item}
                        id={`${item.trim().replace( /\s+/g, '-').toLowerCase()}-${index}`}
                        name={`${item.trim().replace( /\s+/g, '-').toLowerCase()}-${index}`}
                        value={item}
                        className="c-formElement--checkboxSvg"
                        onChange={() =>
                            change(item)
                        }
                    />
                ))}
            </div>
       </div>
    );
}