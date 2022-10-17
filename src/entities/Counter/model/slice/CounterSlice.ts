import { createSlice } from '@reduxjs/toolkit'
import { CounterSchema } from 'entities/Counter/model/types/CounterSchema'

const initialState: CounterSchema = {
    value: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        }
    }
})

// Action creators are generated for each case reducer function
export const { actions: CounterActions } = counterSlice

export const { reducer: CounterReducer } = counterSlice