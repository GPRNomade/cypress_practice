describe('Creación de usuario', ()=>{
    //{testIsolation:false}testIsolation es un comando para mantener el estado de las pruebas, por ejemplo si tenemos 2 pruebas de login, queremos que se vuelva a logear en el 2do test, entonces no se mantiene el status de logeado del 1er test
    it('creación de usuario OK', ()=>{
    //intercept(método, dónde se está dando ese método).as('alias')
    //si pongo it.skip hago q lo saltee
        cy.intercept('POST', 'api/users').as('userCreado') 
        //^^ api
        cy.visit('https://conduit.bondaracademy.com/')
        cy.contains('Sign up').click()
        const numeroRandom = Math.floor(1000+Math.random() * 9000);
        cy.get('[placeholder="Username"]').type(`test${numeroRandom}`)
        cy.get('[placeholder="Email"]').type(`test${numeroRandom}`)
        cy.get('[placeholder="Password"]').type('nanan123')
        cy.get('.btn').click()
        cy.wait('@userCreado').then(interception =>{
            expect(interception.response.statusCode).to.equal(201)
            cy.log('Felicidades son unos cracks, se creó el usuario')
        })
    })

    it.only('wrong user',()=>{
        //al poner it.only hago que solo se ejecute este test. Podemos elegir only acá o skip arriba
        cy.intercept('POST', 'api/users/**').as('userError') 
        cy.visit('https://conduit.bondaracademy.com/login')
        cy.get('[placeholder="Email"]').type('cualquiera')
        cy.get('[placeholder="Password"]').type('lele++')
        cy.get('.btn').click()
        cy.wait('@userError').then(interception =>{
            expect(interception.response.statusCode).to.equal(403)
            cy.log('no campeón')
        })
})
})