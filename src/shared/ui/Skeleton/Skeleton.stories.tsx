import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Skeleton } from './Skeleton'

import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'shared/Skeleton',
    component: Skeleton,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof Skeleton>

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />

export const Square = Template.bind({})
Square.args = {
    width: '100%',
    height: 100
}
export const SquareDark = Template.bind({})
SquareDark.args = {
    width: '100%',
    height: 100
}
SquareDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Circle = Template.bind({})
Circle.args = {
    borderRadius: '50%',
    width: 120,
    height: 120
}

export const CircleDark = Template.bind({})
CircleDark.args = {
    borderRadius: '50%',
    width: 120,
    height: 120
}
CircleDark.decorators = [ThemeDecorator(Theme.DARK)]