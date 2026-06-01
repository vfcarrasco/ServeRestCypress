describe('Listar usuarios - sessão admin', function () {

    it('Não deve permitir excluir o próprio usuário', function () {
        cy.fixture('usuarioAdmin').then((usuarioAdmin) => {
            cy.deleteUser(usuarioAdmin.email)
            cy.createUser(usuarioAdmin)

            cy.loginAdmin()
            cy.get('[data-testid="listarUsuarios"]').click()
            cy.deleteUserFromList(usuarioAdmin.email)
            cy.get('.alert').should('contain.text', 'Não é possível excluir o próprio usuário!')
        })
    })

    describe('Excluir usuario comum - sessão admin', function () {

        it('Deve excluir usuario comum e não encontrá-lo mais na lista', function () {
            cy.fixture('usuarioComum').then((usuarioComum) => {
            cy.fixture('usuarioAdmin').then((usuarioAdmin) => {

                cy.deleteUser(usuarioComum.email)
                cy.createUser(usuarioComum)

                cy.deleteUser(usuarioAdmin.email)
                cy.createUser(usuarioAdmin)
                cy.loginAdmin()
                cy.get('[data-testid="listarUsuarios"]').click()
                cy.contains('td', usuarioComum.email)
                    .parent('tr')
                    .within(() => {
                        cy.get('.btn-danger').dblclick()
                    })
                 cy.get('table').should('not.contain', usuarioComum.email)
                })
            })
        })
    })




})

