Cypress.Commands.add('camposForm', (name, email, phone, subject, description)=> {
    cy.get('#name').type(name)
    cy.get('#email').type(email)
    cy.get('#phone').type(phone)
    cy.get('#subject').type(subject)
    cy.get('#description').type(description)
})

Cypress.Commands.add('borrarCamposForm', () => {
    cy.get('#name').clear();
    cy.get('#email').clear();
    cy.get('#phone').clear();
    cy.get('#subject').clear();
    cy.get('#description').clear();
});