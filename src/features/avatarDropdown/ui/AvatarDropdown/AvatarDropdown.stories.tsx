import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { AvatarDropdown } from './AvatarDropdown'
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator'

export default {
    title: 'shared/AvatarDropdown',
    component: AvatarDropdown,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof AvatarDropdown>

const Template: ComponentStory<typeof AvatarDropdown> = (args) => <AvatarDropdown {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({})]