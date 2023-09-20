import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe('Test de integracion - Sesiones', () => {
  let cookie = {};
  let userId;

  after(()=>{
    request.delete(`/api/users/${userId}`)
      .then((result)=>{
        const { _body } = result;
        expect(_body).to.be.ok;
        expect(_body.payload).to.be.ok;
        expect(_body.payload.deletedCount).to.be.ok.and.equal(1);
      })
  })

  it('Se debe poder registrar un usuario correctamente', ()=>{
    const user = {
      first_name: 'Juan',
      last_name: 'Perez',
      email: 'juan@perez.com',
      age: 25,
      password: '123'
    }

    request.post("/api/users/").send(user)
      .then((result)=>{
        const { _body } = result;
        userId = _body.payload._id;
        expect(_body).to.be.ok;
        
      })
  })

  it('Se debe poder iniciar sesion correctamente (USO DE COOKIE)', ()=>{
    const user = {
      email: 'juan@perez.com',
      password: '123'
    }

    request.post("/api/users/login").send(user)
      .then((result)=>{
        const cookieResult = result.headers["set-cookie"][0];

        expect(cookieResult).to.be.ok;

        cookie = {
          name: cookieResult.split("=")[0],
          value: cookieResult.split("=")[1],
        };

        expect(cookie.name).to.be.ok.and.equal("token");
        expect(cookie.value).to.be.ok;
      })
  });

  it('La cookie del usuario debe ser enviada y desecturada correctamente', ()=>{
    request
      .get("/api/users/current")
      .set("Cookie", [`${cookie?.name}=${cookie?.value}`])
      .then((result)=>{
        const { _body } = result;
        expect(_body.user).to.be.ok;
        expect(_body.user.email).to.be.ok.and.equal('juan@perez.com');
      })
  });

});