import { ChangeEvent, useMemo } from 'react'

import cls from './Select.module.scss'

import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/hocs/typedMemo/typedMemo'

export interface SelectOption<T extends string> {
    value: T
    content: string
}

interface SelectProps<T extends string> {
    className?: string
    label?: string
    options?: Array<SelectOption<T>>
    value?: T
    onChange?: (value: T) => void
    readonly?: boolean
}

export const Select = typedMemo(<T extends string>(props: SelectProps<T>) => {
    const { className, label, options, value, onChange, readonly } = props

    const optionsList = useMemo(() => {
        return options?.map(opt => (
            <option
                disabled={readonly}
                className={cls.option}
                key={opt.value}
                value={opt.value}
            >
                {opt.content}
            </option>
        ))
    }, [options, readonly])

    const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(event.target.value as T)
    }

    return (
        <div className={classNames(cls.Wrapper, {}, [className])}>
            {label && <span className={cls.label}>
                {label + '>'}
            </span>}
            <select
                disabled={readonly}
                onChange={onChangeHandler}
                value={value}
                className={cls.select}
            >
                {optionsList}
            </select>
        </div>
    )
})
