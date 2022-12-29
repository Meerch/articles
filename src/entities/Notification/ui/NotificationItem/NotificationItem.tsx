import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './NotificationItem.module.scss'
import { memo } from 'react'
import { Notification } from '../../model/types/Notification'
import { Card, CardTheme } from '@/shared/ui/Card'
import { Text } from '@/shared/ui/Text'

interface NotificationItemProps {
    className?: string
    item: Notification
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props

    const content = (
        <Card
            className={classNames(cls.NotificationItem, {}, [className])}
            theme={CardTheme.OUTLINE}
        >
            <Text title={item.title} text={item.description}/>
        </Card>
    )

    if (item?.href) {
        return (
            <a
                className={cls.link}
                target='_blank'
                rel='noreferrer'
                href={item.href}
            >
                {content}
            </a>
        )
    }

    return content
})