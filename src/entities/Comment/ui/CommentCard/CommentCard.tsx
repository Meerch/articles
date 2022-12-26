import { memo } from 'react'
import cls from './CommentCard.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Comment } from '../../model/types/comment'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { Text } from '@/shared/ui/Text/Text'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { AppLink } from '@/shared/ui/AppLink'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { VStack } from '@/shared/ui/Stack'

interface CommentCardProps {
    className?: string
    comment?: Comment
    isLoading?: boolean
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props

    if (isLoading) {
        return (
            <VStack max gap='8' className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
                <div className={cls.header}>
                    <Skeleton width={30} height={30} borderRadius='50%'/>
                    <Skeleton height={16} width={100} className={cls.username}/>
                </div>

                <Skeleton width='100%' height={50} className={cls.text}/>
            </VStack>
        )
    }

    if (!comment) {
        return null
    }

    return (
        <VStack max gap='8' className={classNames(cls.CommentCard, {}, [className])}>
            <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={cls.header}>
                {comment.user.avatar && <Avatar src={comment.user.avatar} size={30}/>}
                <Text className={cls.username} title={comment.user.username}/>
            </AppLink>

            <Text className={cls.text} text={comment.text}/>
        </VStack>
    )
})