import { screen } from '@testing-library/react'
import componentRender from 'shared/lib/tests/componentRender/componentRender'
import { EditableProfileCard } from './EditableProfileCard'
import { Profile } from 'entities/Profile'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { profileReducer } from '../../model/slice/profileSlice'
import userEvent from '@testing-library/user-event'
import { $api } from 'shared/api/api'

const profile: Profile = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 25,
    currency: Currency.RUB,
    country: Country.Russia,
    city: 'Moscow',
    username: 'admin123'
}

describe('EditableProfileCard', () => {
    beforeEach(() => {
        componentRender(<EditableProfileCard id={'1'}/>, {
            initialState: {
                profile: {
                    readonly: true,
                    data: profile,
                    form: profile
                },
                user: {
                    authData: {
                        id: '1',
                        username: 'Magnus'
                    }
                }
            },
            asyncReducers: {
                profile: profileReducer
            }
        })
    })

    test('Test change mode after click EDIT', async () => {
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
        expect(screen.getByTestId('EditableProfileCardHeader.SaveButton')).toBeInTheDocument()
        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument()
    })

    test('Test cancel edit', async () => {
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))
        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'))

        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user')
        await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user')

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user')
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user')

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'))

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin')
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin')
    })

    test('Test cancel edit', async () => {
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))
        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'))

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

        expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument()
    })

    test('Test cancel edit', async () => {
        const mockPutReq = jest.spyOn($api, 'put')

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))

        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user')

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

        expect(mockPutReq).toHaveBeenCalled()
    })
})