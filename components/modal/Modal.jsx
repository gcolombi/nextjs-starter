import styles from '@/styles/modules/Modal.module.scss';
import { useCallback, useEffect } from 'react';

export default function Modal({
    children,
    showModal,
    setModal,
}) {
    const onKeyDown = useCallback((e) => {
        if (e.key === "Escape") {
            setModal(false);
        }
    }, [setModal]);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onKeyDown]);

    return (
        <>
            {showModal &&
                <section className={styles['m-modal']}>
                    <div
                        className={styles['m-modal__backdrop']}
                        onClick={() => setModal(false)}
                    />
                    {children}
                </section>
            }
        </>
    );
}
