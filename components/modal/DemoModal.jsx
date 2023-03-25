import { useState, useCallback, useMemo } from 'react';
import Modal from './Modal';

export default function useDemoModal() {
    const [showDemoModal, setShowDemoModal] = useState(false);

    const DemoModalCallback = useCallback(() => {
        return (
            <DemoModal
                showDemoModal={showDemoModal}
                setShowDemoModal={setShowDemoModal}
            />
        );
    }, [showDemoModal, setShowDemoModal]);

    return useMemo(() => ({
        setShowDemoModal, DemoModalCallback
    }), [setShowDemoModal, DemoModalCallback]);
}

function DemoModal({
    showDemoModal,
    setShowDemoModal,
}) {
    return (
        <Modal showModal={showDemoModal} setShowModal={setShowDemoModal}>
            <div className="c-demoModal">
                <div className="c-demoModal__inner">
                    <h2>Demo modal</h2>
                    <div className="o-wysiwyg">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis quaerat corporis ratione blanditiis omnis neque! Nihil rem, tenetur unde error labore, dolores assumenda cupiditate voluptatem aliquid iste ut, natus perspiciatis!</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};