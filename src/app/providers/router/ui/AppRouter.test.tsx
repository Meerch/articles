import componentRender from '@/shared/lib/tests/componentRender/componentRender'
import AppRouter from './AppRouter'
import { getRouteAbout, getRouteAdmin, getRouteArticles, getRouteProfile } from '@/shared/const/router'
import { screen } from '@testing-library/react'
import { UserRole } from '@/entities/User'

describe('AppRouter.test', () => {
    test('Test routing', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAbout()
        })

        const page = await screen.findByTestId('AboutPage')
        expect(page).toBeInTheDocument()
    })

    test('Test incorrect route / not found page', async () => {
        componentRender(<AppRouter />, {
            route: '/none'
        })

        const page = await screen.findByTestId('NotFoundPage')
        expect(page).toBeInTheDocument()
    })

    test('Test redirect by not auth', async () => {
        componentRender(<AppRouter />, {
            route: getRouteArticles(),
            initialState: {}
        })

        const page = await screen.findByTestId('MainPage')
        expect(page).toBeInTheDocument()
    })

    test('Test route by auth', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
            initialState: {
                user: { authData: {} }
            }
        })

        const page = await screen.findByTestId('ProfilePage')
        expect(page).toBeInTheDocument()
    })

    test('Test forbidden route for not available role', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: {
                user: { authData: { roles: [] } }
            }
        })

        const page = await screen.findByTestId('ForbiddenPage')
        expect(page).toBeInTheDocument()
    })

    test('Test forbidden route for available role', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: {
                user: { authData: { roles: [UserRole.ADMIN] } }
            }
        })

        const page = await screen.findByTestId('AdminPage')
        expect(page).toBeInTheDocument()
    })
})