import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { AppLinkTheme, AppLink } from './AppLink'

import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'shared/AppLink',
    component: AppLink,
    argTypes: {
        backgroundColor: { control: 'color' }
    },
    args: {
        to: '/'
    }
} as ComponentMeta<typeof AppLink>

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />

export const Primary = Template.bind({})
Primary.args = {
    theme: AppLinkTheme.PRIMARY,
    children: 'Text'
}

export const PrimaryDark = Template.bind({})
PrimaryDark.args = {
    theme: AppLinkTheme.PRIMARY,
    children: 'Text'
}
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Secondary = Template.bind({})
Secondary.args = {
    theme: AppLinkTheme.SECONDARY,
    children: 'Text'
}

export const SecondaryDark = Template.bind({})
SecondaryDark.args = {
    theme: AppLinkTheme.SECONDARY,
    children: 'Text'
}
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {
    theme: AppLinkTheme.RED,
    children: 'Text'
}

export const RedDark = Template.bind({})
RedDark.args = {
    theme: AppLinkTheme.RED,
    children: 'Text'
}
RedDark.decorators = [ThemeDecorator(Theme.DARK)]
