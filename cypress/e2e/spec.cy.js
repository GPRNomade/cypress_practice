
describe('Enviar mensaje', {testIsolation:false},() =>{



  it('Validar envío de form vacío', () => {
      cy.visit('https://automationintesting.online/')
      cy.log('Envío de form de contacto en blanco.')
      cy.get('#submitContact').click()
      cy.get('.alert').should('be.visible')
      cy.get('p').contains('Subject must be between 5 and 100 characters.').should('be.visible')
      cy.get('p').contains('Subject may not be blank').should('be.visible')
      cy.get('p').contains('Name may not be blank').should('be.visible')
      cy.get('p').contains('Message must be between 20 and 2000 characters.').should('be.visible')
      cy.get('p').contains('Message may not be blank').should('be.visible')
      cy.get('p').contains('Email may not be blank').should('be.visible')
      cy.get('p').contains('Phone may not be blank').should('be.visible')
      cy.get('p').contains('Phone must be between 11 and 21 characters.').should('be.visible')
      cy.screenshot('form-vacio');
  });
 
  it('Validar envío de form con data incorrecta', () => {
    cy.reload({ timeout: 5000, log: false });
    cy.log('Envío de form de contacto con data incorrecta.');
  
    cy.intercept('POST', 'message').as('msjNoEnviado');
    cy.wait(2000);
  
    cy.fixture('data.json').then((data) => {
      const formDataIncorrecta = data['Validar envío de form con data incorrecta'];
  
      cy.camposForm(
        formDataIncorrecta.name,
        formDataIncorrecta.email,
        formDataIncorrecta.phone,
        formDataIncorrecta.subject,
        formDataIncorrecta.description
      );
  
      cy.get('#submitContact').click();
  
      cy.wait('@msjNoEnviado').then(interception => {
        try {
          expect(interception.response.statusCode).to.equal(400);
          cy.log('Mensaje no enviado. Datos incorrectos.');
  
          cy.get('.alert').should('be.visible');
          cy.get('p').contains('Phone must be between 11 and 21 characters.').should('be.visible');
          cy.get('p').contains('debe ser una dirección de correo electrónico con formato correcto').should('be.visible');
          cy.get('p').contains('Message must be between 20 y 2000 caracteres.').should('be.visible');
  
          
          cy.screenshot('form-data-incorrecta');
        } catch (err) {
          cy.screenshot('form-data-incorrecta-error');
          throw err; 
        }
      });
    });
  });

  it('Validar envío de form con data correcta', () => {
    cy.reload({ timeout: 5000, log: false });
    cy.log('Envío de form de contacto con data correcta.')
    cy.intercept('POST', 'message').as('msjEnviado')
    cy.borrarCamposForm()
    
    cy.fixture('data.json').then((data) => {
      const formDataCorrecta = data['Validar envío de form con data correcta'];
    cy.camposForm(formDataCorrecta.name, formDataCorrecta.email, formDataCorrecta.phone, formDataCorrecta.subject, formDataCorrecta.description);
    cy.get('#submitContact').click()
    });
    cy.wait('@msjEnviado').then(interception =>{
      expect(interception.response.statusCode).to.equal(201)
      cy.log('Mensaje enviado correctamente')
      cy.screenshot('form-data-correcta');  
    });
  });


})

describe('Validar imagenes',{testIsolation:false},() =>{
  it('Imagenes', () => {
    cy.visit('https://automationintesting.online/')
    cy.log('Imagenes visibles en la UI')
    cy.get('.hotel-logoUrl').should('be.visible');
    cy.screenshot('validar-imagenes-imagen-logo');
    cy.get('.hotel-img').should('be.visible');
    cy.screenshot('validar-imagenes-imagen-hotel');
  });
})

describe('Validar datos  hotel',{testIsolation:false},() =>{
  it('Datos del Hotel', () => {
    cy.get('p').contains('Shady Meadows B&B').should('be.visible');
    cy.get('p').contains('The Old Farmhouse, Shady Street, Newfordburyshire, NE1 410S').should('be.visible');
    cy.get('p').contains('012345678901').should('be.visible');
    cy.get('p').contains('fake@fakeemail.com').should('be.visible');
    cy.screenshot('validar-datos-hotel');
  });
})

describe('Validar descripcion  hotel',{testIsolation:false},() =>{
  it('Descripción del Hotel', () => {
    cy.get('p').contains('Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.').should('be.visible');
    cy.screenshot('validar-descripcion-hotel');
  });
})