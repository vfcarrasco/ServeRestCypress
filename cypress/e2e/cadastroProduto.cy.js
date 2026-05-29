describe('Cadastro de produto - sessão admin', function () {

  it('Cadastro de produto com sucesso', function () {
    cy.fixture('usuarioAdmin').then((usuarioAdmin) => {
      cy.fixture('produto').then((produto) => {
        cy.deleteUser(usuarioAdmin.email)
        cy.createUser(usuarioAdmin)

        cy.visit('/login')
        cy.get('[data-testid="email"]').type(usuarioAdmin.email)
        cy.get('[data-testid="senha"]').type(usuarioAdmin.password)
        cy.get('[data-testid="entrar"]').click()

        cy.get('[data-testid="cadastrarProdutos"]').click()   

        cy.get('[data-testid="nome"]').type(produto.nome)
        cy.get('[data-testid="preco"]').type(produto.preco.toString())
        cy.get('[data-testid="descricao"]').type(produto.descricao)
        cy.get('[data-testid="quantity"]').type(produto.quantidade.toString())

        cy.get('[data-testid="cadastarProdutos"]').click()
      })
    })
  })

  it('Cadastro de produto com campos vazios', function () {
    cy.fixture('usuarioAdmin').then((usuarioAdmin) => {
      cy.deleteUser(usuarioAdmin.email)
      cy.createUser(usuarioAdmin)

      cy.visit('/login')
      cy.get('[data-testid="email"]').type(usuarioAdmin.email)
      cy.get('[data-testid="senha"]').type(usuarioAdmin.password)
      cy.get('[data-testid="entrar"]').click()

      cy.get('[data-testid="cadastrarProdutos"]').click()   

      // não preencher nenhum campo
      cy.get('[data-testid="cadastarProdutos"]').click()

      // valida mensagens de erro
      cy.get(':nth-child(1) > :nth-child(2)').should('contain.text', 'Nome é obrigatório')
      cy.get(':nth-child(2) > :nth-child(2)').should('contain.text', 'Preco é obrigatório')
      cy.get(':nth-child(3) > :nth-child(2)').should('contain.text', 'Descricao é obrigatório')
      cy.get(':nth-child(4) > :nth-child(2)').should('contain.text', 'Quantidade é obrigatório')
    })
  })
})
