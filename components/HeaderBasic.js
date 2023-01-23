import styles from '@/styles/modules/HeaderBasic.module.scss';
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
                            {button &&
                                <Button
                                    label={button.label}
                                    href={button.href}
                                    isExternal={button.isExternal}
                                    externalHref={button.externalHref}
                                    anchor={button.anchor}
                                    onClick={button.onClick}
                                    className={button.className}
                                    wrapperClassName={styles['c-headerBasic__btn']}
                                />
                            }
                        </div>
                    </div>
                </section>
            }
        </>
    );
}