import MetaData from '@/components/MetaData';
import HeaderTextCenter from '@/components/HeaderTextCenter';

export default function blog() {
    return (
        <>
            <MetaData
                title="Blog"
                description="Lorem ipsum dolor sit blog."
            />
            <HeaderTextCenter
                title="Blog"
                wysiwyg="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dicta saepe maxime ut! Ratione, fugit, neque expedita ex consequatur reiciendis sint praesentium ad quos, veniam nemo esse architecto impedit cum!"
            />
        </>
    );
}