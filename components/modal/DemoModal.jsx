import styles from '@/styles/modules/DemoModal.module.scss';
import gsap from 'gsap';
import { useState, useCallback, useMemo, useRef } from 'react';
import useLockedScroll from '@/hooks/useLockedScroll';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import Modal from './Modal';

export function useDemoModal() {
    const [showDemoModal, setShowDemoModal] = useState(false);
    const [locked, setLocked] = useLockedScroll(false);

    const setModal = (state) => {
        setShowDemoModal(state);
        setLocked(state);
    }

    // const DemoModalCallback = useCallback(() => {

    //     const [isReady, setIsReady] = useState(false);

    //     useIsomorphicLayoutEffect(() => {

    //         const ctx = gsap.context(() => {

    //         if (showDemoModal) {
    //             gsap
    //             .timeline()
    //             .to(modalRef.current, {
    //                 opacity: 1,
    //                 pointerEvents: 'all',
    //                 duration: 1,
    //                 ease: 'power4.out'
    //             }).then(() => {
    //                 console.log('open');
    //                 setIsReady(true);
    //             });

    //         } else {
    //             gsap
    //             .timeline()
    //             .to(modalRef.current, {
    //                 opacity: 0,
    //                 pointerEvents: 'none',
    //                 duration: 1,
    //                 ease: 'power4.out'
    //             }).then(() => {
    //                 console.log('close');
    //                 setIsReady(false);
    //             });
    //         }

    //         }, modalRef);

    //         return () => ctx.revert();

    //     }, [showDemoModal]);


    //     return (
    //         <>
    //             {
    //                 isReady &&
    //                 <DemoModal
    //                     showDemoModal={showDemoModal}
    //                     setModal={setModal}
    //                 />
    //             }
    //         </>
    //     );
    // }, [showDemoModal, setModal]);

    // return useMemo(() => ({
    //     setRef, setModal, showDemoModal
    //     // setModal, DemoModal: DemoModalCallback
    // // }), [setModal, DemoModalCallback]);
    // }), [setModal]);

    return [
        // setRef,
        setModal,
        showDemoModal
    ]
}

export default function DemoModal({
    showDemoModal,
    setModal
}) {
    const modalRef = useRef();
    const timeline = useRef();

    useIsomorphicLayoutEffect(() => {
        console.log('first render');
        const ctx = gsap.context(() => {
            timeline.current = gsap
            .timeline()
            .to(modalRef.current, {
                opacity: 1,
                pointerEvents: 'all',
                duration: .35,
                ease: 'power4.out'
            })
            .reverse();
        }, modalRef);

        return () => ctx.revert();
    }, []);

    useIsomorphicLayoutEffect(() => {
        console.log(showDemoModal);
        timeline.current.reversed(!showDemoModal);
    }, [showDemoModal]);

    return (
        <Modal showModal={showDemoModal} setModal={setModal} ref={modalRef}>
            <div className={styles['c-demoModal']}>
                <button
                    className={styles['c-demoModal__close']}
                    onClick={() => setModal(false) }
                />
                <div className={styles['c-demoModal__inner']}>
                    <h2>Demo modal</h2>
                    <div className="o-wysiwyg">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis quaerat corporis ratione blanditiis omnis neque! Nihil rem, tenetur unde error labore, dolores assumenda cupiditate voluptatem aliquid iste ut, natus perspiciatis!</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};