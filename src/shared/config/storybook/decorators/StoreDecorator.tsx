import { Story } from '@storybook/react'

import { articleDetailsReducer } from '@/entities/Article/testing'
import { addCommentFormReducer } from '@/features/AddCommentForm/testing'
import { loginReducer } from '@/features/AuthByUsername/testing'
import { profileReducer } from '@/features/editableProfileCard/testing'
// eslint-disable-next-line fsd-plugin-fsd/layer-imports
import { ArticleDetailsPageReducer } from '@/pages/ArticleDetailsPage'
// eslint-disable-next-line fsd-plugin-fsd/layer-imports
import { articlesPageReducer } from '@/pages/ArticlesPage'
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleDetailsPage: ArticleDetailsPageReducer,
    articlesPage: articlesPageReducer
}

export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: ReducersList
) => (StoryComponent: Story) => {
    return (<StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent />
    </StoreProvider>)
}