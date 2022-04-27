/// <reference types="Cypress" />

import { should } from "chai"

describe('Central de Atendimento ao Cliente TAT', function(){
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function(){
        cy.title().should('equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('Pedro')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('pedrovilela89@gmail.com')
        cy.get('#open-text-area').type('Lorem ipsum dolor sit amet...', {delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Pedro')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('pedrovilela89.gmail.com')
        cy.get('#open-text-area').type('Lorem ipsum dolor sit amet...', {delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('telefone só deve aceitar número', function(){
        cy.get('#phone').type('abc').should('have.value','')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Pedro')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('pedrovilela89.gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Lorem ipsum dolor sit amet...', {delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Pedro').should('have.value', 'Pedro').clear().should('have.value', '')
        cy.get('#lastName').type('Costa').should('have.value', 'Costa').clear().should('have.value', '')
        cy.get('#email').type('pedrovilela89@gmail.com').should('have.value', 'pedrovilela89@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type('35983828192').should('have.value', '35983828192').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[value = "feedback"]').check('feedback').should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[value = "elogio"]').check('elogio').should('have.value', 'elogio')
        cy.get('input[value = "feedback"]').check('feedback').should('have.value', 'feedback')
        cy.get('input[value = "ajuda"]').check('ajuda').should('have.value', 'ajuda')
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
          .check().should('be.enabled')
          .last()
          .uncheck().should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Pedro')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('pedrovilela89.gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Lorem ipsum dolor sit amet...', {delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json')
          .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
          .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('exampleFile')
        cy.get('input[type="file"]')
          .selectFile('@exampleFile').then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade')
    })

})