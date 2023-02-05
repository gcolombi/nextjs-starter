import FormCheckbox from "./FormCheckbox";

export default function FormCheckboxList({
    title,
    items = ['Perspiciatis amet', 'Quibusdam', 'Recusandae sit', 'Consectetur'],
    className
}) {
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
                    />
                ))}
            </div>
       </div>
    );
}