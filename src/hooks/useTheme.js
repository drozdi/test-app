import React, { useEffect, createContext, useState, useContext } from 'react';
const StorageKey = 'features-color-theme';
const supportedThemes = {
    light: 'light',
    dark: 'dark'
};


const ThemeContext = createContext(undefined);
const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error(
            'You can use "useTheme" hook only within a <ThemeProvider> component.'
        );
    }
    return context;
};

const getTheme = () => {
    let theme = localStorage.getItem(StorageKey);
    if (!theme) {
        localStorage.setItem(StorageKey, 'light');
        theme = 'light';
    }
    return theme;
};

const toggleTheme = () => {
    if (theme === 'dark') {
        setTheme('light');
    } else {
        setTheme('dark');
    }
}

export default (defTheme = 'dark') => {
    const [theme, setTheme] = useState(defTheme);

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    }

    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        if (localTheme) {
            setTheme(localTheme);
        }
    }, []);

    return {
        theme,
        toggleTheme
    };
}


const Theme = (props) => {
    const [theme, setTheme] = useState(getTheme);

    useEffect(() => {
        localStorage.setItem(StorageKey, theme);
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                supportedThemes,
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    );
};
Theme.SimpleToggler = function SimpleToggler() {
    const { theme, setTheme } = useTheme();
    const handleSwitchTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    return (
        <div className={Styles.simpleToggler} onClick={handleSwitchTheme}>
            <div className={Styles.ball} data-theme={theme} />
        </div>
    );
};