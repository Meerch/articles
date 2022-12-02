import { Fragment, memo, ReactNode } from 'react'
import { Listbox as HListBox } from '@headlessui/react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ListBox.module.scss'
import { Button } from '../Button/Button'
import { HStack } from '../Stack'
import { DropdownDirection } from 'shared/types/ui'

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

const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top left': cls.optionsTopLeft,
    'top right': cls.optionsTopRight
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
                className={classNames(cls.Listbox, {}, [className])}
                value={value ?? defaultValue}
                onChange={onChange}
                disabled={readonly}
            >
                <HListBox.Button as='button' disabled={readonly} className={cls.trigger}>
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
                                            [cls.disabled]: item.disabled,
                                            [cls.active]: active,
                                            [cls.selected]: selected
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