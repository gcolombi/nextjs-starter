import { createContext, useContext } from 'react';

const colorSchemes = ['light', 'dark'];
const defaultThemes = ['light', 'dark'];
const MEDIA = '(prefers-color-scheme: dark)';
const isServer = typeof window === 'undefined';
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

const Theme = () => {

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