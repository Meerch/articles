import React, { FC, useState } from 'react'
import cls from './Sidebar.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { LangSwitcher } from 'widgets/LangSwitcher'
import { useTranslation } from 'react-i18next'

interface SidebarProps {
    className?: string
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
    const [collapsed, setCollapsed] = useState(false)
    const { t } = useTranslation()

    const onToggle = () => {
        setCollapsed(prev => !prev)
    }

    return (
        <div data-testid='sidebar' className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
            <button data-testid='sidebar-toggle' onClick={onToggle}>
                {t('toggle')}
            </button>

            <div className={cls.switchers}>
                <ThemeSwitcher/>
                <LangSwitcher className={cls.lang}/>
            </div>
        </div>
    )
}
