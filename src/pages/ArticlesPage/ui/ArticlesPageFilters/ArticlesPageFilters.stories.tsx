import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { ArticlesPageFilters } from './ArticlesPageFilters'

import { ArticleSortField, ArticleView } from '@/entities/Article'
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator'

export default {
    title: 'pages/ArticlesPage/ArticlesPageFilters',
    component: ArticlesPageFilters,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof ArticlesPageFilters>

const Template: ComponentStory<typeof ArticlesPageFilters> = (args) => <ArticlesPageFilters {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({
    articlesPage: {
        view: ArticleView.TILE,
        sort: ArticleSortField.VIEWS,
        order: 'desc',
        search: ''
    }
})]