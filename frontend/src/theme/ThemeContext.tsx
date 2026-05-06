import { createContext, useContext, useState } from "react";

export type ThemeType = "dark" | "light" | "shayarify";

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }:any) => {
    const [theme, setTheme] = useState<ThemeType>("shayarify");

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);