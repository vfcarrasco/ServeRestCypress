Cypress.Commands.add('createUser', (usuario) => {
  return cy.request({
    method: 'POST',
    url: 'https://serverest.dev/usuarios',
    body: usuario,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('deleteUser', (email) => {
  cy.request({
    method: 'GET',
    url: 'https://serverest.dev/usuarios',
    qs: { email },
    failOnStatusCode: false
  }).then((response) => {
    if (response.body.usuarios.length > 0) {
      const id = response.body.usuarios[0]._id
      return cy.request({
        method: 'DELETE',
        url: `https://serverest.dev/usuarios/${id}`,
        failOnStatusCode: false
      })
    }
  })
})

Cypress.Commands.add('deleteUserFromList', (email) => {
  cy.contains('td', email)
    .parent('tr') 
    .within(() => {
      cy.get('.btn-danger').dblclick() // duplo clique no botão excluir
    })
})

Cypress.Commands.add('createProduct', (produto) => {
  return cy.request({
    method: 'POST',
    url: 'https://serverest.dev/produtos',
    body: produto,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('deleteProduct', (nome) => {
  cy.request({
    method: 'GET',
    url: 'https://serverest.dev/produtos',
    qs: { nome },
    failOnStatusCode: false
  }).then((response) => {
    if (response.body.produtos.length > 0) {
      const id = response.body.produtos[0]._id
      return cy.request({
        method: 'DELETE',
        url: `https://serverest.dev/produtos/${id}`,
        failOnStatusCode: false
      })
    }
  })
})


