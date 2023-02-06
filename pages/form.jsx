import MetaData from '@/components/MetaData';
import HeaderBasic from '@/components/HeaderBasic';

export default function FormElements() {
    return(
        <>
            <MetaData
                title="Form"
                description="Lorem ipsum dolor sit form."
            />
            <HeaderBasic
                title="Form"
                wysiwyg="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dicta saepe maxime ut! Ratione, fugit, neque expedita ex consequatur reiciendis sint praesentium ad quos, veniam nemo esse architecto impedit cum!"
            />
            <section className="u-spacing--responsive--bottom">
                <div className="o-container">
                    <div className="o-wysiwyg">
                        <h2>Form elements</h2>
                    </div>
                    <div>

                    </div>
                </div>
            </section>
        </>
    );
}