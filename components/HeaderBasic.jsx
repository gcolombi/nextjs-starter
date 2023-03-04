import styles from '@/styles/modules/HeaderBasic.module.scss';
import Button from './Button';
import classNames from 'classnames';
import FadeIn from './gsap/FadeIn';
import FadeInOut from './gsap/FadeInOut';
import ScaleIn from './gsap/ScaleIn';

export default function HeaderBasic({
    title,
    wysiwyg,
    button,
    className
}) {
    // return (
    //     <>
    //         {
    //             title &&
    //             <section className={classNames('u-spacing--responsive', styles['c-headerBasic'], styles[className])}>
    //                 <div className="o-container">
    //                     <div className={classNames('u-text--center', styles['c-headerBasic__row'])}>
    //                         <div className="o-wysiwyg">
    //                             <FadeIn
    //                                 delay={.5}
    //                                 y={50}
    //                                 ease="back.out"
    //                             >
    //                                 <h1>{title}</h1>
    //                             </FadeIn>
    //                             <FadeIn
    //                                 delay={.7}
    //                                 y={70}
    //                                 ease="back.out"
    //                             >
    //                                 <p>{wysiwyg}</p>
    //                             </FadeIn>
    //                         </div>
    //                         {button &&
    //                             <FadeIn
    //                                 delay={.9}
    //                                 y={90}
    //                                 ease="back.out"
    //                             >
    //                                 <Button
    //                                     label={button.label}
    //                                     href={button.href}
    //                                     isExternal={button.isExternal}
    //                                     externalHref={button.externalHref}
    //                                     anchor={button.anchor}
    //                                     onClick={button.onClick}
    //                                     className={button.className}
    //                                     wrapperClassName={styles['c-headerBasic__btn']}
    //                                 />
    //                             </FadeIn>
    //                         }
    //                     </div>
    //                 </div>
    //             </section>
    //         }
    //     </>
    // );
    return (
        <>
            {
                title &&
                <section className={classNames('u-spacing--responsive', styles['c-headerBasic'], styles[className])}>
                    <div className="o-container">
                        <div className={classNames('u-text--center', styles['c-headerBasic__row'])}>
                            <div className="o-wysiwyg">
                                <FadeInOut
                                    delay={.5}
                                    y={50}
                                    skipOutro
                                >
                                    <h1>{title}</h1>
                                </FadeInOut>
                                <FadeInOut
                                    delay={.7}
                                    y={70}
                                    skipOutro
                                >
                                    <p>{wysiwyg}</p>
                                </FadeInOut>
                            </div>
                            {button &&
                                <ScaleIn
                                    delay={.9}
                                    ease="elastic"
                                    duration={1}
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
                                </ScaleIn>
                            }
                        </div>
                    </div>
                </section>
            }
        </>
    );
}