import { memo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchArticlesNextPage } from '../../model/services/fetchArticlesNextPage/fetchArticlesNextPage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import { articlesPageReducer } from '../../model/slices/ArticlesPageSlice'
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'
import cls from './ArticlesPage.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import useInitialEffect from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Page } from '@/widgets/Page'

interface ArticlesPageProps {
    className?: string
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams()

    useInitialEffect(() => {
        void dispatch(initArticlesPage(searchParams))
    })

    const onLoadNextPart = useCallback(() => {
        void dispatch(fetchArticlesNextPage())
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterDestroy={false}>
            <Page
                data-testid='ArticlesPage'
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <ArticlesPageFilters />
                <ArticleInfiniteList className={cls.list}/>
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticlesPage)