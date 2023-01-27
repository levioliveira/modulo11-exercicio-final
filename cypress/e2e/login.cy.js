/// <reference types="cypress" />

context('Funcionalidade Login', () => {
    let userData;
    beforeEach(() => {
        cy.visit("http://lojaebac.ebaconline.art.br/my-account/")
        cy.fixture('userData').then((fUser) => {
            userData = fUser
        })
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type(userData.userWithValidAccess.username)
        cy.get('#password').type(userData.userWithValidAccess.password)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.topbar-inner > :nth-child(1) > .list-inline > :nth-child(1)').should('contain', 'Welcome')
    })

    it('Deve exibir mensagem de erro ao inserir usuário inválido', () => {

        cy.get('#username').type(userData.userWithInvalidEmail.username)
        cy.get('#password').type(userData.userWithInvalidEmail.password)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')
    })

    it('Deve exibir mensagem de erro ao inserir senha inválida', () => {

        cy.get('#username').type(userData.userWithInvalidPassword.username)
        cy.get('#password').type(userData.userWithInvalidPassword.password)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Erro: a senha fornecida para o e-mail')
    })

    it('Validar recuperação de senha com sucesso', () => {

        cy.get('.lost_password > a').click()
        cy.get('#user_login').type(userData.userWithValidAccess.username)
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('contain', 'O e-mail de redefinição de senha foi enviado.')
    })

    it('Validar recuperação de senha com usuário inválido', () => {

        cy.get('.lost_password > a').click()
        cy.get('#user_login').type(userData.userWithInvalidEmail.username)
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-error').should('contain', 'Nome de usuário ou e-mail inválido.')
    })
})