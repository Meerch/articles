import { memo } from 'react'
import cls from './ArticlesListItem.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleView } from '../../model/types/article'
import { Card } from 'shared/ui/Card/Card'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'

interface ArticlesListItemSkeletonProps {
    className?: string
    view: ArticleView
}

export const ArticlesListItemSkeleton = memo((props: ArticlesListItemSkeletonProps) => {
    const { className, view } = props

    if (view === ArticleView.LIST) {
        return (
            <div className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}>
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Skeleton borderRadius='50%' width={30} height={30} />
                        <Skeleton width={150} height={16} className={cls.username}/>
                        <Skeleton width={150} height={16} className={cls.date}/>
                    </div>
                    <Skeleton width={250} height={24} className={cls.title}/>
                    <Skeleton height={200} className={cls.image}/>
                    <div className={cls.footer}>
                        <Skeleton height={36} width={200}/>
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}>
            <Card className={cls.card}>
                <div className={cls.imageWrapper}>
                    <Skeleton width={200} height={200} className={cls.image}/>
                </div>
                <div className={cls.infoWrapper}>
                    <Skeleton width={130} height={16}/>
                </div>
                <Skeleton width={150} height={16} className={cls.title}/>
            </Card>
        </div>
    )
})