import { Button } from '@/shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { CounterActions } from '../model/slice/CounterSlice'
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue'

export const Counter = () => {
    const { t } = useTranslation()
    const value = useSelector(getCounterValue)
    const dispatch = useDispatch()

    const decrement = () => {
        dispatch(CounterActions.decrement())
    }

    const increment = () => {
        dispatch(CounterActions.increment())
    }

    return (
        <div >
            <h1 data-testid='value'>{t('value')}  {value}</h1>

            <Button data-testid='decrement-btn' onClick={decrement}>
                {t('decrement')}
            </Button>

            <Button data-testid='increment-btn' onClick={increment}>
                {t('increment')}
            </Button>
        </div>
    )
}
