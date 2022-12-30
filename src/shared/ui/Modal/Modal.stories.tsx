import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Modal } from './Modal'

import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />

export const ModalLight = Template.bind({})
ModalLight.args = {
    children: 'Text Text Text Text Text Text Text Text Text Text Text ',
    isOpen: true
}

export const ModalDark = Template.bind({})
ModalDark.args = {
    children: 'Text Text Text Text Text Text Text Text Text Text Text ',
    isOpen: true
}
ModalDark.decorators = [ThemeDecorator(Theme.DARK)]
