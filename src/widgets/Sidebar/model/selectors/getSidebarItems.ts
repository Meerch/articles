import { createSelector } from '@reduxjs/toolkit'

import { SidebarItemType } from '../types/sidebar'

import { getUserAuthData } from '@/entities/User'
import AboutIcon from '@/shared/assets/icons/about.svg'
import ArticleIcon from '@/shared/assets/icons/articles.svg'
import MainIcon from '@/shared/assets/icons/home.svg'
import ProfileIcon from '@/shared/assets/icons/profile.svg'
import { RoutePath } from '@/shared/const/router'

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: RoutePath.main,
            text: 'Главная',
            icon: MainIcon
        },
        {
            path: RoutePath.about,
            text: 'Информация',
            icon: AboutIcon
        }
    ]

    if (userData) {
        sidebarItemsList.push({
            path: RoutePath.profile + userData.id,
            text: 'Профиль',
            icon: ProfileIcon,
            authOnly: true
        },
        {
            path: RoutePath.articles,
            text: 'Статьи',
            icon: ArticleIcon,
            authOnly: true
        }
        )
    }

    return sidebarItemsList
})