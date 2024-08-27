describe("test de formulario", () => {
  it("Completar campo name", () => {
    cy.visit("https://demoqa.com");
    cy.get('h5').contains('Element').click();
    cy.get('span')

  });
}); 
