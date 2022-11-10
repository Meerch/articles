import { ChangeEvent, memo, useMemo } from 'react'
import cls from './Select.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'

interface SelectOption {
    value: string
    content: string
}

interface SelectProps {
    className?: string
    label?: string
    options?: SelectOption[]
    value?: string
    onChange?: (value: string) => void
    readonly?: boolean
}

export const Select = memo((props: SelectProps) => {
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
        onChange?.(event.target.value)
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
