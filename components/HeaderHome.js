import styles from '../styles/modules/HeaderHome.module.scss';

export default function HeaderHome({
    title,
    wysiwyg
 }) {
    return (
        <section className={`u-spacing--responsive u-blockColor--secondary ${styles['c-headerHome']}`}>
            <div className='o-container'>
                <div className={styles['c-headerHome__row']}>
                    <div className={styles['c-headerHome__col']}>
                        <div className='o-wysiwyg'>
                            <h1>{title}</h1>
                            <p>{wysiwyg}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}