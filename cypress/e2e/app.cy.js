describe('Login page', () => {
  it("Go '/'  & wrong pass redirect to '/login'", () => {
    cy.visit('/')
    cy.url().should('include', '/login')
    cy.get('[for="password"] > input').clear().type('12345')
    cy.get('[for="password"] > input').should('have.value', '12345')
    cy.contains('Log in').click()
    cy.url().should('include', '/login')
  })
  it("Correct login & logout flow with localStorage checking", () => {
    cy.visit('/')
    cy.get('[for="password"] > input').clear().type('admin')
    cy.get('[for="password"] > input').should('have.value', 'admin')
    cy.contains('Log in').click().should(() => {
      expect(localStorage.getItem('USER_AUTH')).to.eq('{"isAuthenticated":true,"user":{"email":"admin@example.es","fullName":"Luis Navarro"}}')
    })
    cy.url().should('eq', Cypress.config().baseUrl)
    cy.get('.sc-eDLKkx > :nth-child(3)').click().should(() => {
      expect(localStorage.getItem('USER_AUTH')).contains('"isAuthenticated":false')
    })
    cy.url().should('include', '/login')

  })
})

const ls = `USER_AUTH:"{"isAuthenticated":true,"user":{"email":"admin@example.es","fullName":"Luis Navarro"}}"`