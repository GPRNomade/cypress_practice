describe("template spec", () => {
  // describe es lo que me dice este es un test
  it("passes", () => {
    cy.visit("https://example.cypress.io");
    cy.get('span')
    // lo mejor es que sea por clase o por id. Ojo con los id's generados por angular
    cy.get('.nombreDeClase')
    cy.get('#idDelElemento')
    cy.get('[name="nombreDelElemento"]') 
    // para traer cosas por type 
  });
});

// sintaxis función/test describe('nombre test', ()=>{})
// - visit(url): para visitar una URL específica en la aplicación web.
// - get(selector): para obtener un elemento específico en la página.
// - click(selector): para hacer clic en un elemento específico en la página.
// - type(text, selector): para escribir texto en un elemento específico en la página.
// - clear(selector): para borrar el contenido de un elemento específico en la página.
