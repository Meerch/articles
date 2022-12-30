import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { StoreDecorator } from '../../../../shared/config/storybook/decorators/StoreDecorator'

import LoginForm from './LoginForm'

export default {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof LoginForm>

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />

export const Primary = Template.bind({})
Primary.args = {}

Primary.decorators = [StoreDecorator({
    loginForm: {
        username: 'admin',
        password: '123'
    }
})]

export const WithError = Template.bind({})
WithError.args = {}

WithError.decorators = [StoreDecorator({
    loginForm: {
        username: 'admin',
        password: '123',
        error: 'Error'
    }
})]

export const WithLoading = Template.bind({})
WithLoading.args = {}

WithLoading.decorators = [StoreDecorator({
    loginForm: {
        isLoading: true
    }
})]
