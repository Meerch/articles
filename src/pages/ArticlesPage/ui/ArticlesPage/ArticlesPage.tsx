import cls from './ArticlesPage.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { memo, useCallback } from 'react'
import { ArticlesList, ArticleView, ArticleViewSelector } from 'entities/Article'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slices/ArticlesPageSlice'
import { useSelector } from 'react-redux'
import {
    getArticlesPageIsLoading,
    getArticlesPageNum,
    getArticlesPageView
} from '../../model/selectors/articlesPageSelectors'
import useInitialEffect from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Page } from 'widgets/Page/Page'
import { fetchArticlesNextPage } from 'pages/ArticlesPage/model/services/fetchArticlesNextPage/fetchArticlesNextPage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'

interface ArticlesPageProps {
    className?: string
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const view = useSelector(getArticlesPageView)
    const isLoading = useSelector(getArticlesPageIsLoading)
    const page = useSelector(getArticlesPageNum)

    const articles = useSelector(getArticles.selectAll)
    const dispatch = useAppDispatch()

    useInitialEffect(() => {
        void dispatch(initArticlesPage())
    })

    const onLoadNextPart = useCallback(() => {
        void dispatch(fetchArticlesNextPage())
    }, [dispatch])

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view))
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterDestroy={false}>
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <ArticleViewSelector view={view} onViewClick={onChangeView}/>
                <ArticlesList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}/>
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticlesPage)