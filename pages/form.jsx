import MetaData from '@/components/MetaData';
import HeaderBasic from '@/components/HeaderBasic';
import FormInput from '@/components/form/FormInput';
import FormFileInput from '@/components/form/FormFileInput';
import FormSelect from '@/components/form/FormSelect';
import FormCheckboxList from '@/components/form/FormCheckboxList';
import FormRadioList from '@/components/form/FormRadioList';
import FormTextarea from '@/components/form/FormTextarea';

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
                    <h2>Form elements</h2>
                    <div>
                        <FormInput
                            htmlFor="firstname"
                            label="Firstname"
                            id="firstname"
                            name="firstname"
                            required={true}
                            className="c-formElement--bordered"
                        />
                        {/* <FormFileInput
                            htmlFor="resume"
                            label="Resume"
                            type="file"
                            id="resume"
                            name="resume"
                            required={true}
                            className="c-formElement--upload--bordered"
                        /> */}
                        <FormSelect
                            htmlFor="subject"
                            label="Subject"
                            id="subject"
                            name="subject"
                            required={true}
                            className="c-formElement--select--bordered"
                        />
                        <FormCheckboxList
                            title="Quos fugiat assumenda dolore optio est, corporis sit similique ?"
                            name="choices"
                        />
                        <FormRadioList
                            title="Quos fugiat assumenda dolore optio est, corporis sit similique ?"
                            name="question"
                        />
                        <FormTextarea
                            htmlFor="message"
                            label="Message"
                            id="message"
                            name="message"
                            required={true}
                            className="c-formElement--bordered"
                        />
                    </div>
                </div>
            </section>
        </>
    );
}