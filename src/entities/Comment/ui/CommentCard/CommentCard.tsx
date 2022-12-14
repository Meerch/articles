import { memo } from 'react'
import { Comment } from '../../model/types/comment'
import cls from './CommentCard.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '@/shared/ui/AppLink'
import { Avatar } from '@/shared/ui/Avatar'
import { Skeleton } from '@/shared/ui/Skeleton'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'
import { getRouteProfile } from '@/shared/const/router'

interface CommentCardProps {
    className?: string
    comment?: Comment
    isLoading?: boolean
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props

    if (isLoading) {
        return (
            <VStack
                data-testid='CommentCard.Loading'
                className={classNames(cls.CommentCard, {}, [className, cls.loading])}
                gap='8'
                max
            >
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
        <VStack
            data-testid='CommentCard.Content'
            className={classNames(cls.CommentCard, {}, [className])}
            gap='8'
            max
        >
            <AppLink to={getRouteProfile(comment.user.id)} className={cls.header}>
                {comment.user.avatar && <Avatar src={comment.user.avatar} size={30}/>}
                <Text className={cls.username} title={comment.user.username}/>
            </AppLink>

            <Text className={cls.text} text={comment.text}/>
        </VStack>
    )
})