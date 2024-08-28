describe("test de formulario", () => {
  it("Completar campo name", () => {
    cy.visit("https://demoqa.com")
    cy.get('h5').contains('Element').click()
    cy.get('span').contains('Forms').click()
    cy.get('span').contains('Practice Form').click()
    cy.comandoDePrueba('Juan', 'Perez') 
    // traigo el comando para ejecutarlo
    const ids = ['gender-radio-1', 'gender-radio-2', 'gender-radio-3'];
    ids.forEach(id=>{
      cy.get(`#${id}`).click({force:true});
    });
    cy.get('#hobbies-checkbox-1').check({force:true})
    cy.wait(1500)
    cy.get('#hobbies-checkbox-1').uncheck({force:true})
  });
}); 
