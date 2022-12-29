import { HTMLAttributeAnchorTarget, memo } from 'react'
import cls from './ArticlesListItem.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Article, ArticleBlock, ArticleTextBlock } from '../../model/types/article'
import { Text } from '@/shared/ui/Text'
import { Icon } from '@/shared/ui/Icon'
import EyeIcon from '@/shared/assets/icons/eye.svg'
import { Card } from '@/shared/ui/Card'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import AppLink from '@/shared/ui/AppLink'
import { ArticleBlockType, ArticleView } from '../../model/consts/articleConsts'
import { RoutePath } from '@/shared/const/router'

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
            <div className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}>
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text text={article.user.username} className={cls.username}/>
                        <Text text={article.createdAt} className={cls.date}/>
                    </div>
                    <Text title={article.title} className={cls.title}/>
                    {types}
                    <img src={article.img} alt={article.title} className={cls.image}/>
                    {
                        textBlock &&
                        <ArticleTextBlockComponent block={textBlock} className={cls.textBlock}/>
                    }

                    <div className={cls.footer}>
                        <AppLink
                            target={target}
                            rel={target === '_blank' ? 'noreferrer' : ''}
                            to={`${RoutePath.article_details}${article.id}`}
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
            target={target}
            rel={target === '_blank' ? 'noreferrer noopener' : ''}
            to={`${RoutePath.article_details}${article.id}`}
            className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}
        >
            <Card className={cls.card}>
                <div className={cls.imageWrapper}>
                    <img
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