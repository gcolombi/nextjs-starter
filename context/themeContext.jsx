import { createContext, useContext } from 'react';

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
    const [theme, setTheme] = useState(() => getThemeStoredValue(storageKey, defaultTheme));
    const [resolvedTheme, setResolvedTheme] = useState(() => getThemeStoredValue(storageKey));
    const attrs = themes;

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