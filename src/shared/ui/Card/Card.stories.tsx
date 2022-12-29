import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Card } from './Card'
import { Text } from '../Text/Text'
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'shared/Card',
    component: Card,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />

export const Normal = Template.bind({})
Normal.args = {
    children: <Text title='Some title' text='Some text'/>
}

export const Dark = Template.bind({})
Dark.args = {
    children: <Text title='Some title' text='Some text'/>
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]