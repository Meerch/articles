
export const updateProfile = (firstname: string, lastname: string) => {
    cy.getByTestId('EditableProfileCardHeader.EditButton').click()
    cy.getByTestId('ProfileCard.firstname').clear().type(firstname)
    cy.getByTestId('ProfileCard.lastname').clear().type(lastname)
    cy.getByTestId('EditableProfileCardHeader.SaveButton').click()
}

export const resetProfile = (profileId: string) => {
    return cy.request({
        method: 'PUT',
        url: `http://localhost:8000/profile/${profileId}`,
        headers: { Authorization: 'asd' },
        body: {
            id: '2',
            first: 'Илья',
            lastname: 'Кукушкин',
            age: 123,
            currency: 'RUB',
            county: 'Russia',
            city: 'Minsk',
            username: 'admin',
            avatar: 'https://phonoteka.org/uploads/posts/2022-09/1663321151_1-phonoteka-org-p-zenitsu-art-krasivo-1.jpg',
            country: 'Belarus'
        }
    })
}

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>
            resetProfile(profileId: string): Chainable<void>
        }
    }
}
