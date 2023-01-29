import { createContext, useContext } from 'react';

const ThemeContext = createContext(undefined);

export function ThemeContextProvider({ children }) {

}

export default function useThemeContext() {
    return useContext(ThemeContext);
}