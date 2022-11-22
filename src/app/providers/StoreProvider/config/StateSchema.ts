import { CounterSchema } from 'entities/Counter'
import { UserSchema } from 'entities/User'
import { LoginSchema } from 'features/AuthByUsername'
import { UISchema } from 'features/UI'
import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { ProfileSchema } from 'entities/Profile'
import { AxiosInstance } from 'axios'
import { ArticleDetailsSchema } from 'entities/Article'
import { ArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage'
import { AddCommentFormSchema } from 'features/AddCommentForm'
import { ArticlesPageSchema } from 'pages/ArticlesPage'

export interface StateSchema {
    counter: CounterSchema
    user: UserSchema
    ui: UISchema

    // Async reducers
    loginForm?: LoginSchema
    profile?: ProfileSchema
    articleDetails?: ArticleDetailsSchema
    articleDetailsComments?: ArticleDetailsCommentsSchema
    articlesPage?: ArticlesPageSchema
    addCommentForm?: AddCommentFormSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore {
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtraArg
    state: StateSchema
}