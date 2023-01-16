import styles from '../styles/modules/HeaderHome.module.scss';

export default function HeaderHome(props) {
    return (
        <section className={`u-spacing--responsive ${styles['c-headerHome']}`}>
            <div className='o-container'>
                <div className={styles['c-headerHome__row']}>
                    <div className={styles['c-headerHome__col']}>
                        <div className='o-wysiwyg'>
                            <h1>Home</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut aliquid, corrupti omnis accusamus expedita nisi ullam magnam aperiam praesentium nam cum maiores officiis a? Quisquam tempora libero ipsam non. Modi?</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}