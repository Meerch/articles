import { Popover as HPopover } from '@headlessui/react'
import { ReactNode } from 'react'

import { mapDirectionClass } from '../../styles/consts'
import clsPopup from '../../styles/popup.module.scss'

import cls from './Popover.module.scss'

import { classNames } from '@/shared/lib/classNames/classNames'
import { DropdownDirection } from '@/shared/types/ui'

interface PopoverProps {
    trigger: ReactNode
    children: ReactNode
    direction?: DropdownDirection
    className?: string
}

export const Popover = (props: PopoverProps) => {
    const { trigger, children, className, direction = 'bottom right' } = props

    const menuClasses = mapDirectionClass[direction]

    return (
        <HPopover className={classNames(cls.Popover, {}, [className, clsPopup.popup])}>
            <HPopover.Button as='div' className={clsPopup.trigger}>{trigger}</HPopover.Button>

            <HPopover.Panel className={classNames(cls.panel, {}, [menuClasses])}>
                {children}
            </HPopover.Panel>
        </HPopover>
    )
}