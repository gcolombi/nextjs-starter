import Link from "next/link";

export default function ArticleList({
    articles
}) {

    if (articles.length) {
        return (
            <section className="u-spacing--responsive">
                <div className="o-container">
                    <ul className="unstyled u-margin--none">
                        {articles.map((article) => (
                            <li key={article.id}>
                                <Link
                                    href={`/blog/${article.slug}`}
                                >
                                    {article.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        );
    }

    return (
        <section className="u-spacing--responsive">
            <div className="o-container">
                <div className="o-wysiwyg">
                    <p>No article</p>
                </div>
            </div>
        </section>
    );
}