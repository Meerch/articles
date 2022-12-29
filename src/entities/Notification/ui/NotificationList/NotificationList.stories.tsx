import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NotificationList } from './NotificationList'
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator'

export default {
    title: 'entities/Notifications/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof NotificationList>

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({})]
Normal.parameters = {
    mockData: [
        {
            url: __API__ + 'notifications',
            method: 'GET',
            status: 200,
            response: [
                {
                    id: '1',
                    title: 'Уведомление #1',
                    description: 'Комментарий #1'
                },
                {
                    id: '2',
                    title: 'Уведомление #2',
                    description: 'Комментарий #2'
                },
                {
                    id: '3',
                    title: 'Уведомление #3',
                    description: 'Комментарий #3'
                }
            ]
        }
    ]
}