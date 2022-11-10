import { useContext } from 'react'
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext'

interface UseThemeResult {
    theme: Theme
    toggleTheme: () => void
}

export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext)

    const toggleTheme = () => {
        let newTheme: Theme

        if (theme === Theme.DARK) {
            newTheme = Theme.LIGHT
        } else if (theme === Theme.LIGHT) {
            newTheme = Theme.ORANGE
        } else if (theme === Theme.ORANGE) {
            newTheme = Theme.DARK
        } else {
            newTheme = Theme.LIGHT
        }

        setTheme?.(newTheme)
        document.body.className = newTheme
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
    }

    return {
        theme: theme ?? Theme.LIGHT,
        toggleTheme
    }
}