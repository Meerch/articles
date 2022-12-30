import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { ArticleBlockType } from '../../model/consts/articleConsts'
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading
} from '../../model/selectors/articleDetailsSelectors'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import { ArticleBlock } from '../../model/types/article'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'

import cls from './ArticleDetails.module.scss'

import EyeIcon from '@/shared/assets/icons/eye.svg'
import { classNames } from '@/shared/lib/classNames/classNames'

import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Skeleton } from '@/shared/ui/Skeleton'
import { Text, TextAlign, TextSize } from '@/shared/ui/Text'

import { Avatar } from '@/shared/ui/Avatar'

import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'

import CalendarIcon from '@/shared/assets/icons/calendar.svg'
import { Icon } from '@/shared/ui/Icon'
import useInitialEffect from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { HStack, VStack } from '@/shared/ui/Stack'

interface ArticleDetailsProps {
    className?: string
    id: string
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer
}

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
    const { t } = useTranslation()
    const isLoading = useSelector(getArticleDetailsIsLoading)
    const error = useSelector(getArticleDetailsError)
    const article = useSelector(getArticleDetailsData)
    const dispatch = useAppDispatch()

    console.log('test article', article)

    useInitialEffect(() => {
        console.log('CALL ID', id)
        console.log('CALL ID', id)
        void dispatch(fetchArticleById(id))
    })

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
            case ArticleBlockType.TEXT:
                return <ArticleTextBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            case ArticleBlockType.CODE:
                return <ArticleCodeBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            case ArticleBlockType.IMAGE:
                return <ArticleImageBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            default:
                return null
        }
    }, [])

    let content

    if (isLoading) {
        content = <>
            <Skeleton className={cls.avatar} width={200} height={200} borderRadius='50%'/>
            <Skeleton className={cls.title} width={300} height={32} />
            <Skeleton className={cls.skeleton} width={600} height={24} />
            <Skeleton className={cls.skeleton} width={'100%'} height={200} />
            <Skeleton className={cls.skeleton} width={'100%'} height={200} />
        </>
    } else if (error) {
        content = <Text
            title={t('Произошла ошибка при загрузке статьи')}
            align={TextAlign.CENTER}
        />
    } else {
        content = <>
            <HStack justify='center' max className={cls.avatarWrapper}>
                <Avatar
                    size={200}
                    src={article?.img}
                    className={cls.avatar}
                />
            </HStack>
            <VStack gap='4' max>
                <Text
                    title={article?.title}
                    text={article?.subtitle}
                    size={TextSize.SIZE_L}
                />
                <HStack gap='8' className={cls.articleInfo}>
                    <Icon Svg={EyeIcon} className={cls.icon}/>
                    <Text text={String(article?.views)}/>
                </HStack>
                <HStack gap='8' className={cls.articleInfo}>
                    <Icon Svg={CalendarIcon} className={cls.icon}/>
                    <Text text={article?.createdAt}/>
                </HStack>
            </VStack>
            {article?.blocks.map(renderBlock)}
        </>
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack max gap='16' className={classNames(cls.ArticleDetails, {}, [className])}>
                {content}
            </VStack>
        </DynamicModuleLoader>
    )
})