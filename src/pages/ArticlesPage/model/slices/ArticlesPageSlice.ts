import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ArticlesPageSchema } from '../types/ArticlesPageSchema'
import { Article, ArticleView } from 'entities/Article'
import { StateSchema } from 'app/providers/StoreProvider'
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList'
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage'

const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id
})

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    state => state.articlesPage ?? articlesAdapter.getInitialState()
)

export const ArticlesPageSlice = createSlice({
    name: 'ArticlesPageSlice',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        isLoading: false,
        error: undefined,
        view: ArticleView.TILE,
        ids: [],
        entities: {},
        page: 1,
        hasMore: true,
        _inited: false
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload)
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        initState: (state) => {
            const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView
            state.view = view
            state.limit = view === ArticleView.LIST ? 4 : 9
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<Article[]>) => {
                state.isLoading = false
                state.hasMore = action.payload.length > 0
                articlesAdapter.addMany(state, action.payload)
                state._inited = true
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { actions: articlesPageActions } = ArticlesPageSlice
export const { reducer: articlesPageReducer } = ArticlesPageSlice