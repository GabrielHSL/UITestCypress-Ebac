/// <reference types="cypress" />

var faker = require('faker');
const perfil = require('../fixtures/perfil.json');

context('Funcionalidade Login', () =>{

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    });

    afterEach(() => {
        cy.screenshot()
    });
    
    it('login email e senha válidos', () => {
       
        cy.get('#username').type('teste00@aulaebac.net')
        cy.get('#password').type('@aula@EBAC123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('#main').should('contain' , 'Olá, Tester EBAC (não é Tester EBAC? Sair)')

    });

    it('falha de login senha inválida', () => {
        
        cy.get('#username').type('teste00@aulaebac.net')
        cy.get('#password').type('@aula@EBAC')
        cy.get('.woocommerce-form > .button').click()
        cy.get('#main').should('contain' , 'Erro: a senha fornecida para o e-mail teste00@aulaebac.net está incorreta.')

    });
    
    it('falha de login email inválido', () => {
        
        cy.get('#username').type('teste00@aulaebac.com')
        cy.get('#password').type('@aula@EBAC123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('#main').should('contain' , 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')

    });

    it('falha de login email e senha inválidos', () => {
       
        cy.get('#username').type('teste00@aulaebac.com')
        cy.get('#password').type('aulaEBAC123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('#main').should('contain' , 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')

    });
    
    //Login com arquivo de dados

    it.only('login válido via arquivo de dados', () => {
       
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('#main').should('contain' , 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')

    });

    it('login válido via fixtures', () => {
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha, {log: false})
            cy.get('.woocommerce-form > .button').click()
            cy.get('#main').should('contain' , 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')

        })
        

    });



})