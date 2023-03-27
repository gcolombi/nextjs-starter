import styles from '@/styles/modules/DemoModal.module.scss';
import gsap from 'gsap';
import { useState, useCallback, useMemo, useRef } from 'react';
import useLockedScroll from '@/hooks/useLockedScroll';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import Modal from './Modal';

export default function useDemoModal() {
    const [showDemoModal, setShowDemoModal] = useState(false);
    const [locked, setLocked] = useLockedScroll(false);

    const setModal = (state) => {
        setShowDemoModal(state);
        setLocked(state);
    }

    const DemoModalCallback = useCallback(() => {
        return (
            <DemoModal
                showDemoModal={showDemoModal}
                setModal={setModal}
            />
        );
    }, [showDemoModal, setModal]);

    return useMemo(() => ({
        setModal, DemoModal: DemoModalCallback
    }), [setModal, DemoModalCallback]);
}

function DemoModal({
    showDemoModal,
    setModal
}) {
    const modalRef = useRef();
    const timeline = useRef();

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            timeline.current = gsap
            .timeline({
                defaults: {
                    ease: 'power4.out'
                }
            })
            .to(modalRef.current, {
                opacity: 1,
                pointerEvents: 'all',
                duration: 0.35
            })
            .to('[data-modal]', {
                opacity: 1,
                scaleY: 0.01,
                x: 1,
                duration: 0.25
            })
            .to('[data-modal]', {
                scaleY: 1,
                duration: 0.35
            })
            .to('[data-modal-content]', {
                opacity: 1,
                duration: 0.35
            })
            .to('[data-modal-close]', {
                opacity: 1,
                scale: 1,
                duration: 0.2
            })
            .reverse();
        }, modalRef);

        return () => ctx.revert();
    }, []);

    useIsomorphicLayoutEffect(() => {
        timeline.current.reversed(!showDemoModal);
    }, [showDemoModal]);

    return (
        <Modal showModal={showDemoModal} setModal={setModal} ref={modalRef}>
            <div className={styles['c-demoModal']} data-modal>
                <button
                    className={styles['c-demoModal__close']}
                    onClick={() => setModal(false) }
                    data-modal-close
                />
                <div className={styles['c-demoModal__inner']} data-modal-content>
                    <h2>Demo modal</h2>
                    <div className="o-wysiwyg">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis quaerat corporis ratione blanditiis omnis neque! Nihil rem, tenetur unde error labore, dolores assumenda cupiditate voluptatem aliquid iste ut, natus perspiciatis!</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};