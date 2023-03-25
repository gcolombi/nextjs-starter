import { useCallback, useEffect } from 'react';

export default function Modal({
    children,
    showModal,
    setShowModal,
}) {
    const onKeyDown = useCallback((e) => {
        if (e.key === "Escape") {
            setShowModal(false);
        }
    }, [setShowModal]);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onKeyDown]);

    return (
        <>
            {showModal &&
                <section className="m-modal">
                    <div
                        className="m-modal__backdrop"
                        onClick={() => setShowModal(false)}
                    />
                    {children}
                </section>
            }
        </>
    );
}
