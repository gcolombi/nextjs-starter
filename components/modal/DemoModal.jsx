import styles from '@/styles/modules/DemoModal.module.scss';
import { useState, useCallback, useMemo } from 'react';
import useLockedScroll from '@/hooks/useLockedScroll';
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
    return (
        <Modal showModal={showDemoModal} setModal={setModal}>
            <div className={styles['c-demoModal']}>
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