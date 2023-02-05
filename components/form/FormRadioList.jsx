import { useState } from "react";

export default function FormRadioList({
    title,
    items = [],
    className
}) {

    return(
       <div className={className}>
            <p>{title}</p>
            <div>
                {/* {items.map((item, index) => (

                ))} */}
            </div>
       </div>
    );
}