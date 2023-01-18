export default function HeaderTextCenter({
    title,
    wysiwyg
}) {
    return (
        <section className="u-spacing--responsive u-blockColor--secondary">
            <div className='o-container'>
                <div className="u-text--center">
                    <div className='o-wysiwyg'>
                        <h1>{title}</h1>
                        <p>{wysiwyg}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}