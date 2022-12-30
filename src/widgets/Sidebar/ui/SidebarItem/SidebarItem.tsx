import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import { SidebarItemType } from '../../model/types/sidebar'

import cls from './SidebarItem.module.scss'

import { getUserAuthData } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLinkTheme, AppLink } from '@/shared/ui/AppLink'

interface SidebarItemProps {
    item: SidebarItemType
    collapsed: boolean
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const isAuth = useSelector(getUserAuthData)

    if (!isAuth && item.authOnly) {
        return null
    }

    return (
        <AppLink
            className={classNames(cls.item, {
                [cls.collapsed]: collapsed
            })}
            theme={AppLinkTheme.SECONDARY}
            to={item.path}
        >
            <item.icon className={cls.icon}/>
            <span className={cls.link}>{item.text}</span>
        </AppLink>
    )
})
