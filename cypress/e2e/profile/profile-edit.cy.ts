let profileId: string

describe('User visit on page of profile', () => {
    beforeEach(() => {
        cy.visit('')
        cy.login().then(data => {
            profileId = data.id
            cy.visit(`profile/${data.id}`)
        })
    })

    afterEach(() => {
        cy.resetProfile(profileId)
    })

    it('Editable profile success loaded', () => {
        cy.getByTestId('ProfileCard.firstname').should('have.value', 'Илья')
    })

    it('Edit profile', () => {
        const newFirstname = 'newFirstname'
        const newLastname = 'newLastname'

        cy.updateProfile(newFirstname, newLastname)
        cy.getByTestId('ProfileCard.firstname').should('have.value', newFirstname)
        cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname)
    })
})

export {}