import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UISchema } from 'features/UI/model/types/UISchema'

const initialState: UISchema = {
    scroll: {}
}

export const UISlice = createSlice({
    name: 'UISlice',
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<{ path: string, position: number }>) => {
            state.scroll[payload.path] = payload.position
        }
    }
})

export const { actions: uiActions } = UISlice
export const { reducer: uiReducer } = UISlice