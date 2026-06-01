describe('Login de usuario', function () {

  it('Login usuario administrador', function () {
    cy.fixture('usuarioAdmin').then((usuarioAdmin) => {
      cy.deleteUser(usuarioAdmin.email)
      cy.createUser(usuarioAdmin)

      cy.loginAdmin()

      cy.get('h1').should('contain.text', 'Bem Vindo ')
      cy.get('h1').should('contain.text', usuarioAdmin.nome)
    })
  })

  it('Login usuario comum', function () {
    cy.fixture('usuarioComum').then((usuarioComum) => {
      cy.deleteUser(usuarioComum.email)
      cy.createUser(usuarioComum)
      
      cy.loginComum()

      cy.get('h1').should('contain.text', 'Serverest Store')
    })
  })

  it('Login campo obrigatório', function () {
    cy.visit('/login')
    cy.get('[data-testid="entrar"]').click()
    cy.get(':nth-child(3) > :nth-child(2)').should('contain.text', 'Email é obrigatório')
    cy.get(':nth-child(4) > :nth-child(2)').should('contain.text', 'Password é obrigatório')
  })

  it('Mensagem de campo vazio', function () {
    cy.fixture('usuarioAdmin').then((usuarioAdmin) => {
      
      cy.visit('/login')
      cy.get('[data-testid="email"]').type(usuarioAdmin.email).clear()
      cy.get('[data-testid="senha"]').type(usuarioAdmin.password).clear()
      cy.get('[data-testid="entrar"]').click()
      cy.get(':nth-child(3) > :nth-child(2)').should('contain.text', 'Email não pode ficar em branco')
      cy.get(':nth-child(4) > :nth-child(2)').should('contain.text', 'Password não pode ficar em branco')
    })
  })

  it('Usuario e/ou senha inválidos', function () {
    cy.fixture('usuarioAdmin').then((usuarioAdmin) => {
      cy.visit('/login')
      cy.get('[data-testid="email"]').type(usuarioAdmin.email)
      cy.get('[data-testid="senha"]').type('987654')
      cy.get('[data-testid="entrar"]').click()
      cy.get('.alert > :nth-child(2)').should('contain.text', 'Email e/ou senha inválidos')
    })
  })
})
