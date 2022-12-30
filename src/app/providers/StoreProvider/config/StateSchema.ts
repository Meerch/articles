import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'

import { ArticleDetailsSchema } from '@/entities/Article'
import { CounterSchema } from '@/entities/Counter'
import { UserSchema } from '@/entities/User'
import { AddCommentFormSchema } from '@/features/AddCommentForm'
import { LoginSchema } from '@/features/AuthByUsername'
import { UISchema } from '@/features/UI'
import { ProfileSchema } from '@/features/editableProfileCard'
import { ArticleDetailsPageSchema } from '@/pages/ArticleDetailsPage'
import { ArticlesPageSchema } from '@/pages/ArticlesPage'
import { rtkApi } from '@/shared/api/rtkApi'

export interface StateSchema {
    counter: CounterSchema
    user: UserSchema
    ui: UISchema
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

    // Async reducers
    loginForm?: LoginSchema
    profile?: ProfileSchema
    articleDetails?: ArticleDetailsSchema
    articleDetailsPage?: ArticleDetailsPageSchema
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