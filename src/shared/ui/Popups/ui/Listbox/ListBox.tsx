import { Fragment, memo, ReactNode } from 'react'
import { Listbox as HListBox } from '@headlessui/react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ListBox.module.scss'
import clsPopup from '../../styles/popup.module.scss'
import { Button } from '../../../Button/Button'
import { HStack } from '../../../Stack'
import { DropdownDirection } from '@/shared/types/ui'
import { mapDirectionClass } from '../../styles/consts'

export interface ListBoxItem {
    value: string
    content: ReactNode
    disabled?: boolean
}

interface ListboxProps {
    className?: string
    value?: string
    defaultValue?: string
    onChange: (value: string) => void
    items?: ListBoxItem[]
    label?: string
    readonly?: boolean
    direction?: DropdownDirection
}

export const ListBox = memo((props: ListboxProps) => {
    const {
        className,
        value,
        onChange,
        defaultValue,
        label,
        items,
        readonly,
        direction = 'bottom right'
    } = props

    const optionsClasses = mapDirectionClass[direction]

    return (
        <HStack gap='8'>
            {label && <label>{`${label} >`}</label>}
            <HListBox
                as='div'
                className={classNames(cls.Listbox, {}, [className, clsPopup.popup])}
                value={value ?? defaultValue}
                onChange={onChange}
                disabled={readonly}
            >
                <HListBox.Button as='button' disabled={readonly} className={clsPopup.trigger}>
                    <Button disabled={readonly}>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options
                    as='div'
                    className={classNames(cls.options, {}, [optionsClasses])}
                >
                    {items?.map((item) => (
                        <HListBox.Option
                            as={Fragment}
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                        >
                            {
                                ({ active, selected }) => (
                                    <li
                                        className={classNames(cls.item, {
                                            [clsPopup.disabled]: item.disabled,
                                            [clsPopup.active]: active,
                                            [clsPopup.selected]: selected
                                        }, [])}
                                    >
                                        {item.content}
                                    </li>
                                )
                            }
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    )
})