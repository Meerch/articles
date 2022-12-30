import { createAsyncThunk } from '@reduxjs/toolkit'

import { getArticlesPageInited } from '../../selectors/articlesPageSelectors'
import { articlesPageActions } from '../../slices/ArticlesPageSlice'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { ArticleSortField, ArticleType } from '@/entities/Article'
import { SortOrder } from '@/shared/types'

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
    'articlesPage/initArticlesPage',
    (searchParams, thunkAPI) => {
        const { dispatch, getState } = thunkAPI
        const inited = getArticlesPageInited(getState())

        if (!inited) {
            const sortFromUrl = searchParams.get('sort') as ArticleSortField
            const orderFromUrl = searchParams.get('order') as SortOrder
            const typeFromUrl = searchParams.get('type') as ArticleType
            const searchFromUrl = searchParams.get('search')

            if (sortFromUrl) {
                dispatch(articlesPageActions.setSort(sortFromUrl))
            }
            if (orderFromUrl) {
                dispatch(articlesPageActions.setOrder(orderFromUrl))
            }
            if (searchFromUrl) {
                dispatch(articlesPageActions.setSearch(searchFromUrl))
            }
            if (typeFromUrl) {
                dispatch(articlesPageActions.setType(typeFromUrl))
            }
            dispatch(articlesPageActions.initState())
            void dispatch(fetchArticlesList({}))
        }
    }
)