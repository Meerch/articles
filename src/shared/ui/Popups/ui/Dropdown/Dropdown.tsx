import { Fragment, memo, ReactNode } from 'react'
import cls from './Dropdown.module.scss'
import clsPopup from '../../styles/popup.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Menu } from '@headlessui/react'
import { DropdownDirection } from '@/shared/types/ui'
import AppLink from '../../../AppLink/AppLink'
import { mapDirectionClass } from '../../styles/consts'

export interface DropdownItem {
    disabled?: boolean
    onClick?: () => void
    content?: ReactNode
    href?: string
}

interface DropdownProps {
    className?: string
    items: DropdownItem[]
    trigger: ReactNode
    direction?: DropdownDirection
}

export const Dropdown = memo((props: DropdownProps) => {
    const { className, trigger, items, direction = 'bottom right' } = props

    const menuClasses = mapDirectionClass[direction]

    return (
        <Menu as='div' className={classNames(cls.Dropdown, {}, [className, clsPopup.popup])}>
            <Menu.Button className={clsPopup.trigger}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, [menuClasses])}>
                {
                    items.map(item => {
                        const content = ({ active }: { active: boolean }) => (
                            <button
                                onClick={item.onClick}
                                disabled={item.disabled}
                                type='button'
                                className={classNames(cls.item, {
                                    [clsPopup.active]: active
                                })}
                            >
                                {item.content}
                            </button>
                        )

                        if (item.href) {
                            return (
                                <Menu.Item key={item.href} as={AppLink} to={item.href} disabled={item.disabled}>
                                    {content}
                                </Menu.Item>
                            )
                        }

                        return (
                            <Menu.Item key={String(item.content)} as={Fragment} disabled={item.disabled}>
                                {content}
                            </Menu.Item>
                        )
                    })
                }
            </Menu.Items>
        </Menu>
    )
})