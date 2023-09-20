import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe("Test de integracion - Carts", () =>{
//   this.timeout(5000);
  it("endpoint GET /api/carts debe poder obtener los carritos creados", async () => {
    const { status, _body } = await request.get("/api/carts");
    expect(_body).to.be.an('array')
    expect(status).to.equal(200);
  });

  it("endpoint GET /api/carts/:cid debe poder obtener el carrito solicitado si existe", async () => {
    let cid = '64acc6e9190517cdedd02d15'
    
    const { status, _body } = await request.get(`/api/carts/${cid}`);
    expect(status).to.equal(200);
    expect(_body[0]._id).to.be.equal(`${cid}`)
    expect(_body[0].products).to.be.an('array')
  });



it("endpoint POST /api/carts debe poder crear un nuevo carrito", async () => {
  const { status, _body } = await request.post("/api/carts");
  
  expect(_body.payload).to.be.an('string')
  expect(status).to.equal(201);
});

});
