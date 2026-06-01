describe('Cadastro de usuario', function () {

  it('Cadastro usuario administrador', function () {
    cy.fixture('usuarioAdmin').then((usuarioAdmin) => {
      cy.deleteUser(usuarioAdmin.email)

      cy.visit('/cadastrarusuarios')
      cy.get('[data-testid="nome"]').type(usuarioAdmin.nome)
      cy.get('[data-testid="email"]').type(usuarioAdmin.email)
      cy.get('[data-testid="password"]').type(usuarioAdmin.password)
      cy.get('[data-testid="checkbox"]').click()
      cy.get('[data-testid="cadastrar"]').click()
      cy.get('.alert').should('contain.text', 'Cadastro realizado com sucesso')
    })
  })

  it('Cadastro usuario comum', function () {
    cy.fixture('usuarioComum').then((usuarioComum) => {
      cy.deleteUser(usuarioComum.email)

      cy.visit('/cadastrarusuarios')
      cy.get('[data-testid="nome"]').type(usuarioComum.nome)
      cy.get('[data-testid="email"]').type(usuarioComum.email)
      cy.get('[data-testid="password"]').type(usuarioComum.password)
      cy.get('[data-testid="cadastrar"]').click()
      cy.get('.alert').should('contain.text', 'Cadastro realizado com sucesso')
    })
  })

  it('Não deve aceitar e-mail duplicado', function () {
    cy.fixture('usuarioAdmin').then((usuarioAdmin) => {
      cy.createUser(usuarioAdmin)

      cy.visit('/cadastrarusuarios')
      cy.get('[data-testid="nome"]').type(usuarioAdmin.nome)
      cy.get('[data-testid="email"]').type(usuarioAdmin.email)
      cy.get('[data-testid="password"]').type(usuarioAdmin.password)
      cy.get('[data-testid="checkbox"]').click()
      cy.get('[data-testid="cadastrar"]').click()
      cy.get('.alert > :nth-child(2)').should('contain.text', 'Este email já está sendo usado')


    })
  })

  it('Cadastro com campo vazio', function () {
    cy.visit('/cadastrarusuarios')
    cy.get('[data-testid="cadastrar"]').click()
    cy.get(':nth-child(3) > :nth-child(2)').should('contain.text', 'Nome é obrigatório')
    cy.get(':nth-child(4) > :nth-child(2)').should('contain.text', 'Email é obrigatório')
    cy.get(':nth-child(5) > :nth-child(2)').should('contain.text', 'Password é obrigatório')
  })

  it('Voltar para tela de login', function () {
    cy.visit('/cadastrarusuarios')
    cy.get('[data-testid="entrar"]').click()
    cy.url().should('eq', 'https://front.serverest.dev/login')
  })
})
