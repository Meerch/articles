import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import ArticleRating from './ArticleRating'

import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator'

export default {
    title: 'features/ArticleRating',
    component: ArticleRating,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof ArticleRating>

const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating {...args} />

export const Normal = Template.bind({})
Normal.args = {
    articleId: '1'
}
Normal.decorators = [StoreDecorator({})]
Normal.parameters = {
    mockData: [
        {
            url: __API__ + 'article-ratings?articleId=1&userId=1',
            method: 'GET',
            status: 200,
            response: [
                {
                    id: '1',
                    rate: 4,
                    feedback: 'Хорошая статья'
                },
                {
                    id: '2',
                    rate: 5,
                    feedback: 'Хорошая статья'
                }
            ]
        }
    ]
}

export const WithRate = Template.bind({})
WithRate.args = {
    articleId: '1'
}
WithRate.decorators = [StoreDecorator({})]
WithRate.parameters = {
    mockData: [
        {
            url: __API__ + 'article-ratings?articleId=1&userId=1',
            method: 'GET',
            status: 200,
            response: []
        }
    ]
}