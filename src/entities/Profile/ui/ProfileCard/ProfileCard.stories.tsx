import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ProfileCard } from './ProfileCard'
import { Currency } from '@/entities/Currency'
import { Country } from '@/entities/Country'

export default {
    title: 'entities/Profile/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof ProfileCard>

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />

export const Primary = Template.bind({})
Primary.args = {
    data: {
        username: 'nickname',
        first: 'firstName',
        lastname: 'lastName',
        age: 18,
        avatar: 'https://s.starladder.com/uploads/user_logo/e/c/7/e/meta_tag_3bfa713eaaec1cc84a4251545f2aee42.jpg',
        currency: Currency.RUB,
        country: Country.Russia,
        city: 'Moscow'
    }
}

export const Loading = Template.bind({})
Loading.args = {
    isLoading: true
}

export const Error = Template.bind({})
Error.args = {
    error: 'Error'
}

// Normal.decorators = [StoreDecorator({})]