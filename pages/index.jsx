import MetaData from '@/components/MetaData';
import HeaderBasic from '@/components/HeaderBasic';
import Button from '@/components/Button';
import useLockedScroll from '@/hooks/useLockedScroll';
import ShuffleTextInOut from '@/components/gsap/ShuffleTextInOut';
import RotateInOut3D from '@/components/gsap/RotateInOut3D';
import TranslateInOut from '@/components/gsap/TranslateInOut';
import ScaleInOut from '@/components/gsap/ScaleInOut';
import RotateInOut from '@/components/gsap/RotateInOut';
import ImplodeExplodeInOut from '@/components/gsap/ImplodeExplodeInOut';
import Accordion from '@/components/accordion/Accordion';
import AccordionItem from '@/components/accordion/AccordionItem';

export default function Home() {
    const [locked, setLocked] = useLockedScroll(false);

    const items = [
        {
            header: 'What is Lorem Ipsum?',
            content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius consequatur quisquam voluptatem ea maxime ut est. Ex, quibusdam quod. Quod animi odit error debitis veniam sunt dicta adipisci, quidem architecto? Ultrices mi tempus imperdiet nulla malesuada pellentesque. Praesent elementum facilisis leo vel fringilla est. Ornare arcu odio ut sem nulla pharetra diam sit. Etiam erat velit scelerisque in dictum non consectetur. Porttitor leo a diam sollicitudin tempor id eu nisl. Sagittis eu volutpat odio facilisis mauris sit amet. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Elementum sagittis vitae et leo duis ut diam. Sit amet luctus venenatis lectus magna fringilla urna porttitor. Quis imperdiet massa tincidunt nunc pulvinar. Nulla aliquet porttitor lacus luctus accumsan tortor. Euismod quis viverra nibh cras pulvinar.'
        },
        {
            header: 'Where does it come from?',
            content: 'Suspendisse amet consectetur adipisicing elit. Eius consequatur quisquam voluptatem ea maxime ut est. Auctor elit sed vulputate mi sit amet. Interdum consectetur libero id faucibus. Vel pharetra vel turpis nunc eget lorem dolor sed viverra. Sed odio morbi quis commodo odio aenean sed adipiscing diam. Interdum velit laoreet id donec. At varius vel pharetra vel turpis. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Sit amet venenatis urna cursus. Volutpat ac tincidunt vitae semper quis. Id diam maecenas ultricies mi eget. Risus feugiat in ante metus dictum at. Vel fringilla est ullamcorper eget nulla facilisi. Non consectetur a erat nam at lectus urna duis. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Placerat vestibulum lectus mauris ultrices eros in. Quam nulla porttitor massa id neque. Suspendisse faucibus interdum posuere lorem ipsum. Pharetra vel turpis nunc eget lorem dolor sed viverra. Dui sapien eget mi proin. Id nibh tortor id aliquet.'
        },
        {
            header: 'Why do we use it?',
            content: 'Quisque eget luctus mi, vehicula mollis lorem amet consectetur adipisicing elit. Eius consequatur quisquam voluptatem ea maxime ut est...Lectus sit amet est placerat. Risus ultricies tristique nulla aliquet enim tortor at auctor urna. Interdum velit laoreet id donec ultrices tincidunt arcu non. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Platea dictumst quisque sagittis purus sit amet. Adipiscing tristique risus nec feugiat in. Pellentesque elit ullamcorper dignissim cras. Nunc sed id semper risus in hendrerit. Orci a scelerisque purus semper eget duis at tellus. Eget arcu dictum varius duis at consectetur. Nunc pulvinar sapien et ligula ullamcorper malesuada.'
        }
    ];

    const toggleLocked = () => {
        setLocked(!locked);
    }

    return (
        <>
            <MetaData />
            <HeaderBasic
                title="Home"
                wysiwyg="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dicta saepe maxime ut! Ratione, fugit, neque expedita ex consequatur reiciendis sint praesentium ad quos, veniam nemo esse architecto impedit cum!"
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
            <div className="u-spacing--responsive--bottom">
                <div className="o-container">
                    <Accordion>
                        {items.map(({ header, content }, i) => (
                            <AccordionItem
                                header={header}
                                headingTag={'h5'}
                                id={i}
                                key={i}
                            >
                                <div className="o-wysiwyg">
                                    <p>{content}</p>
                                </div>
                                {/* <Accordion>
                                    {items.map(({ header, content }, i) => (
                                        <AccordionItem
                                            header={header}
                                            headingTag={'h5'}
                                            id={i}
                                            key={i}
                                        >
                                            {content}
                                        </AccordionItem>
                                    ))}
                                </Accordion> */}
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
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
            <TranslateInOut
                y={100}
                watch
            >
                <section className="u-spacing--responsive--bottom">
                    <div className="o-container">
                        <div>
                            <p>Tellus orci ac auctor augue mauris. Turpis tincidunt id aliquet risus feugiat in ante metus. Nulla posuere sollicitudin aliquam ultrices sagittis orci a. Fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque. Elementum sagittis vitae et leo duis ut. Facilisis leo vel fringilla est. Nunc aliquet bibendum enim facilisis gravida. Scelerisque fermentum dui faucibus in ornare. Vivamus at augue eget arcu. Ornare aenean euismod elementum nisi quis eleifend quam. Est sit amet facilisis magna etiam tempor orci. Arcu non odio euismod lacinia at quis risus. Lectus magna fringilla urna porttitor. Consequat semper viverra nam libero justo laoreet sit amet cursus. Faucibus pulvinar elementum integer enim neque volutpat. Non quam lacus suspendisse faucibus interdum posuere.</p>
                            <p>Tortor consequat id porta nibh venenatis. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Leo vel fringilla est ullamcorper eget. Magna sit amet purus gravida quis. Morbi non arcu risus quis. Lectus urna duis convallis convallis tellus. Erat imperdiet sed euismod nisi porta lorem mollis. Bibendum ut tristique et egestas quis ipsum. Sagittis id consectetur purus ut faucibus pulvinar elementum integer enim. Enim ut sem viverra aliquet eget sit amet tellus cras. Pellentesque habitant morbi tristique senectus et netus. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Mattis rhoncus urna neque viverra. Non consectetur a erat nam at lectus. Quisque id diam vel quam. In fermentum posuere urna nec tincidunt praesent semper. Habitant morbi tristique senectus et netus et malesuada fames ac. Arcu ac tortor dignissim convallis aenean et.</p>
                            <p>Sit amet tellus cras adipiscing. Ullamcorper morbi tincidunt ornare massa eget egestas purus. Id consectetur purus ut faucibus pulvinar elementum integer. Sit amet nisl suscipit adipiscing. Nulla pharetra diam sit amet nisl suscipit. Duis at tellus at urna. Fames ac turpis egestas sed tempus urna et pharetra pharetra. Porta lorem mollis aliquam ut porttitor leo. Sed nisi lacus sed viverra tellus in hac habitasse. Molestie ac feugiat sed lectus vestibulum mattis. Aliquam nulla facilisi cras fermentum odio eu feugiat. Elementum tempus egestas sed sed risus. Aliquam ultrices sagittis orci a scelerisque purus semper.</p>
                            <p>Fames ac turpis egestas maecenas. Lectus quam id leo in. Mauris commodo quis imperdiet massa tincidunt. Eu mi bibendum neque egestas. Nibh praesent tristique magna sit. At volutpat diam ut venenatis tellus in metus vulputate eu. Felis eget nunc lobortis mattis aliquam faucibus. Dui nunc mattis enim ut tellus. Nulla malesuada pellentesque elit eget gravida cum sociis. Pharetra pharetra massa massa ultricies. Quisque egestas diam in arcu. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Nibh tellus molestie nunc non. Turpis nunc eget lorem dolor sed viverra ipsum. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Orci eu lobortis elementum nibh tellus molestie nunc. Elit duis tristique sollicitudin nibh sit amet. Tellus at urna condimentum mattis pellentesque id nibh tortor. Purus viverra accumsan in nisl nisi. Blandit libero volutpat sed cras ornare arcu dui.</p>
                        </div>
                        <ScaleInOut
                            x={-90}
                            durationIn={1}
                            ease="elastic.out"
                            watch
                        >
                            <Button
                                label={locked ? 'Unlock scroll' : 'Lock scroll'}
                                onClick={toggleLocked}
                                className="c-btn"
                            />
                        </ScaleInOut>
                    </div>
                </section>
            </TranslateInOut>
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
            <TranslateInOut
                y={100}
                watch
            >
                <section className="u-spacing--responsive--bottom">
                    <div className="o-container">
                        <div className="o-wysiwyg">
                            <p>Tellus orci ac auctor augue mauris. Turpis tincidunt id aliquet risus feugiat in ante metus. Nulla posuere sollicitudin aliquam ultrices sagittis orci a. Fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque. Elementum sagittis vitae et leo duis ut. Facilisis leo vel fringilla est. Nunc aliquet bibendum enim facilisis gravida. Scelerisque fermentum dui faucibus in ornare. Vivamus at augue eget arcu. Ornare aenean euismod elementum nisi quis eleifend quam. Est sit amet facilisis magna etiam tempor orci. Arcu non odio euismod lacinia at quis risus. Lectus magna fringilla urna porttitor. Consequat semper viverra nam libero justo laoreet sit amet cursus. Faucibus pulvinar elementum integer enim neque volutpat. Non quam lacus suspendisse faucibus interdum posuere.</p>
                            <p>Tortor consequat id porta nibh venenatis. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Leo vel fringilla est ullamcorper eget. Magna sit amet purus gravida quis. Morbi non arcu risus quis. Lectus urna duis convallis convallis tellus. Erat imperdiet sed euismod nisi porta lorem mollis. Bibendum ut tristique et egestas quis ipsum. Sagittis id consectetur purus ut faucibus pulvinar elementum integer enim. Enim ut sem viverra aliquet eget sit amet tellus cras. Pellentesque habitant morbi tristique senectus et netus. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Mattis rhoncus urna neque viverra. Non consectetur a erat nam at lectus. Quisque id diam vel quam. In fermentum posuere urna nec tincidunt praesent semper. Habitant morbi tristique senectus et netus et malesuada fames ac. Arcu ac tortor dignissim convallis aenean et.</p>
                            <p>Sit amet tellus cras adipiscing. Ullamcorper morbi tincidunt ornare massa eget egestas purus. Id consectetur purus ut faucibus pulvinar elementum integer. Sit amet nisl suscipit adipiscing. Nulla pharetra diam sit amet nisl suscipit. Duis at tellus at urna. Fames ac turpis egestas sed tempus urna et pharetra pharetra. Porta lorem mollis aliquam ut porttitor leo. Sed nisi lacus sed viverra tellus in hac habitasse. Molestie ac feugiat sed lectus vestibulum mattis. Aliquam nulla facilisi cras fermentum odio eu feugiat. Elementum tempus egestas sed sed risus. Aliquam ultrices sagittis orci a scelerisque purus semper.</p>
                            <p>Fames ac turpis egestas maecenas. Lectus quam id leo in. Mauris commodo quis imperdiet massa tincidunt. Eu mi bibendum neque egestas. Nibh praesent tristique magna sit. At volutpat diam ut venenatis tellus in metus vulputate eu. Felis eget nunc lobortis mattis aliquam faucibus. Dui nunc mattis enim ut tellus. Nulla malesuada pellentesque elit eget gravida cum sociis. Pharetra pharetra massa massa ultricies. Quisque egestas diam in arcu. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Nibh tellus molestie nunc non. Turpis nunc eget lorem dolor sed viverra ipsum. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Orci eu lobortis elementum nibh tellus molestie nunc. Elit duis tristique sollicitudin nibh sit amet. Tellus at urna condimentum mattis pellentesque id nibh tortor. Purus viverra accumsan in nisl nisi. Blandit libero volutpat sed cras ornare arcu dui.</p>
                        </div>
                    </div>
                </section>
            </TranslateInOut>
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
                            markers
                        >
                                <div style={{ width: '100px', height: '100px', background: 'var(--primary)', borderRadius: '10px' }} />
                        </RotateInOut>
                    </div>
                </div>
            </div>
            <TranslateInOut
                y={100}
                watch
            >
                <section className="u-spacing--responsive--bottom">
                    <div className="o-container">
                        <div className="o-wysiwyg">
                            <p>Tellus orci ac auctor augue mauris. Turpis tincidunt id aliquet risus feugiat in ante metus. Nulla posuere sollicitudin aliquam ultrices sagittis orci a. Fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque. Elementum sagittis vitae et leo duis ut. Facilisis leo vel fringilla est. Nunc aliquet bibendum enim facilisis gravida. Scelerisque fermentum dui faucibus in ornare. Vivamus at augue eget arcu. Ornare aenean euismod elementum nisi quis eleifend quam. Est sit amet facilisis magna etiam tempor orci. Arcu non odio euismod lacinia at quis risus. Lectus magna fringilla urna porttitor. Consequat semper viverra nam libero justo laoreet sit amet cursus. Faucibus pulvinar elementum integer enim neque volutpat. Non quam lacus suspendisse faucibus interdum posuere.</p>
                            <p>Tortor consequat id porta nibh venenatis. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Leo vel fringilla est ullamcorper eget. Magna sit amet purus gravida quis. Morbi non arcu risus quis. Lectus urna duis convallis convallis tellus. Erat imperdiet sed euismod nisi porta lorem mollis. Bibendum ut tristique et egestas quis ipsum. Sagittis id consectetur purus ut faucibus pulvinar elementum integer enim. Enim ut sem viverra aliquet eget sit amet tellus cras. Pellentesque habitant morbi tristique senectus et netus. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Mattis rhoncus urna neque viverra. Non consectetur a erat nam at lectus. Quisque id diam vel quam. In fermentum posuere urna nec tincidunt praesent semper. Habitant morbi tristique senectus et netus et malesuada fames ac. Arcu ac tortor dignissim convallis aenean et.</p>
                            <p>Sit amet tellus cras adipiscing. Ullamcorper morbi tincidunt ornare massa eget egestas purus. Id consectetur purus ut faucibus pulvinar elementum integer. Sit amet nisl suscipit adipiscing. Nulla pharetra diam sit amet nisl suscipit. Duis at tellus at urna. Fames ac turpis egestas sed tempus urna et pharetra pharetra. Porta lorem mollis aliquam ut porttitor leo. Sed nisi lacus sed viverra tellus in hac habitasse. Molestie ac feugiat sed lectus vestibulum mattis. Aliquam nulla facilisi cras fermentum odio eu feugiat. Elementum tempus egestas sed sed risus. Aliquam ultrices sagittis orci a scelerisque purus semper.</p>
                            <p>Fames ac turpis egestas maecenas. Lectus quam id leo in. Mauris commodo quis imperdiet massa tincidunt. Eu mi bibendum neque egestas. Nibh praesent tristique magna sit. At volutpat diam ut venenatis tellus in metus vulputate eu. Felis eget nunc lobortis mattis aliquam faucibus. Dui nunc mattis enim ut tellus. Nulla malesuada pellentesque elit eget gravida cum sociis. Pharetra pharetra massa massa ultricies. Quisque egestas diam in arcu. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Nibh tellus molestie nunc non. Turpis nunc eget lorem dolor sed viverra ipsum. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Orci eu lobortis elementum nibh tellus molestie nunc. Elit duis tristique sollicitudin nibh sit amet. Tellus at urna condimentum mattis pellentesque id nibh tortor. Purus viverra accumsan in nisl nisi. Blandit libero volutpat sed cras ornare arcu dui.</p>
                        </div>
                    </div>
                </section>
            </TranslateInOut>
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
            <section className="u-spacing--responsive--bottom">
                <div className="o-container">
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
                            y={120}
                            watch
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
                            y={120}
                            watch
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
                            y={120}
                            watch
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
                            y={120}
                            watch
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
                            y={120}
                            watch
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
            <TranslateInOut
                y={100}
                watch
            >
                <section className="u-spacing--responsive--bottom">
                    <div className="o-container">
                        <div className="o-wysiwyg">
                            <p>Tellus orci ac auctor augue mauris. Turpis tincidunt id aliquet risus feugiat in ante metus. Nulla posuere sollicitudin aliquam ultrices sagittis orci a. Fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque. Elementum sagittis vitae et leo duis ut. Facilisis leo vel fringilla est. Nunc aliquet bibendum enim facilisis gravida. Scelerisque fermentum dui faucibus in ornare. Vivamus at augue eget arcu. Ornare aenean euismod elementum nisi quis eleifend quam. Est sit amet facilisis magna etiam tempor orci. Arcu non odio euismod lacinia at quis risus. Lectus magna fringilla urna porttitor. Consequat semper viverra nam libero justo laoreet sit amet cursus. Faucibus pulvinar elementum integer enim neque volutpat. Non quam lacus suspendisse faucibus interdum posuere.</p>
                            <p>Tortor consequat id porta nibh venenatis. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Leo vel fringilla est ullamcorper eget. Magna sit amet purus gravida quis. Morbi non arcu risus quis. Lectus urna duis convallis convallis tellus. Erat imperdiet sed euismod nisi porta lorem mollis. Bibendum ut tristique et egestas quis ipsum. Sagittis id consectetur purus ut faucibus pulvinar elementum integer enim. Enim ut sem viverra aliquet eget sit amet tellus cras. Pellentesque habitant morbi tristique senectus et netus. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Mattis rhoncus urna neque viverra. Non consectetur a erat nam at lectus. Quisque id diam vel quam. In fermentum posuere urna nec tincidunt praesent semper. Habitant morbi tristique senectus et netus et malesuada fames ac. Arcu ac tortor dignissim convallis aenean et.</p>
                            <p>Sit amet tellus cras adipiscing. Ullamcorper morbi tincidunt ornare massa eget egestas purus. Id consectetur purus ut faucibus pulvinar elementum integer. Sit amet nisl suscipit adipiscing. Nulla pharetra diam sit amet nisl suscipit. Duis at tellus at urna. Fames ac turpis egestas sed tempus urna et pharetra pharetra. Porta lorem mollis aliquam ut porttitor leo. Sed nisi lacus sed viverra tellus in hac habitasse. Molestie ac feugiat sed lectus vestibulum mattis. Aliquam nulla facilisi cras fermentum odio eu feugiat. Elementum tempus egestas sed sed risus. Aliquam ultrices sagittis orci a scelerisque purus semper.</p>
                            <p>Fames ac turpis egestas maecenas. Lectus quam id leo in. Mauris commodo quis imperdiet massa tincidunt. Eu mi bibendum neque egestas. Nibh praesent tristique magna sit. At volutpat diam ut venenatis tellus in metus vulputate eu. Felis eget nunc lobortis mattis aliquam faucibus. Dui nunc mattis enim ut tellus. Nulla malesuada pellentesque elit eget gravida cum sociis. Pharetra pharetra massa massa ultricies. Quisque egestas diam in arcu. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Nibh tellus molestie nunc non. Turpis nunc eget lorem dolor sed viverra ipsum. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Orci eu lobortis elementum nibh tellus molestie nunc. Elit duis tristique sollicitudin nibh sit amet. Tellus at urna condimentum mattis pellentesque id nibh tortor. Purus viverra accumsan in nisl nisi. Blandit libero volutpat sed cras ornare arcu dui.</p>
                        </div>
                    </div>
                </section>
            </TranslateInOut>
        </>
    )
}