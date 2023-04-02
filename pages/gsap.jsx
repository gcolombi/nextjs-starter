import MetaData from '@/components/MetaData';
import HeaderBasic from '@/components/HeaderBasic';
import ShuffleTextInOut from '@/components/gsap/ShuffleTextInOut';
import FadeInOut from '@/components/gsap/FadeInOut';
import TranslateInOut from '@/components/gsap/TranslateInOut';
import ScaleInOut from '@/components/gsap/ScaleInOut';
import RotateInOut from '@/components/gsap/RotateInOut';
import Cross from '@/components/icons/Cross';
import Circle from '@/components/icons/Circle';
import RotateInOut3D from '@/components/gsap/RotateInOut3D';

export default function Gsap() {

    return(
        <>
            <MetaData
                title="GSAP"
            />
            <HeaderBasic
                title="GSAP"
                wysiwyg="The most common reusable custom animations built with GSAP. They can be used as simple intro animations or page transitions."
            />
            <div className="u-spacing--responsive--bottom">
                <div className="o-container--small">
                    <ShuffleTextInOut
                        delay={0.3}
                        target="#gsap-usage"
                    >
                        <h2 id="gsap-usage">Usage</h2>
                    </ShuffleTextInOut>
                    <TranslateInOut
                        overflowHidden
                        delay={0.4}
                        y="100%"
                    >
                        <div className="o-wysiwyg">
                            <p>
                                A great place to get started with GSAP and React is to read <a href="https://greensock.com/react" target="_blank">GSAP X React</a>, <a href="https://greensock.com/react-basics" target="_blank">Getting Started with GSAP + React</a> and <a href="https://greensock.com/react-advanced" target="_blank">GSAP + React, Advanced Animation Techniques</a>.
                                Wrap your component with an animation such as <strong>FadeInOut</strong>, <strong>TranslateInOut</strong>, <strong>ScaleInOut</strong>...
                            </p>
                            <p>Each animation component has built in flexibility for different scenarios:</p>
                            <ul>
                                <li>Setting different durations and delays for intros and outros</li>
                                <li>You can easily overwrite the default ease in any animation by setting the ease prop. Use the <a href="https://greensock.com/docs/v3/Eases" target="_blank">GreenSock Ease Visualizer</a> to help you choose exactly the type of easing that you need</li>
                                <li>Skipping the outro animation</li>
                                <li>Creating scroll interactions and animate your component with <a href="https://greensock.com/docs/v3/Plugins/ScrollTrigger" target="_blank">GSAP ScrollTrigger</a> by setting the watch prop to true (default: false). Determining the start and end position of the ScrollTrigger with start (default: 'top bottom') and end (default: 'bottom top') prop</li>
                                <li>Visualizing markers during development to see exactly where the start/end/trigger points are by setting the markers prop to true</li>
                            </ul>
                        </div>
                    </TranslateInOut>
                </div>
            </div>
            <div className="c-gridSection">
                <div className="o-container--small">
                    <ShuffleTextInOut
                        delay={0.3}
                        target="#animations"
                        watch
                    >
                        <h2 id="animations">Animations</h2>
                    </ShuffleTextInOut>
                    <div className="c-gridSection__row">
                        <FadeInOut
                            durationIn="1.5"
                            delay={0.4}
                            ease="slow"
                            watch
                        >
                            <div className="c-gridSection__item">
                                <div className="o-wysiwyg">
                                    <h3 className="h5">FadeInOut</h3>
                                    <p>durationIn="1.5"<br />delay="0.4"<br />ease="slow"<br />watch</p>
                                </div>
                            </div>
                        </FadeInOut>
                        <TranslateInOut
                            durationIn="1.5"
                            delay={0.4}
                            y="100%"
                            start="-100% bottom"
                            end="top top"
                            watch
                        >
                            <div className="c-gridSection__item">
                                <div className="o-wysiwyg">
                                    <h3 className="h5">TranslateInOut</h3>
                                    <p>durationIn="1.5"<br />delay="0.4"<br />y="100%"<br />start="-100% bottom"<br />end="top top"<br />watch</p>
                                </div>
                            </div>
                        </TranslateInOut>
                        <ScaleInOut
                            durationIn="1"
                            delay={0.4}
                            ease="elastic.out"
                            watch
                        >
                            <div className="c-gridSection__item" style={{display: 'flex'}}>
                                <div className="o-wysiwyg">
                                    <h3 className="h5">ScaleInOut</h3>
                                    <p>durationIn="1"<br />delay="0.4"<br />ease="elastic.out"<br />y="100%"<br />watch</p>
                                </div>
                            </div>
                        </ScaleInOut>
                    </div>
                    <div className="c-gridSection__rotate">
                        <div className="o-wysiwyg">
                            <h3 className="h5">RotateInOut</h3>
                            <p>fade="false"<br />durationIn="0.6"<br />rotateTo="360"<br />start="bottom bottom"<br />end="top top"<br />watch<br />scrub</p>
                        </div>
                        <RotateInOut
                            fade={false}
                            durationIn="0.6"
                            rotateTo={360}
                            start="bottom bottom"
                            end="top top"
                            watch
                            scrub
                        >
                            <div className="c-gridSection__rotate--box" />
                        </RotateInOut>
                    </div>
                </div>
            </div>
            <div className="u-spacing--responsive--bottom">
                <div className="o-container--small">
                    <ShuffleTextInOut
                        delay={0.3}
                        target="#custom-animations"
                        watch
                    >
                        <h2 id="custom-animations">Custom animations</h2>
                    </ShuffleTextInOut>
                    <div className="c-rotateInOut3D">
                        <div className="o-wysiwyg">
                            <h3 className="h5">RotateInOut3D</h3>
                            <p>durationIn="1 + Math.random()"<br />y="100px"<br />start="-100px bottom"<br />watch</p>
                        </div>
                        <div className="c-rotateInOut3D__row u-spacing--responsive--bottom">
                            <RotateInOut3D
                                durationIn={1 + Math.random()}
                                y="100px"
                                start="-100px bottom"
                                watch
                            >
                                <div className="c-rotateInOut3D__item c-rotateInOut3D__item--1" />
                            </RotateInOut3D>
                            <RotateInOut3D
                                durationIn={1 + Math.random()}
                                y="100px"
                                start="-100px bottom"
                                watch
                            >
                                <div className="c-rotateInOut3D__item c-rotateInOut3D__item--2" />
                            </RotateInOut3D>
                            <RotateInOut3D
                                durationIn={1 + Math.random()}
                                y="100px"
                                start="-100px bottom"
                                watch
                            >
                                <div className="c-rotateInOut3D__item c-rotateInOut3D__item--3" />
                            </RotateInOut3D>
                            <RotateInOut3D
                                durationIn={1 + Math.random()}
                                y="100px"
                                start="-100px bottom"
                                watch
                            >
                                <div className="c-rotateInOut3D__item c-rotateInOut3D__item--4" />
                            </RotateInOut3D>
                            <RotateInOut3D
                                durationIn={1 + Math.random()}
                                y="100px"
                                start="-100px bottom"
                                watch
                            >
                                <div className="c-rotateInOut3D__item c-rotateInOut3D__item--5" />
                            </RotateInOut3D>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}