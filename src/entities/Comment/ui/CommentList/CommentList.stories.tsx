import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { CommentList } from './CommentList'
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator'

export default {
    title: 'entities/Comment/CommentList',
    component: CommentList,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof CommentList>

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />

export const Normal = Template.bind({})
Normal.args = {
    comments: [
        {
            id: '1',
            text: 'Some text 1',
            user: {
                id: '1',
                username: 'Some username #1'
            }
        },
        {
            id: '2',
            text: 'Some text 2',
            user: {
                id: '2',
                username: 'Some username #2'
            }
        }
    ]
}
Normal.decorators = [StoreDecorator({})]

export const Loading = Template.bind({})
Loading.args = {
    isLoading: true
}
Loading.decorators = [StoreDecorator({})]
