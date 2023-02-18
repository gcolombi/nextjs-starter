import MetaData from '@/components/MetaData';
import HeaderBasic from '@/components/HeaderBasic';

export default function PageNotFound() {
    return (
        <>
            <MetaData
                title="404"
                description="You are lost in Space!"
            />
            <HeaderBasic
                title="Page not found"
                wysiwyg="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dicta saepe maxime ut! Ratione, fugit, neque expedita ex consequatur reiciendis sint praesentium ad quos, veniam nemo esse architecto impedit cum!"
                button={{
                    label: 'Please get me out of here',
                    href: '/',
                    className: 'c-btn'
                }}
                className="c-headerBasic--fullHeight"
            />
        </>
    );
}