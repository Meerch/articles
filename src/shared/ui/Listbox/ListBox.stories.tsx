import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ListBox } from './ListBox'
import { action } from '@storybook/addon-actions'

export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof ListBox>

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />

export const Normal = Template.bind({})
Normal.args = {
    items: [
        { value: '123', content: 'item 1' },
        { value: '125', content: 'item 2' },
        { value: '127', content: 'item 3' },
        { value: '129', content: 'item 4' }
    ],
    value: 'item 1',
    onChange: action('On change item')
}