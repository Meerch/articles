import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { Dropdown } from '@/shared/ui/Popups'
import { useDispatch, useSelector } from 'react-redux'
import { isUserAdmin, isUserManager, getUserAuthData, userActions } from '@/entities/User'

interface avatarDropdownProps {
    className?: string
}

export const AvatarDropdown = memo(({ className }: avatarDropdownProps) => {
    const { t } = useTranslation()
    const authData = useSelector(getUserAuthData)

    const isAdmin = useSelector(isUserAdmin)
    const isManager = useSelector(isUserManager)
    const dispatch = useDispatch()
    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    const isAdminAvailable = isAdmin || isManager

    if (!authData) {
        return null
    }

    return (
        <Dropdown
            className={className}
            direction='bottom left'
            items={[
                ...(isAdminAvailable
                    ? [{
                        content: t('Админка'),
                        href: RoutePath.admin
                    }]
                    : []
                ),
                {
                    content: t('Профиль'),
                    href: RoutePath.profile + authData.id
                },
                {
                    content: t('Выйти'),
                    onClick: onLogout
                }
            ]}
            trigger={<Avatar size={30} src={authData.avatar}/>}
        />
    )
})