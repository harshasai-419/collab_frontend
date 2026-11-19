import React, { useState, useEffect, createContext } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
    // Check localStorage for a saved theme, otherwise check system preference
    const getInitialTheme = () => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "light" || storedTheme === "dark") {
            return storedTheme;
        }
        // Detect system preference
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
        return "light";
    };

    const [theme, setTheme] = useState(getInitialTheme);

    // Apply theme to the body and update localStorage
    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;