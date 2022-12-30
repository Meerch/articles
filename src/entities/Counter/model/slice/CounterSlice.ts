import { CounterSchema } from '../types/CounterSchema'
import { buildSlice } from '@/shared/lib/store'
import { PayloadAction } from '@reduxjs/toolkit'

const initialState: CounterSchema = {
    value: 0
}

export const counterSlice = buildSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        add: (state, payload: PayloadAction<number>) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    actions: CounterActions,
    reducer: CounterReducer,
    useActions: useCounterActions
} = counterSlice