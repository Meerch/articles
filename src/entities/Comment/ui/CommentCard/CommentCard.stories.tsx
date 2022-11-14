import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { CommentCard } from './CommentCard'
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator'

export default {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof CommentCard>

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />

export const Normal = Template.bind({})
Normal.args = {
    comment: {
        id: '1',
        text: 'Some text 1',
        user: {
            id: '1',
            username: 'Some username #1'
        }
    }
}
Normal.decorators = [StoreDecorator({})]

export const Loading = Template.bind({})
Loading.args = {
    isLoading: true
}
Loading.decorators = [StoreDecorator({})]