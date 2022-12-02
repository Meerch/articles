import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ListBox } from './ListBox'
import { action } from '@storybook/addon-actions'

export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' }
    },
    decorators: [
        Story => <div style={{ padding: 100 }}><Story/></div>
    ]
} as ComponentMeta<typeof ListBox>

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />

export const Normal = Template.bind({})
Normal.args = {
    items: [
        { value: '123', content: 'item 1123123' },
        { value: '125', content: 'item 212312312' },
        { value: '127', content: 'item 312312312' },
        { value: '129', content: 'item 4123123' }
    ],
    value: '123',
    onChange: action('On change item')
}

export const TopLeft = Template.bind({})
TopLeft.args = {
    direction: 'top left',
    items: [
        { value: '123', content: 'item 1123123' },
        { value: '125', content: 'item 212312312' },
        { value: '127', content: 'item 312312312' },
        { value: '129', content: 'item 4123123' }
    ],
    value: '123',
    onChange: action('On change item')
}

export const TopRight = Template.bind({})
TopRight.args = {
    direction: 'top right',
    items: [
        { value: '123', content: 'item 1123123' },
        { value: '125', content: 'item 212312312' },
        { value: '127', content: 'item 312312312' },
        { value: '129', content: 'item 4123123' }
    ],
    value: '123',
    onChange: action('On change item')
}

export const BottomLeft = Template.bind({})
BottomLeft.args = {
    direction: 'bottom left',
    items: [
        { value: '123', content: 'item 1123123' },
        { value: '125', content: 'item 212312312' },
        { value: '127', content: 'item 312312312' },
        { value: '129', content: 'item 4123123' }
    ],
    value: '123',
    onChange: action('On change item')
}

export const BottomRight = Template.bind({})
BottomRight.args = {
    direction: 'bottom right',
    items: [
        { value: '123', content: 'item 1123123' },
        { value: '125', content: 'item 212312312' },
        { value: '127', content: 'item 312312312' },
        { value: '129', content: 'item 4123123' }
    ],
    value: '123',
    onChange: action('On change item')
}