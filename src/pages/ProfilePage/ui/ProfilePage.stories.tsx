import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import ProfilePage from './ProfilePage'

import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof ProfilePage>

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...Object.assign({}, args)} />

const profileData = {
    username: 'nickname',
    first: 'firstName',
    lastname: 'lastName',
    age: 18,
    avatar: 'https://m.diskomir.ru/upload/iblock/ac0/ac0e42b7323cbd368e394d34945dfd27.jpg',
    currency: Currency.RUB,
    country: Country.Russia,
    city: 'Moscow'
}

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({
    profile: {
        form: profileData,
        data: profileData
    }
})]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
    profile: {
        form: {
            username: 'nickname',
            first: 'firstName',
            lastname: 'lastName',
            age: 18,
            avatar: 'https://m.diskomir.ru/upload/iblock/ac0/ac0e42b7323cbd368e394d34945dfd27.jpg',
            currency: Currency.RUB,
            country: Country.Russia,
            city: 'Moscow'
        }

    }
})]