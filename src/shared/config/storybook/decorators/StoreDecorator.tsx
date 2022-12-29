import { Story } from '@storybook/react'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
// eslint-disable-next-line fsd-plugin-fsd/public-api-imports-fsd
import { loginReducer } from '@/features/AuthByUsername/model/slice/loginSlice'
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
// eslint-disable-next-line fsd-plugin-fsd/public-api-imports-fsd
import { articleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice'
// eslint-disable-next-line fsd-plugin-fsd/public-api-imports-fsd
import { addCommentFormReducer } from '@/features/AddCommentForm/model/slice/addCommentFormSlice'
import { articlesPageReducer } from '@/pages/ArticlesPage'
import { ArticleDetailsPageReducer } from '@/pages/ArticleDetailsPage'
import { profileReducer } from '@/features/editableProfileCard'

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
    return <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent />
    </StoreProvider>
}