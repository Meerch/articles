import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm'
import { validateProfileData } from '../validateProfileData/validateProfileData'
import { Profile } from 'entities/Profile'
import { ValidateProfileError } from '../../consts/validateErrorConsts'

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI
        const formData = getProfileForm(getState())
        const errors = validateProfileData(formData)

        if (errors.length) {
            return rejectWithValue(errors)
        }

        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData)

            if (!response.data) {
                throw new Error('server error')
            }

            return response.data
        } catch {
            return rejectWithValue([ValidateProfileError.SERVER_ERROR])
        }
    }
)