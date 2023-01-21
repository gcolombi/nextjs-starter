import styles from '../styles/modules/HeaderBasic.module.scss';
import Button from './Button';

export default function HeaderBasic({
    title,
    wysiwyg,
    button
}) {
    return (
        <>
            {
                title &&
                <section className={`u-spacing--responsive ${styles['c-headerBasic']}`}>
                    <div className='o-container'>
                        <div className={`u-text--center ${styles['c-headerBasic__row']}`}>
                            <div className='o-wysiwyg'>
                                <h1>{title}</h1>
                                <p>{wysiwyg}</p>
                            </div>
                            <Button label={button?.label} link={button?.link} className={button?.className} />
                        </div>
                    </div>
                </section>
            }
        </>
    );
}