import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const colorSchemes = ['light', 'dark'];
const defaultThemes = ['light', 'dark'];
const MEDIA = '(prefers-color-scheme: dark)';
const ThemeContext = createContext(undefined);
const defaultContext = {
    setTheme: () => {},
    themes: []
};

export function ThemeContextProvider(props) {
    const context = useContext(ThemeContext);

    /* Ignore nested context providers, just passthrough children */
    if (context)
        return <>{props.children}</>;
    return <Theme {...props} />;
}

const Theme = ({
    disableTransitionOnChange = false,
    enableSystem = true,
    enableColorScheme = true,
    storageKey = 'theme',
    themes = defaultThemes,
    defaultTheme = enableSystem ? 'system' : 'light',
    attribute = 'data-theme',
    children
}) => {
    const [theme, setThemeState] = useState(() => getThemeStoredValue(storageKey, defaultTheme));
    const [resolvedTheme, setResolvedTheme] = useState(() => getThemeStoredValue(storageKey));
    const attrs = themes;

    const applyTheme = useCallback((theme) => {
        let resolved = theme;
        if (!resolved) {
            return;
        }

        /* If theme is system, resolve it before setting theme */
        if (theme === 'system' && enableSystem) {
            resolved = getSystemTheme();
        }

        const name = resolved;
        const enable = disableTransitionOnChange ? disableTransition() : null;

        if (attribute === 'class') {
            document.documentElement.classList.remove(...attrs);

            if (name)
                document.documentElement.classList.add(name);
        } else {
            if (name) {
                document.documentElement.setAttribute(attribute, name);
            } else {
                document.documentElement.removeAttribute(attribute);
            }
        }

        if (enableColorScheme) {
            const fallback = colorSchemes.includes(defaultTheme) ? defaultTheme : null;
            const colorScheme = colorSchemes.includes(resolved) ? resolved : fallback;
            document.documentElement.style.colorScheme = colorScheme;
        }

        enable?.();
    }, [])

    const setTheme = useCallback((theme) => {

        /* Save state */
        setThemeState(theme);

        /* Save to local storage */
        try {
            localStorage.setItem(storageKey, theme);
        } catch (error) {
            console.warn(`Error setting localStorage key "${storageKey}":`, error);
        }
    }, []);

    const handleMediaQuery = useCallback((event) => {
        const resolved = getSystemTheme(event);
        setResolvedTheme(resolved);

        if (theme === 'system' && enableSystem) {
            applyTheme('system');
        }
    },[theme]);

    /* Always listen to System preference */
    useEffect(() => {
        const media = window.matchMedia(MEDIA);

        /* Intentionally use deprecated listener methods to support iOS & old browsers */
        media.addListener(handleMediaQuery);

        handleMediaQuery(media);

        return () => media.removeListener(handleMediaQuery);
    }, [handleMediaQuery])

    return (
        <ThemeContext.Provider
            value={{}}
        >
            <ThemeScript
                {
                    ...{

                    }

                }
            />
        </ThemeContext.Provider>
    )
}

const ThemeScript = () => {

}

export default function useThemeContext() {
    return useContext(ThemeContext) ?? defaultContext;
}

/**
 * Helpers
 */
const getThemeStoredValue = (key, fallback = null) => {
    if (typeof window === 'undefined') {
        return undefined;
    }
    let theme;
    try {
        theme = localStorage.getItem(key) || undefined;
    } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
    }
    return theme || fallback;
}

const disableTransition = () => {
    const style = document.createElement('style');
    style.appendChild(
        document.createTextNode(
            `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
        )
    )
    document.head.appendChild(style);

    return () => {
        /* Force restyle */
        (() => window.getComputedStyle(document.body))();

        /* Wait for next tick before removing */
        setTimeout(() => {
            document.head.removeChild(style)
        }, 1)
    }
}

const getSystemTheme = (event) => {
    if (!event) {
        event = window.matchMedia(MEDIA);
    }
    const isDark = event.matches;
    return isDark ? 'dark' : 'light';
}