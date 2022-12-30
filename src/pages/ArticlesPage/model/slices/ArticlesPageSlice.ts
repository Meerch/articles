import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList'
import { ArticlesPageSchema } from '../types/ArticlesPageSchema'

import { StateSchema } from '@/app/providers/StoreProvider'
import { Article, ArticleSortField, ArticleType, ArticleView } from '@/entities/Article'
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { SortOrder } from '@/shared/types'

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
        limit: 4,
        hasMore: true,
        _inited: false,
        search: '',
        sort: ArticleSortField.CREATED,
        order: 'asc',
        type: ArticleType.ALL
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
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state) => {
                state.isLoading = true
                state.error = undefined
                articlesAdapter.removeAll(state)
            })
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.isLoading = false
                state.hasMore = action.payload.length >= state.limit
                state._inited = true

                if (action.meta.arg.replace) {
                    articlesAdapter.setAll(state, action.payload)
                } else {
                    articlesAdapter.addMany(state, action.payload)
                }
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { actions: articlesPageActions } = ArticlesPageSlice
export const { reducer: articlesPageReducer } = ArticlesPageSlice