import React, { memo, useCallback, useState } from 'react'
import cls from './NotificationButton.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { Icon } from '@/shared/ui/Icon/Icon'
import NotificationIcon from '@/shared/assets/icons/notification.svg'
import { NotificationList } from '@/entities/Notification'
import { Popover } from '@/shared/ui/Popups'
import { detectDevice } from '@/shared/lib/detectDevice/detectDevice'
import { Drawer } from '@/shared/ui/Drawer/Drawer'
import { AnimationProvider } from '@/shared/lib/components/AnimationProvider'

interface NotificationButtonProps {
    className?: string
}

export const NotificationButton = memo(({ className }: NotificationButtonProps) => {
    const isMobile = detectDevice()
    const [isOpen, setIsOpen] = useState(false)

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true)
    }, [])

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false)
    }, [])

    const trigger = (
        <Button onClick={onOpenDrawer} className={cls.notification} theme={ButtonTheme.CLEAR}>
            <Icon inverted Svg={NotificationIcon}/>
        </Button>
    )

    return (
        <div>
            {
                isMobile
                    ? <>
                        {trigger}
                        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                            <NotificationList />
                        </Drawer>
                    </>
                    : <Popover
                        className={classNames(cls.NotificationButton, {}, [className])}
                        trigger={trigger}
                        direction='bottom left'
                    >
                        <NotificationList className={cls.notifications}/>
                    </Popover>
            }
        </div>
    )
})