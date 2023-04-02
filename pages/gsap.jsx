import MetaData from '@/components/MetaData';
import HeaderBasic from '@/components/HeaderBasic';
import ShuffleTextInOut from '@/components/gsap/ShuffleTextInOut';
import TranslateInOut from '@/components/gsap/TranslateInOut';

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
                    <div className="o-wysiwyg">
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
            </div>
        </>
    );
}