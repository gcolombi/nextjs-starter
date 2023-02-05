import { useState } from "react";
import FormRadio from "./FormRadio";

export default function FormRadioList({
    title,
    inputName,
    items = ['Temporibus nesciunt', 'Exercitationem', 'Velit eveniet', 'Quaerat'],
    className
}) {
    const [selected, setSelected] = useState('');

    const change = (e) => {
        setSelected(e.target.value);
    }

    return(
       <div className={className}>
            <p>{title}</p>
            <div>
                {items.map((item, index) => (
                    <FormRadio
                        key={`${item.trim().replace( /\s+/g, '-').toLowerCase()}-${index}`}
                        htmlFor={`${item.trim().replace( /\s+/g, '-').toLowerCase()}-${index}`}
                        label={item}
                        id={`${item.trim().replace( /\s+/g, '-').toLowerCase()}-${index}`}
                        name={inputName}
                        value={item}
                        className="c-formElement--radio"
                        onChange={change}
                    />
                ))}
            </div>
       </div>
    );
}