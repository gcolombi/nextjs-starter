import styles from '@/styles/modules/HeaderBasic.module.scss';
import Button from './Button';
import TranslateInOut from './gsap/TranslateInOut';
import ScaleInOut from './gsap/ScaleInOut';
import ImplodeExplodeInOut from './gsap/ImplodeExplodeInOut';
import classNames from 'classnames';

export default function HeaderBasic({
    title,
    wysiwyg,
    button,
    className
}) {
    return (
        <>
            {
                title &&
                <section className={classNames(styles['c-headerBasic'], styles[className])}>
                    <div className="o-container">
                        <div className={classNames('u-text--center', styles['c-headerBasic__row'])}>
                            <ImplodeExplodeInOut
                                delay={.5}
                                target="#title"
                            >
                                <h1 id="title">{title}</h1>
                            </ImplodeExplodeInOut>
                            <TranslateInOut
                                overflowHidden
                                delay={.7}
                                y="70px"
                            >
                                <div className="o-wysiwyg">
                                    <p>{wysiwyg}</p>
                                </div>
                            </TranslateInOut>
                            {button &&
                                <ScaleInOut
                                    delay={.9}
                                    y="90px"
                                    durationIn={1}
                                    ease="elastic.out"
                                >
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
                                </ScaleInOut>
                            }
                        </div>
                    </div>
                </section>
            }
        </>
    );
}