import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useUnsavedChanges(isDirty) {
    const router = useRouter()

    /**
     * Prompt the user if they try and leave with unsaved changes
     */
    useEffect(() => {
        const warningText = 'You have unsaved changes - are you sure you wish to leave this page?';
        const handleWindowClose = (e) => {
            if (!isDirty) return;
            e.preventDefault();
            return (e.returnValue = warningText);
        };
        const handleBrowseAway = () => {
            if (!isDirty) return;
            if (window.confirm(warningText)) return;
            router.events.emit('routeChangeError');
            throw 'routeChange aborted.';
        };
        window.addEventListener('beforeunload', handleWindowClose);
        router.events.on('routeChangeStart', handleBrowseAway);
        return () => {
            window.removeEventListener('beforeunload', handleWindowClose);
            router.events.off('routeChangeStart', handleBrowseAway);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDirty]);
}