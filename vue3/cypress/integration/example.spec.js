// https://docs.cypress.io/api/introduction/api.html

// describe('My First Test', () => {
//   it('visits the app root url', () => {
//     cy.visit('/')
//     cy.contains('h1', 'You did it!')
//   })
// })

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.visit('/user')
    cy.contains('h3', 'User')
  })
})
