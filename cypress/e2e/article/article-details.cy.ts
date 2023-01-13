let currentArticleId = ''

describe('User visit on page of article', () => {
    beforeEach(() => {
        cy.login()
        cy.createArticle().then(article => {
            currentArticleId = article.id
            cy.visit(`articles/${article.id}`)
        })
    })

    afterEach(() => {
        cy.removeArticle(currentArticleId)
    })

    it('User see content of article', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist')
    })

    it('User see recommendations list', () => {
        cy.getByTestId('ArticleRecommendationsList').should('exist')
    })

    it('Send comment', () => {
        cy.getByTestId('ArticleDetails.Info')
        cy.getByTestId('AddCommentForm').scrollIntoView()
        cy.addComment('text')
        cy.getByTestId('CommentCard.Content').should('have.length', 1)
    })

    it('Rate article', () => {
        cy.getByTestId('ArticleDetails.Info')
        cy.getByTestId('RatingCard').scrollIntoView()
        cy.setRate(5, 'feedback')
        cy.get('[data-selected=true]').should('have.length', 5)
    })
})

export {}