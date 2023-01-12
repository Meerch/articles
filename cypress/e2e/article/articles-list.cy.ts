describe('User visit on page of articles', () => {
    beforeEach(() => {
        cy.login().then(data => {
            cy.visit('articles')
        })
    })

    it('articles success loaded', () => {
        cy.getByTestId('ArticlesList').should('exist')
        cy.getByTestId('ArticlesListItem').should('have.length.greaterThan', 3)
    })
})