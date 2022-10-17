import { CounterActions, CounterReducer } from './CounterSlice'
import { CounterSchema } from 'entities/Counter'

describe('CounterSlice.test', () => {
    test('increment', () => {
        const state: CounterSchema = { value: 10 }
        expect(
            CounterReducer(state, CounterActions.increment())
        ).toEqual({ value: 11 })
    })

    test('decrement', () => {
        const state: CounterSchema = { value: 10 }
        expect(
            CounterReducer(state, CounterActions.decrement())
        ).toEqual({ value: 9 })
    })

    test('should work with empty state', () => {
        expect(
            CounterReducer(undefined, CounterActions.increment())
        ).toEqual({ value: 1 })
    })
})