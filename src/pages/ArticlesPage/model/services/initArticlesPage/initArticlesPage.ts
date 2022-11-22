import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors'
import { articlesPageActions } from '../../slices/ArticlesPageSlice'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesPage/initArticlesPage',
    (_, thunkAPI) => {
        const { dispatch, getState } = thunkAPI
        const inited = getArticlesPageInited(getState())

        if (!inited) {
            dispatch(articlesPageActions.initState())
            void dispatch(fetchArticlesList({
                page: 1
            }))
        }
    }
)