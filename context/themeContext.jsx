import { createContext, memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const colorSchemes = ['light', 'dark'];
const defaultThemes = ['light', 'dark'];
const MEDIA = '(prefers-color-scheme: dark)';
const ThemeContext = createContext(undefined);
const defaultContext = {
    setTheme: () => {},
    themes: []
};

export default function useThemeContext() {
    return useContext(ThemeContext) ?? defaultContext;
}

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
        const d = document.documentElement;

        if (attribute === 'class') {
            d.classList.remove(...attrs);

            if (name)
                d.classList.add(name);
        } else {
            if (name) {
                d.setAttribute(attribute, name);
            } else {
                d.removeAttribute(attribute);
            }
        }

        if (enableColorScheme) {
            const fallback = colorSchemes.includes(defaultTheme) ? defaultTheme : null;
            const colorScheme = colorSchemes.includes(resolved) ? resolved : fallback;
            d.style.colorScheme = colorScheme;
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
    }, [handleMediaQuery]);

    /* Local storage event handling */
    useEffect(() => {
        const handleStorage = (event) => {
            if (event.key !== storageKey) {
                return;
            }

            /* If default theme set, use it if localstorage === null (happens on local storage manual deletion) */
            const theme = event.newValue || defaultTheme;
            setTheme(theme);
        }

        window.addEventListener('storage', handleStorage);

        return () => window.removeEventListener('storage', handleStorage);
    }, [setTheme]);

    /* Whenever theme changes, apply it */
    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const providerValue = useMemo(() => ({
        theme,
        setTheme,
        resolvedTheme: theme === 'system' ? resolvedTheme : theme,
        themes: enableSystem ? [...themes, 'system'] : themes,
        systemTheme: enableSystem ? resolvedTheme : undefined,
    }), [theme, setTheme, resolvedTheme, enableSystem, themes]);

    return (
        <ThemeContext.Provider
            value={providerValue}
        >
            <ThemeScript
                {...{
                    disableTransitionOnChange,
                    enableSystem,
                    enableColorScheme,
                    storageKey,
                    themes,
                    defaultTheme,
                    attribute,
                    children,
                    attrs
                }}
            />
            {children}
        </ThemeContext.Provider>
    )
}

const ThemeScript = memo(({
    storageKey,
    attribute,
    enableSystem,
    enableColorScheme,
    defaultTheme,
    attrs
}) => {
    const defaultSystem = defaultTheme === 'system';

    /* Code-golfing the amount of characters in the script */
    const optimization = (() => {
        if (attribute === 'class') {
            const removeClasses = `c.remove(${attrs.map((t) => `'${t}'`).join(',')})`;

            return `var d=document.documentElement,c=d.classList;${removeClasses};`;
        } else {
            return `var d=document.documentElement,n='${attribute}',s='setAttribute';`;
        }
    })();

    const fallbackColorScheme = (() => {
        if (!enableColorScheme) {
            return '';
        }

        const fallback = colorSchemes.includes(defaultTheme) ? defaultTheme : null;

        if (fallback) {
            return `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${defaultTheme}'`;
        } else {
            return `if(e==='light'||e==='dark')d.style.colorScheme=e`;
        }
    })();

    const updateDOM = (name, literal = false, setColorScheme = true) => {
        const resolvedName = name;
        const val = literal ? name + `|| ''` : `'${resolvedName}'`;
        let text = '';

        /**
         * Much faster to set colorScheme alongside HTML attribute/class
         * as it only incurs 1 style recalculation rather than 2
         * This can save over 250ms of work for pages with big DOM
         */
        if (enableColorScheme && setColorScheme && !literal && colorSchemes.includes(name)) {
            text += `d.style.colorScheme = '${name}';`;
        }

        if (attribute === 'class') {
            if (literal || resolvedName) {
                text += `c.add(${val})`;
            } else {
                text += `null`;
            }
        } else {
            if (resolvedName) {
                text += `d[s](n,${val})`;
            }
        }

        return text;
    }

    const scriptSrc = (() => {
        if (enableSystem) {
            return `!function(){try{${optimization}var e=localStorage.getItem('${storageKey}');if('system'===e||(!e&&${defaultSystem})){var t='${MEDIA}',m=window.matchMedia(t);if(m.media!==t||m.matches){${updateDOM(
                'dark'
            )}}else{${updateDOM('light')}}}else if(e){${
                ''
            }${updateDOM('e', true)}}${
                !defaultSystem ? `else{` + updateDOM(defaultTheme, false, false) + '}' : ''
            }${fallbackColorScheme}}catch(e){}}()`
        }

        return `!function(){try{${optimization}var e=localStorage.getItem('${storageKey}');if(e){${
            ''
        }${updateDOM('e', true)}}else{${updateDOM(
            defaultTheme,
            false,
            false
        )};}${fallbackColorScheme}}catch(t){}}();`;
    })();

      return <script dangerouslySetInnerHTML={{ __html: scriptSrc }} />

    /* Never re-render this component */
},() => true);

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