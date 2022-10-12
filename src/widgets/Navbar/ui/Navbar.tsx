import React, { FC } from 'react'
import cls from './Navbar.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink } from 'shared/ui/AppLink'
import { AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { useTranslation } from 'react-i18next'

interface NavbarProps {
    className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
    const { t } = useTranslation()

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.links}>
                <AppLink theme={AppLinkTheme.SECONDARY} to='/' className={cls.mainLink}>{t('Главная')}</AppLink>
                <AppLink theme={AppLinkTheme.SECONDARY} to='/about'>{t('Информация')}</AppLink>
            </div>
        </div>
    )
}
