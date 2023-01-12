import { selectByTestId } from '../../helpers/selectByTestId'

describe('empty spec', () => {
    describe('User not auth', () => {
        it('Open main page', () => {
            cy.visit('/')
            cy.get(selectByTestId('MainPage')).should('exist')
        })

        it('Open profile page', () => {
            cy.visit('/profile/1')
            cy.get(selectByTestId('MainPage')).should('exist')
        })

        it('Open non-existent page', () => {
            cy.visit('/qwerty')
            cy.get(selectByTestId('NotFoundPage')).should('exist')
        })
    })

    describe('User auth', () => {
        beforeEach(() => {
            cy.login('admin', '123')
        })

        it('Open profile page', () => {
            cy.visit('/profile/1')
            cy.get(selectByTestId('ProfilePage')).should('exist')
        })

        it('Open articles page', () => {
            cy.visit('/articles')
            cy.get(selectByTestId('ArticlesPage')).should('exist')
        })
    })
})