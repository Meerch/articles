import { createAsyncThunk } from '@reduxjs/toolkit'

import {
    getArticlesPageHasMore,
    getArticlesPageIsLoading,
    getArticlesPageNum
} from '../../selectors/articlesPageSelectors'
import { articlesPageActions } from '../../slices/ArticlesPageSlice'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'

import { ThunkConfig } from '@/app/providers/StoreProvider'

export const fetchArticlesNextPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesPage/fetchArticlesNextPage',
    (_, thunkAPI) => {
        const { dispatch, getState } = thunkAPI
        const page = getArticlesPageNum(getState())
        const isLoading = getArticlesPageIsLoading(getState())
        const hasMore = getArticlesPageHasMore(getState())

        if (hasMore && !isLoading) {
            void dispatch(articlesPageActions.setPage(page + 1))
            void dispatch(fetchArticlesList({}))
        }
    }
)