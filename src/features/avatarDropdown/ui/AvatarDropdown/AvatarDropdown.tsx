import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { isUserAdmin, isUserManager, getUserAuthData, userActions } from '@/entities/User'
import { Avatar } from '@/shared/ui/Avatar'
import { Dropdown } from '@/shared/ui/Popups'
import { getRouteAdmin, getRouteProfile } from '@/shared/const/router'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

interface avatarDropdownProps {
    className?: string
}

export const AvatarDropdown = memo(({ className }: avatarDropdownProps) => {
    const { t } = useTranslation()
    const authData = useSelector(getUserAuthData)

    const isAdmin = useSelector(isUserAdmin)
    const isManager = useSelector(isUserManager)
    const dispatch = useAppDispatch()

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
                        href: getRouteAdmin()
                    }]
                    : []
                ),
                {
                    content: t('Профиль'),
                    href: getRouteProfile(authData.id)
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