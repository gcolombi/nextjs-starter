import MetaData from '@/components/MetaData';
import HeaderBasic from '@/components/HeaderBasic';
import Button from '@/components/Button';
import useLockedScroll from '@/hooks/useLockedScroll';
import ShuffleTextInOut from '@/components/gsap/ShuffleTextInOut';
import RotateInOut3D from '@/components/gsap/RotateInOut3D';
import ScaleInOut from '@/components/gsap/ScaleInOut';
import RotateInOut from '@/components/gsap/RotateInOut';
import ImplodeExplodeInOut from '@/components/gsap/ImplodeExplodeInOut';
import useDemoModal from '@/components/modal/DemoModal';

export default function Home() {
    const { DemoModal, setModal } = useDemoModal();
    const [locked, setLocked] = useLockedScroll(false);

    return (
        <>
            <MetaData />
            <HeaderBasic
                title="Next.js starter"
                wysiwyg="A starter for Next.js that includes a collection of reusable components, hooks, and utilities to build amazing projects with complex animated page transitions using GSAP."
                button={{
                    label: 'Powered by Next.js',
                    href: '',
                    isExternal: true,
                    externalHref: 'https://nextjs.org/',
                    anchor: '',
                    onClick: '',
                    className: 'c-btn'
                }}
            />
            <section className="u-spacing--responsive--bottom">
                <div className="o-container">
                    <DemoModal />
                    <Button
                        label="Modal"
                        onClick={() => setModal(true)}
                        className="c-btn"
                    />
                </div>
            </section>
            <section className="u-spacing--responsive--bottom">
                <div className="o-container">
                    <ShuffleTextInOut
                        delay={0.5}
                        target="#shuffle"
                    >
                        <h2 id="shuffle">GreenSock is awesome</h2>
                    </ShuffleTextInOut>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                            gridAutoRows: "1fr",
                            width: "100%"
                        }}
                    >
                        <RotateInOut3D
                            durationIn={1 + Math.random()}
                            delay={0.5 + Math.random()}
                            y={120}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    background: "var(--primary-light)"
                                }}
                            />
                        </RotateInOut3D>
                        <RotateInOut3D
                            durationIn={1 + Math.random()}
                            delay={0.5 + Math.random()}
                            y={120}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    background: "var(--primary-lighter)"
                                }}
                            />
                        </RotateInOut3D>
                        <RotateInOut3D
                            durationIn={1 + Math.random()}
                            delay={0.5 + Math.random()}
                            y={120}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    background: "var(--primary)"
                                }}
                            />
                        </RotateInOut3D>
                        <RotateInOut3D
                            durationIn={1 + Math.random()}
                            delay={0.5 + Math.random()}
                            y={120}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    background: "var(--primary-dark)"
                                }}
                            />
                        </RotateInOut3D>
                        <RotateInOut3D
                            durationIn={1 + Math.random()}
                            delay={0.5 + Math.random()}
                            y={120}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    background: "var(--primary-darker)"
                                }}
                            />
                        </RotateInOut3D>
                    </div>
                </div>
            </section>
            <section className="u-spacing--responsive--bottom">
                <div className="o-container">
                    <ScaleInOut
                        x="-90px"
                        durationIn={1}
                        ease="elastic.out"
                        watch
                    >
                        <Button
                            label={locked ? 'Unlock scroll' : 'Lock scroll'}
                            onClick={() => setLocked(!locked)}
                            className="c-btn"
                        />
                    </ScaleInOut>
                </div>
            </section>
            <div className="u-spacing--responsive--bottom">
                <div className="o-container">
                    <div className="o-wysiwyg">
                        <ImplodeExplodeInOut
                            target="#text"
                            watch
                        >
                            <h2 id="text">GreenSock</h2>
                        </ImplodeExplodeInOut>
                    </div>
                </div>
            </div>
            <div className="u-spacing--responsive--bottom">
                <div className="o-container">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <RotateInOut
                            fade={false}
                            durationIn={.25}
                            rotateTo={360}
                            watch
                            start="bottom bottom"
                            end="top top"
                            scrub
                        >
                            <div style={{ width: '100px', height: '100px', background: 'var(--primary)', borderRadius: '10px' }} />
                        </RotateInOut>
                    </div>
                </div>
            </div>
            <div className="u-spacing--responsive--bottom">
                <div className="o-container">
                    <ShuffleTextInOut
                        target="#shuffleText"
                        watch
                    >
                        <h2 id="shuffleText">GreenSock is awesome</h2>
                    </ShuffleTextInOut>
                </div>
            </div>
        </>
    )
}