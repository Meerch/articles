import { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { ListBox } from 'shared/ui/Popups'
import { Currency } from '../../model/consts/currencyConsts'

interface CurrencySelectProps {
    className?: string
    value?: Currency
    onChange?: (value: Currency) => void
    readonly?: boolean
}

const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD }
]

export const CurrencySelect = memo(({ className, value, onChange, readonly }: CurrencySelectProps) => {
    const { t } = useTranslation('profile')

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency)
    }, [onChange])

    return (
        <ListBox
            defaultValue={t('Укажите валюту')}
            readonly={readonly}
            value={value}
            onChange={onChangeHandler}
            className={classNames('', {}, [className])}
            label={t('Валюта')}
            items={options}
            direction='top right'
        />
    )
})
