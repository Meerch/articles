import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Icon } from './Icon'
import HomeIcon from 'shared/assets/icons/home.svg'

export default {
    title: 'shared/Icon',
    component: Icon,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />

export const Normal = Template.bind({})
Normal.args = {
    Svg: HomeIcon
}