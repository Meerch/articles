import React from 'react'
import AboutIcon from 'shared/assets/icons/about.svg'
import MainIcon from 'shared/assets/icons/home.svg'
import ProfileIcon from 'shared/assets/icons/profile.svg'
import ArticleIcon from 'shared/assets/icons/articles.svg'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'

export interface SidebarItemType {
    path: string
    text: string
    icon: React.VFC<React.SVGProps<SVGSVGElement>>
    authOnly?: boolean
}

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: RoutePath.main,
        text: 'Главная',
        icon: MainIcon
    },
    {
        path: RoutePath.about,
        text: 'Информация',
        icon: AboutIcon
    },
    {
        path: RoutePath.profile,
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
]