describe('Listar usuarios - sessão admin', function () {

    it('Não deve permitir excluir o próprio usuário', function () {
        cy.fixture('usuarioAdmin').then((usuarioAdmin) => {
            cy.deleteUser(usuarioAdmin.email)
            cy.createUser(usuarioAdmin)

            cy.visit('/login')
            cy.get('[data-testid="email"]').type(usuarioAdmin.email)
            cy.get('[data-testid="senha"]').type(usuarioAdmin.password)
            cy.get('[data-testid="entrar"]').click()

            cy.get('[data-testid="listarUsuarios"]').click()

            cy.deleteUserFromList(usuarioAdmin.email)

            cy.get('.alert').should('contain.text', 'Não é possível excluir o próprio usuário!')
        })
    })

    describe('Excluir usuario comum - sessão admin', function () {

        it('Deve excluir usuario comum e não encontrá-lo mais na lista', function () {
            cy.fixture('usuarioComum').then((usuarioComum) => {
            cy.fixture('usuarioAdmin').then((usuarioAdmin) => {
                    // 1. garante que o usuário comum existe
                cy.deleteUser(usuarioComum.email)
                cy.createUser(usuarioComum)

                    // 2. loga com usuário admin
                cy.deleteUser(usuarioAdmin.email)
                cy.createUser(usuarioAdmin)

                cy.visit('/login')
                cy.get('[data-testid="email"]').type(usuarioAdmin.email)
                cy.get('[data-testid="senha"]').type(usuarioAdmin.password)
                cy.get('[data-testid="entrar"]').click()

                    // 3. acessa tela de listar usuários
                cy.get('[data-testid="listarUsuarios"]').click()

                    // 4. localiza o usuário comum e clica em excluir
                cy.contains('td', usuarioComum.email)
                    .parent('tr')
                    .within(() => {
                        cy.get('.btn-danger').dblclick()
                    })

                    // 5. percorre a lista novamente e valida que o usuário comum não aparece mais
                 cy.get('table').should('not.contain', usuarioComum.email)
                })
            })
        })
    })




})

