describe('Autenticacion API Tests', () => {
    let user={};
    let token;
    it('Crear nuevo Usuario(Test)', () => {
      const newMaterial = {
        nombres:"Prueba",
        apellidos: "Test",
        telefono:"0992111606",
        correo:"prueba@hotmail.com",
        contrasenia:"12345"
      };
      cy.request('POST', 'http://localhost:3000/ApiMinig/Autenticacion/Registro', newMaterial)
        .then((response) => {
          user=response.body.user;
          expect(response.status).to.eq(200);
          expect(response.body.user).to.have.property('correo');
        });
    });

    it('Logearse (Test)', () => {
        const newSalida = {
            correo:"prueba@hotmail.com",
            contrasenia:"12345"
        };
        cy.request('POST', 'http://localhost:3000/ApiMinig/Autenticacion/login', newSalida)
          .then((response) => {
            token =response.body.token;
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message','Inicio de sesión exitoso!!');
        });
    });

    it('Borrar el usuario(test)', () => {
    cy.request({
        method:'DELETE', 
        url: `http://localhost:3000/ApiMinig/Autenticacion/eliminarUsuario/${user._id}`,
        headers: {
            Authorization: `${token}`
        }
    })
        .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'Usuario eliminado');
        });
    });
})