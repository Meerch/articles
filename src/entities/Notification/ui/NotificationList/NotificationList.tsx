import { classNames } from '@/shared/lib/classNames/classNames'
import { memo } from 'react'
import { getNotificationList } from '../../api/notificationsApi'
import { VStack } from '@/shared/ui/Stack'
import { NotificationItem } from '../NotificationItem/NotificationItem'
import { Skeleton } from '@/shared/ui/Skeleton'

interface NotificationListProps {
    className?: string
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props
    const { data, isLoading } = getNotificationList(null, {
        pollingInterval: 5000
    })

    if (isLoading) {
        return (
            <VStack
                className={className}
                gap='16'
                max
            >
                <Skeleton width='100%' borderRadius='8px' height='80px'/>
                <Skeleton width='100%' borderRadius='8px' height='80px'/>
                <Skeleton width='100%' borderRadius='8px' height='80px'/>
            </VStack>
        )
    }

    return (
        <VStack
            className={className}
            gap='16'
            max
        >
            {data?.map(item => (
                <NotificationItem key={item.id} item={item}/>
            ))}
        </VStack>
    )
})