import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { NotificationItem } from './NotificationItem'

export default {
    title: 'entities/Notifications/NotificationList',
    component: NotificationItem,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof NotificationItem>

const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem {...args} />

export const Normal = Template.bind({})
Normal.args = {

}