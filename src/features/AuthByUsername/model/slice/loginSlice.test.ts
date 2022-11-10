import { LoginSchema } from 'features/AuthByUsername'
import { loginActions, loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'

describe('loginSlice.test', () => {
    test('test set username', () => {
        const state: DeepPartial<LoginSchema> = {
            username: 'username'
        }
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setUsername('username123')
        ))
            .toEqual({ username: 'username123' })
    })

    test('test set password', () => {
        const state: DeepPartial<LoginSchema> = {
            password: 'password'
        }
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setPassword('password123')
        ))
            .toEqual({ password: 'password123' })
    })
})