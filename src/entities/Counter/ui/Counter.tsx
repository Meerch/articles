import { useTranslation } from 'react-i18next'
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue'
import { useCounterActions } from '../model/slice/CounterSlice'

import { Button } from '@/shared/ui/Button'

export const Counter = () => {
    const { t } = useTranslation()
    const value = useCounterValue()
    const { increment, decrement, add } = useCounterActions()

    const handleDecrement = () => {
        decrement()
    }

    const handleIncrement = () => {
        increment()
    }

    const handleAddFive = () => {
        add(5)
    }

    return (
        <div >
            <h1 data-testid='value'>{t('value')}  {value}</h1>

            <Button data-testid='decrement-btn' onClick={handleDecrement}>
                {t('decrement')}
            </Button>

            <Button data-testid='decrement-btn' onClick={handleAddFive}>
                {t('add 5')}
            </Button>

            <Button data-testid='increment-btn' onClick={handleIncrement}>
                {t('increment')}
            </Button>
        </div>
    )
}
