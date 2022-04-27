it.only('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
    cy.visit('./src/privacy.html')
   
    cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade')
})