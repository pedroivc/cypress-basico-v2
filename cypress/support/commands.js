Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Costa')
    cy.get('#email').type('pedrovilela89@gmail.com')
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet...', {delay:0})
    cy.contains('button', 'Enviar').click()
})