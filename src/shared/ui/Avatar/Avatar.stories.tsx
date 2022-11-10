import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Avatar } from './Avatar'

export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const Primary = Template.bind({})
Primary.args = {
    src: 'https://s.starladder.com/uploads/user_logo/e/c/7/e/meta_tag_3bfa713eaaec1cc84a4251545f2aee42.jpg',
    size: 150
}

export const Small = Template.bind({})
Small.args = {
    src: 'https://s.starladder.com/uploads/user_logo/e/c/7/e/meta_tag_3bfa713eaaec1cc84a4251545f2aee42.jpg',
    size: 50
}

export const ImageNotLoaded = Template.bind({})
ImageNotLoaded.args = {
    src: undefined,
    alt: 'Image not loaded'
}