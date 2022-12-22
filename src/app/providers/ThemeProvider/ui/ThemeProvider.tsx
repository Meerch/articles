import { FC, ReactNode, useMemo, useState } from 'react'
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext'

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT

interface ThemeProviderProps {
    initialTheme?: Theme
    children: ReactNode
}

export const ThemeProvider = (props: ThemeProviderProps) => {
    const { children, initialTheme } = props
    const [theme, setTheme] = useState<Theme>(initialTheme ?? defaultTheme)

    const defaultProps = useMemo(() => {
        document.body.className = theme
        return {
            theme,
            setTheme
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    )
}