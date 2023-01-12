import { HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ArticleBlockType, ArticleView } from '../../model/consts/articleConsts'
import { Article, ArticleBlock, ArticleTextBlock } from '../../model/types/article'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import cls from './ArticlesListItem.module.scss'
import EyeIcon from '@/shared/assets/icons/eye.svg'
import { getRouteArticleDetails } from '@/shared/const/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '@/shared/ui/AppLink'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Icon } from '@/shared/ui/Icon'
import { Text } from '@/shared/ui/Text'
import { AppImage } from '@/shared/ui/AppImage'
import { Skeleton } from '@/shared/ui/Skeleton'

interface ArticlesListItemProps {
    className?: string
    article: Article
    view: ArticleView
    target?: HTMLAttributeAnchorTarget
}

export const ArticlesListItem = memo((props: ArticlesListItemProps) => {
    const { className, article, view, target } = props
    const { t } = useTranslation()

    const types = <Text text={article.type.join(', ')} className={cls.types}/>
    const views = (
        <>
            <Text text={String(article.views)} className={cls.views}/>
            <Icon Svg={EyeIcon}/>
        </>
    )

    if (view === ArticleView.LIST) {
        const textBlock = article.blocks.find((block: ArticleBlock) =>
            block.type === ArticleBlockType.TEXT
        ) as ArticleTextBlock

        return (
            <div
                data-testid='ArticlesListItem'
                className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}
            >
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text text={article.user.username} className={cls.username}/>
                        <Text text={article.createdAt} className={cls.date}/>
                    </div>
                    <Text title={article.title} className={cls.title}/>
                    {types}
                    <AppImage
                        fallback={<Skeleton width='100%' height={250}/>}
                        src={article.img}
                        alt={article.title}
                        className={cls.image}
                    />
                    {
                        textBlock &&
                        <ArticleTextBlockComponent block={textBlock} className={cls.textBlock}/>
                    }

                    <div className={cls.footer}>
                        <AppLink
                            target={target}
                            rel={target === '_blank' ? 'noreferrer' : ''}
                            to={getRouteArticleDetails(article.id)}
                        >
                            <Button>
                                {t('Читать далее...')}
                            </Button>
                        </AppLink>
                        {views}
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <AppLink
            data-testid='ArticlesListItem'
            target={target}
            rel={target === '_blank' ? 'noreferrer noopener' : ''}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}
        >
            <Card className={cls.card}>
                <div className={cls.imageWrapper}>
                    <AppImage
                        fallback={<Skeleton width={200} height={200}/>}
                        src={article.img}
                        alt={article.title}
                        className={cls.image}
                    />
                    <Text text={article.createdAt} className={cls.date}/>
                </div>
                <div className={cls.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={cls.title}/>
            </Card>
        </AppLink>
    )
})