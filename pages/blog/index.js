import MetaData from '@/components/MetaData';
import HeaderBasic from '@/components/HeaderBasic';
import ArticleList from '@/components/ArticleList';

export default function Blog({
    articles
}) {
    return (
        <>
            <MetaData
                title="Blog"
                description="Lorem ipsum dolor sit blog."
            />
            <HeaderBasic
                title="Blog"
                wysiwyg="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dicta saepe maxime ut! Ratione, fugit, neque expedita ex consequatur reiciendis sint praesentium ad quos, veniam nemo esse architecto impedit cum!"
            />
            <ArticleList
                articles={articles}
            />
        </>
    );
}

export async function getStaticProps() {
    const articles = [
        {
            id: '1',
            title: 'Nulla posuere sollicitudin',
            slug: 'nulla-posuere-sollicitudin'
        }
    ];

    return {
        props: {
            articles
        },
    };
}