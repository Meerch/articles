import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Text, TextSize, TextTheme } from './Text'
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />

export const Default = Template.bind({})
Default.args = {
    title: 'Title Title',
    text: 'Text Text Text'
}

export const DefaultDark = Template.bind({})
DefaultDark.args = {
    title: 'Title Title',
    text: 'Text Text Text'
}
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)]

export const OnlyTitle = Template.bind({})
OnlyTitle.args = {
    title: 'Title Title'
}

export const OnlyText = Template.bind({})
OnlyText.args = {
    text: 'Text Text Text'
}

export const ErrorTheme = Template.bind({})
ErrorTheme.args = {
    title: 'Title Title',
    text: 'Text Text Text',
    theme: TextTheme.ERROR
}

export const SizeL = Template.bind({})
SizeL.args = {
    title: 'Title Title',
    text: 'Text Text Text',
    size: TextSize.SIZE_L
}

export const SizeM = Template.bind({})
SizeM.args = {
    title: 'Title Title',
    text: 'Text Text Text',
    size: TextSize.SIZE_M
}

export const SizeS = Template.bind({})
SizeS.args = {
    title: 'Title Title',
    text: 'Text Text Text',
    size: TextSize.SIZE_S
}