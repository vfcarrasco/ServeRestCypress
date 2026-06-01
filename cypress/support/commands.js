Cypress.Commands.add('loginAdmin', () => {
  cy.fixture('usuarioAdmin').then((usuarioAdmin) => {
    cy.visit('/login')
    cy.get('[data-testid="email"]').type(usuarioAdmin.email)
    cy.get('[data-testid="senha"]').type(usuarioAdmin.password)
    cy.get('[data-testid="entrar"]').click()
  })
})

Cypress.Commands.add('loginComum', () => {
  cy.fixture('usuarioComum').then((usuarioComum) => {
    cy.visit('/login')
    cy.get('[data-testid="email"]').type(usuarioComum.email)
    cy.get('[data-testid="senha"]').type(usuarioComum.password)
    cy.get('[data-testid="entrar"]').click()
  })
})